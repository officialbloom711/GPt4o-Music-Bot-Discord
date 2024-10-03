const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: "profile",
  aliases: ["pr"],
  cooldown: "",
  category: "config",
  usage: "",
  description: "See server configs",
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
    let user;
    if (message.mentions.users.filter((x) => x !== client.user).first())
      user = message.mentions.users.filter((x) => x !== client.user).first();
    else if (args[0])
      user = await client.users.fetch(args[0]);
    else if (!args[0])
      user = message.author;


    let badges = '';
    const guild = await client.guilds.fetch('1215285113324179507');

    try {
      const rathod = await guild.members.fetch(user.id);
      
      if (user.id == '1211908675032186900' ) {
        badges += `\n<a:9duckiegotcrownyay:1275486119634534400> **[Arisu🎀](${client.support})**`;
      }
        if (user.id == '920938695060774922' ) {

        badges += `\n<a:9duckiegotcrownyay:1275486119634534400> **[! Una 🌸](${client.support})**`;
        }

        if (user.id == '898171280996589598' ) {

        badges += `\n<a:9duckiegotcrownyay:1275486119634534400> **[Deniz](${client.support})**`;

      }
       if (rathod.roles.cache.has('1253661860645834762')) {
        badges += `\n<:MekoPossessor:1275976534821310544> **Owner**`;
      }
       if (rathod.roles.cache.has('1215874276939403454')) {
        badges += `\n\<:Developer:1270757081431015491> **Developer**`;
      }
       if (rathod.roles.cache.has('1215313404265238598')) {
        badges += `\n\<:MekoManager:1275976799284629647> **Manager**`;
       }
       if (rathod.roles.cache.has('1215313593919209542')) {
        badges += `\n\<:MekoAdmin:1275976394601660477> **Admin**`;
       }
       if (rathod.roles.cache.has('1215317712960753675')) {
        badges += `\n\<:MekoModeration1:1275976358312415306> **Moderator**`;
       }
       if(rathod.roles.cache.has('1215317407879663666')){
        badges += `\n\<:Special:1276203060456329330> **Special**`;
       }
       
      if (rathod.roles.cache.has('1216653164556587048')){
        badges += `\n\<:MekoBoost:1275976218566594713> **GPT4o Booster**`;
      }
      if (rathod.roles.cache.has('1288133176333566062')) {
        badges += `\n\<:MekoType:1275976188250292246> **Early Supporter**`;
      }
       if (rathod.roles.cache.has('1215315149540294706')) {
        badges += `\n\<:MekoUser:1270697299156275232> **GPT4o User**`;
      }
      
    } catch (err) {
      badges = badges || '```No Badge Available```';
    }

    const embed = new client.embed()
      .setAuthor({
        name: `Here Is ${user.username}'s Profile`,
        iconURL: user.displayAvatarURL(),
      })
      .setFooter({
        text: `Requested By: ${message.author.tag}`,
        iconURL: message.author.displayAvatarURL({ dynamic: true }),
      })
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
    
      .addFields({
        name: '**__User Badges__**',
        value: `${badges ? badges : `[\`No Badges Available\`](${client.support})\nKindly Join Our [Support Server](${client.support}) to get some [Badges](${client.support}) on your Profile!`}`
      });

    const supportButton = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel('Support Server')
          .setStyle(ButtonStyle.Link)
          .setURL("https://discord.gg/9J9X4fzhSt")
      );

    await message
      .reply({
        embeds: [embed],
        components: [supportButton],
      })
      .catch(() => {});
  },
};
