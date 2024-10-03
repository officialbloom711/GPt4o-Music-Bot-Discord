const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const _ = require('lodash');

module.exports = {
  name: 'slist',
  aliases: ['serverlist'],
  description: 'Lists the servers the bot is in, with clickable invite links.',
  category: 'admin', // Changed to 'admin' since it's for admins and owners
  args: false,
  usage: '',
  userPerms: ['Administrator'], // Requires "Administrator" permission for users
  botPerms: [], // No special permissions required for the bot
  owner: true, // Set to true to signify it's restricted to owners and admins

  execute: async (client, message, args, prefix) => {
    // Check if the user is the server owner or has Administrator permissions
    const member = message.member;
    const isOwner = message.guild.ownerId === message.author.id;
    const isAdmin = member.permissions.has('Administrator');

    if (!isOwner && !isAdmin) {
      return message.channel.send('This command is restricted to server owners and administrators.');
    }

    const serverList = await Promise.all(client.guilds.cache.map(async (guild, index) => {
      let invite;
      try {
        const channels = guild.channels.cache.filter(channel => channel.isTextBased() && channel.permissionsFor(guild.members.me).has('CreateInstantInvite'));
        invite = channels.size > 0 ? await channels.first().createInvite({ maxAge: 0, maxUses: 0 }) : 'No Invite Available';
      } catch (error) {
        invite = 'No Invite Available';
      }

      // Format each server as a numbered entry with clickable invite link
      return {
        name: `0${index + 1}. ${guild.name}`,
        value: `**Server Link**: ${invite !== 'No Invite Available' ? `[Invite](${invite.url})` : invite}\n**Server Members**: ${guild.memberCount}`
      };
    }));

    const pages = _.chunk(serverList, 5); // 5 servers per page
    let page = 0;

    const createEmbed = (pageIndex) => {
      return new EmbedBuilder()
        .setColor(client.color)
        .setTitle('Bot Invites')
        .setDescription(`\`${message.author.username}\` has invited you to the following servers:`)
        .addFields(pages[pageIndex])
        .setFooter({
          text: `Page ${pageIndex + 1}/${pages.length}`,
          iconURL: message.author.displayAvatarURL({ dynamic: true }),
        })
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 128 })); // Set user avatar on the top right of the embed
    };

    const createButtons = (disabled = false) => {
      return new ActionRowBuilder().addComponents(
        new ButtonBuilder().setCustomId("server_list_previous").setLabel('Previous').setStyle(ButtonStyle.Primary).setDisabled(disabled),
        new ButtonBuilder().setCustomId("server_list_stop").setLabel('Stop').setStyle(ButtonStyle.Danger).setDisabled(disabled),
        new ButtonBuilder().setCustomId("server_list_next").setLabel('Next').setStyle(ButtonStyle.Primary).setDisabled(disabled)
      );
    };

    const msg = await message.channel.send({
      embeds: [createEmbed(page)],
      components: [createButtons()],
    });

    const collector = message.channel.createMessageComponentCollector({
      filter: (interaction) => interaction.user.id === message.author.id,
      time: 60000 * 5,
      idle: 60000 * 2,
    });

    collector.on("collect", async (interaction) => {
      await interaction.deferUpdate();

      switch (interaction.customId) {
        case "server_list_next":
          page = (page + 1) % pages.length;
          break;
        case "server_list_previous":
          page = (page - 1 + pages.length) % pages.length;
          break;
        case "server_list_stop":
          collector.stop();
          return;
      }

      await msg.edit({ embeds: [createEmbed(page)], components: [createButtons()] });
    });

    collector.on("end", async () => {
      await msg.edit({ components: [createButtons(true)] });
    });
  },
};
