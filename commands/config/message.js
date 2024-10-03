/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "send",
  aliases: [],
  cooldown: "",
  category: "utility",
  usage: "<#channel> [@user] <message>",
  description: "Send a message to the mentioned channel with optional user tagging",
  args: true,
  vote: false,
  new: true,
  admin: false, // No longer restricted to admins/owners
  owner: false, // No longer restricted to owners
  botPerms: ["SEND_MESSAGES"], // Bot still requires permission to send messages
  userPerms: [], // No user permission requirements (any user can execute the command)
  player: false,
  queue: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (client, message, args) => {
    // Ensure a channel is mentioned
    const channelToSend = message.mentions.channels.first();
    if (!channelToSend) {
      return message.reply("<:HvnCross:1274050645623705660> Please mention a valid channel to send the message to.");
    }

    // Check if a user is mentioned (optional)
    const userToMessage = message.mentions.users.first();
    let messageContent;

    if (userToMessage) {
      // If a user is mentioned, exclude the user mention and channel mention from the message content
      messageContent = args.slice(2).join(" ");
    } else {
      // If no user is mentioned, exclude the channel mention from the message content
      messageContent = args.slice(1).join(" ");
    }

    if (!messageContent) {
      return message.reply("<:HvnCross:1274050645623705660> Please provide a message to send.");
    }

    // Create the button row with green (success) buttons
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("simple_message")
        .setLabel("Send Simple Message")
        .setStyle(ButtonStyle.Success), // Green button for simple message
      new ButtonBuilder()
        .setCustomId("embed_message")
        .setLabel("Send Embedded Message")
        .setStyle(ButtonStyle.Success) // Green button for embedded message
    );

    // Ask the user to choose between simple or embed message
    const messagePrompt = await message.reply({
      content: "Would you like to send the message as a **simple** message or an **embedded** message?",
      components: [row],
    });

    // Create an interaction collector to handle the button presses
    const filter = (interaction) => interaction.user.id === message.author.id;
    const collector = message.channel.createMessageComponentCollector({ filter, max: 1, time: 60000 });

    collector.on("collect", async (interaction) => {
      if (interaction.customId === "simple_message") {
        // Send as a simple message
        // If a user is tagged, include their mention in the message content
        const content = userToMessage ? `<@${userToMessage.id}> ${messageContent}` : messageContent;

        try {
          await channelToSend.send(content);
          await interaction.reply({
            content: `<:HvnTick:1273315933460369562> Simple message successfully sent.`,
            ephemeral: true, // No need to show the channel name here
          });
        } catch (error) {
          await interaction.reply({
            content: `<:HvnCross:1274050645623705660> Could not send the message.`,
            ephemeral: true,
          });
        }
      } else if (interaction.customId === "embed_message") {
        // Create an embed with the bot's avatar and name, and include the user mention in the message if one is tagged
        const embed = new EmbedBuilder()
          .setColor("#0099ff") // Set embed color
          .setTitle("You've received a message!") // Set the title of the embed
          .setThumbnail(client.user.displayAvatarURL({ dynamic: true })) // Add bot's avatar as the thumbnail
          .setDescription(`**${messageContent}**`) // Set the message content (bolded)
          .setTimestamp() // Add a timestamp
          .setFooter({ text: "Sent via Jupiter Music", iconURL: client.user.displayAvatarURL({ dynamic: true }) }); // Footer with bot name and avatar

        const content = userToMessage ? `<@${userToMessage.id}>` : null;

        try {
          await channelToSend.send({ content, embeds: [embed] });
          await interaction.reply({
            content: `<:HvnTick:1273315933460369562> Embedded message successfully sent.`,
            ephemeral: true, // No need to show the channel name here
          });
        } catch (error) {
          await interaction.reply({
            content: `<:HvnCross:1274050645623705660> Could not send the message.`,
            ephemeral: true,
          });
        }
      }

      // Disable the buttons after interaction
      await messagePrompt.edit({ components: [] });
    });

    collector.on("end", async (collected) => {
      if (collected.size === 0) {
        await messagePrompt.edit({
          content: "You didn't choose an option in time!",
          components: [],
        });
      }
    });
  },
};
