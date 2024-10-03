/** @format
 *
 * GPT 4o By mahaaranii
 * Version: 6.0.0-beta
 * © 2024 NextGen Coders
 */

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "vote",
  aliases: [],
  cooldown: "",
  category: "information",
  usage: "",
  description: "Shows bot's vote link",
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
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel("Click here to vote for me")
        .setStyle(ButtonStyle.Link)
        .setURL(client.vote || client.support) 
    );

    await message.reply({
      embeds: [
        new client.embed().setDescription(
          `${emoji.vote} **Considering voting me on Top.gg?**`
        ),
      ],
      components: [row],
    });
  },
};
