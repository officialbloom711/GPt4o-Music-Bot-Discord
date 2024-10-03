const genCommandList = require("@gen/commandList.js");
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h", "help"],
  cooldown: "",
  category: "information",
  usage: "",
  description: "Shows bot's help menu",
  args: false,
  vote: false,
  new: false,
  admin: false,
  owner: false,
  botPerms: [],
  userPerms: [],
  player: false,
  queue: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (client, message, args, emoji) => {
    // Retrieve all categories
    let categories = client.categories;

    // Filter out the "owner" category
    categories = categories.filter(category => category.toLowerCase() !== "owner");

    // Sort categories alphabetically or based on other criteria
    categories = categories.sort((a, b) => a.localeCompare(b));

    const botAvatarURL = client.user.displayAvatarURL(); // Bot avatar URL

    const embed = new EmbedBuilder() // Main help embed
      .setTitle(`${emoji.GPT4o || "<a:GPT4o:1286617632232964166>"} GPT4o Music Help`) // Add emoji or bot logo emoji
      .setDescription(
        `**Hey [${message.author.username}](https://discord.gg/9J9X4fzhSt), GPT4o is the best music bot for your server, providing you with the best quality and clear music.**\n\n` +
        `**My Default Prefix is:** [\`+\`](https://discord.gg/9J9X4fzhSt)\n` + // Support link on Default Prefix
        `**For more info about a command, use:** [\`-<command> +help\`](https://discord.gg/9J9X4fzhSt)` // Support link on command help
      )
      .addFields(
        { name: 'Links', value: '[Support Server](https://discord.gg/9J9X4fzhSt) | [Invite Link](https://discord.com/oauth2/authorize?client_id=1213025121669750814&permissions=1759218604441591&response_type=code&redirect_uri=https://discord.gg/9J9X4fzhSt&scope=applications.commands+bot)', inline: false }
      )
      .setThumbnail(botAvatarURL) // Bot avatar in the top right corner
      .setFooter({ 
        text: `GPT4o Music, Experience the Quality Music` 
      });

    const buttonRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('home')
        .setLabel('Home')
        .setStyle(ButtonStyle.Success), // Green button
      new ButtonBuilder()
        .setCustomId('music')
        .setLabel('Music')
        .setStyle(ButtonStyle.Success), // Green button
      new ButtonBuilder()
        .setCustomId('config')
        .setLabel('Config')
        .setStyle(ButtonStyle.Success), // Green button
      new ButtonBuilder()
        .setCustomId('info')
        .setLabel('Information')
        .setStyle(ButtonStyle.Success) // Green button
    );

    const messageSent = await message.reply({
      embeds: [embed],
      components: [buttonRow],
    });

    const filter = (interaction) => interaction.user.id === message.author.id;

    const collector = messageSent.createMessageComponentCollector({
      filter,
      time: 60000,
    });

    collector.on("collect", async (interaction) => {
      await interaction.deferUpdate();
      
      let newEmbed;

      switch (interaction.customId) {
        case 'home':
          newEmbed = embed; // Reuse the home embed
          break;
        case 'music':
          newEmbed = new EmbedBuilder()
            .setTitle(`${emoji.GPT4o || "<a:GPT4o:1286617632232964166>"} Music Commands`) // Add bot logo emoji in headline
            .setDescription('Commands:\nautoplay, clear, grab, join, leave, loop, nowplaying, pause, play, previous, queue, remove, resume, search, seek, shuffle, similar, skip, stop, volume')
            .setThumbnail(botAvatarURL); // Bot avatar in the top right corner
          break;
        case 'config':
          newEmbed = new EmbedBuilder()
            .setTitle(`${emoji.GPT4o || "<a:GPT4o:1286617632232964166>"} Configuration Commands`) // Add bot logo emoji in headline
            .setDescription('Commands:\n247, addrole, ban, config, ignore, kick, prefix, pemium, profile, redeem')
            .setThumbnail(botAvatarURL); // Bot avatar in the top right corner
          break;
        case 'info':
          newEmbed = new EmbedBuilder()
            .setTitle(`${emoji.GPT4o || "<a:GPT4o:1286617632232964166>"} Information Commands`) // Add bot logo emoji in headline
            .setDescription('Commands:\nbalance, help, invite, ping, report, stats, support, uptime, vote')
            .setThumbnail(botAvatarURL); // Bot avatar in the top right corner
          break;
      }

      await interaction.editReply({
        embeds: [newEmbed],
      });
    });

    collector.on("end", () => {
      messageSent.edit({ components: [] });
    });
  },
};
