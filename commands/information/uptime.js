/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

module.exports = {
  name: "uptime",
  aliases: ["up"],
  cooldown: "",
  category: "information",
  usage: "",
  description: "Shows bot's uptime",
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
  execute: async (client, message, args, emoji = {}) => {
    // Function to convert milliseconds to days, hours, minutes, seconds
    const formatUptime = (ms) => {
      const seconds = Math.floor((ms / 1000) % 60);
      const minutes = Math.floor((ms / (1000 * 60)) % 60);
      const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
      const days = Math.floor(ms / (1000 * 60 * 60 * 24));

      let timeString = `${hours}h ${minutes}m ${seconds}s`;
      if (days > 0) timeString = `${days}d ${timeString}`;
      return timeString;
    };

    // Initial embed before the counting starts
    let emb = new client.embed()
      .setDescription(
        `${emoji.cool || "<a:uptimer:1270705440006869013>"} **Fetching uptime data...**`
      )
      .setColor("#43B581"); // Green color for clarity

    // Send the initial message with the uptime fetching
    const msg = await message.reply({ embeds: [emb] });

    // Set an interval to update the uptime every second
    const interval = setInterval(async () => {
      const uptime = client.uptime; // Get the bot's current uptime in milliseconds
      const formattedUptime = formatUptime(uptime); // Convert to readable format

      // Update the message with the new uptime
      await msg.edit({
        embeds: [
          new client.embed()
            .setDescription(
              `<a:uptimer:1270705440006869013> **Uptime**: \`${formattedUptime}\``
            )
            .setColor("#43B581") // Keep the same green color
        ],
      }).catch(() => {});

    }, 1000); // Update every second

    // Stop the interval after some time (optional, for cleanup)
    setTimeout(() => {
      clearInterval(interval);
    }, 3600000); // Stops after 1 hour (you can adjust or remove this if needed)
  },
};
