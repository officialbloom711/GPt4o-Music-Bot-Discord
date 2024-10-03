/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

const { AttachmentBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "preset",
  aliases: ["set"],
  cooldown: "",
  category: "config",
  usage: "",
  description: "Choose your playEmbed",
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
  execute: async (client, message, args) => {
    let row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId(`cards/card1.js`).setLabel("1").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId(`cards/card2.js`).setLabel("2").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId(`cards/card3.js`).setLabel("3").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId(`cards/card4.js`).setLabel("4").setStyle(ButtonStyle.Secondary)
    );

    let row2 = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId(`embeds/embed1.js`).setLabel("1").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId(`embeds/embed2.js`).setLabel("2").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId(`embeds/embed3.js`).setLabel("3").setStyle(ButtonStyle.Secondary),
      new ButtonBuilder().setCustomId(`embeds/embed4.js`).setLabel("4").setStyle(ButtonStyle.Secondary)
    );

    let row3 = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setCustomId(`confirm`).setLabel("Select current preset").setStyle(ButtonStyle.Success),
      new ButtonBuilder().setCustomId(`cancel`).setLabel("Cancel Operation").setStyle(ButtonStyle.Danger)
    );

    let preset = await client.db.preset.get(`${client.user.id}_${message.guild.id}`);
    const path = preset?.replace("js", "png")?.split("/")[1] || `card1.png`;

    let attachment = new AttachmentBuilder(`${process.cwd()}/assets/previews/${path}`, { name: "embed.png" });

    let m;
    try {
      m = await message.reply({
        embeds: [
          new client.embed()
            .setDescription(`⚙️ **Current play-embed preset :**\nYou can choose a new one using the buttons below. Don't forget to click Select to save!`)
            .setImage(`attachment://${attachment.name}`)
        ],
        files: [attachment],
        components: [row, row2, row3],
      });
    } catch (error) {
      console.error("Error sending the reply message:", error);
      return;
    }

    // If `m` is undefined or invalid, try fetching the message again
    if (!m || !m.createMessageComponentCollector) {
      try {
        m = await message.channel.messages.fetch({ around: message.id, limit: 1 }).then(msg => msg.first());
      } catch (fetchError) {
        console.error("Failed to fetch the message:", fetchError);
        return;
      }
    }

    if (!m || !m.createMessageComponentCollector) {
      console.error("Failed to create a message component collector. The message object is undefined or invalid.");
      return;
    }

    const filter = (interaction) => interaction.user.id === message.author.id;
    const collector = m.createMessageComponentCollector({
      filter,
      time: 60000,
      idle: 30000,
    });

    let presetPath = null;

    collector.on("collect", async (interaction) => {
      if (!interaction.isButton()) return;

      await interaction.deferUpdate();

      if (["cards/card1.js", "cards/card2.js", "cards/card3.js", "cards/card4.js", "embeds/embed1.js", "embeds/embed2.js", "embeds/embed3.js", "embeds/embed4.js"].includes(interaction.customId)) {
        presetPath = interaction.customId;
        const imagePath = `${process.cwd()}/assets/previews/${presetPath.split("/")[1].replace("js", "png")}`;
        attachment = new AttachmentBuilder(imagePath, { name: "preview.png" });

        await m.edit({
          embeds: [
            new client.embed()
              .setTitle(`⚙️ Choose your play-embed`)
              .setImage(`attachment://${attachment.name}`)
          ],
          files: [attachment],
          components: [row, row2, row3],
        }).catch(() => {});
      }

      if (interaction.customId === "confirm" && presetPath) {
        await client.db.preset.set(`${client.user.id}_${message.guild.id}`, presetPath);
        const imagePath = `${process.cwd()}/assets/previews/${presetPath.split("/")[1].replace("js", "png")}`;
        attachment = new AttachmentBuilder(imagePath, { name: "preview.png" });

        await m.edit({
          embeds: [
            new client.embed()
              .setTitle(`✅ Set this as your default play-embed`)
              .setImage(`attachment://${attachment.name}`)
          ],
          files: [attachment],
          components: [],
        }).catch(() => {});

        collector.stop("confirmed");
      }

      if (interaction.customId === "cancel") {
        collector.stop("cancelled");
      }
    });

    collector.on("end", async (collected, reason) => {
      if (reason !== "confirmed") {
        attachment = new AttachmentBuilder(`${process.cwd()}/assets/previews/${path}`, { name: "embed.png" });
        await m.edit({
          embeds: [
            new client.embed()
              .setDescription(`⚙️ **Current play-embed preset :**`)
              .setImage(`attachment://${attachment.name}`)
              .setFooter({ text: `Selection menu timed out / cancelled!` }),
          ],
          files: [attachment],
          components: [],
        }).catch(() => {});
      }
    });
  },
};
