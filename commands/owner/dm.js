/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

module.exports = {
  name: "dm",
  aliases: [],
  cooldown: "",
  category: "utility",
  usage: "<@user|userID> <message>",
  description: "Send a DM to the mentioned user or specified user ID with the given message",
  args: true,
  vote: false,
  new: true,
  admin: true, // Admin only
  owner: true, // Owner only
  botPerms: ["SEND_MESSAGES"],
  userPerms: [], // Removed user permissions to allow anyone to use the command
  player: false,
  queue: false,
  inVoiceChannel: false,
  sameVoiceChannel: false,
  execute: async (client, message, args) => {
    // Ensure a user is mentioned or user ID is provided
    const userToMessage =
      message.mentions.users.first() || (await client.users.fetch(args[0]).catch(() => null));

    if (!userToMessage) {
      return message.reply("<:HvnCross:1274050645623705660> Please mention a valid user or provide a valid user ID.");
    }

    // Ensure a message is provided
    const messageContent = args.slice(1).join(" ");
    if (!messageContent) {
      return message.reply("<:HvnCross:1274050645623705660> Please provide a message to send.");
    }

    // Send the simple message in DM
    return userToMessage
      .send(messageContent)
      .then(async () => {
        await message.reply(`<:HvnTick:1273315933460369562> Message successfully sent to ${userToMessage.tag}.`);
      })
      .catch(async () => {
        await message.reply(`<:HvnCross:1274050645623705660> Could not DM ${userToMessage.tag}.`);
      });
  },
};
