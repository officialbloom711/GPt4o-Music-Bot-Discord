/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

module.exports = {
  name: "nowplaying",
  aliases: ["now", "np"],
  category: "music",
  description: "See what's being played",
  args: false,
  player: true,
  queue: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (client, message, args, emoji) => {
    try {
      // Fetch the preset path or use the default value
      const presetPath =
        (await client.db.preset.get(`${client.user.id}_${message.guild.id}`)) ||
        `cards/card1.js`;

      // Get the player and current track
      const player = await client.getPlayer(message.guild.id);
      const track = player?.queue?.current;

      if (!track) {
        return message.reply("No track is currently being played.");
      }

      // Calculate progress percentage
      const progress = track.isStream ? 50 : (player.position / track.length) * 100;

      // Prepare track data
      const trackData = {
        title: track.title.replace(/[^a-zA-Z0-9\s]/g, "").substring(0, 25) || "Something Good",
        author: track.author.replace(/[^a-zA-Z0-9\s]/g, "").substring(0, 20) || "Painfuego",
        duration: track.isStream ? "◉ LIVE" : client.formatTime(track.length) || "06:09",
        thumbnail: track.thumbnail || client.user.displayAvatarURL().replace("webp", "png"),
        color: client.color || "#FFFFFF",
        progress: progress,
        source: track.sourceName !== "youtube" ? track.sourceName : "spotify",
        requester: track.requester,
      };

      // Generate embed and files using the preset
      const data = await require(`@presets/${presetPath}`)(trackData, client, player);

      // Send the response
      await message.reply({ embeds: data[0], files: data[1] }).catch(() => {});
    } catch (error) {
      console.error("Error executing nowplaying command:", error);
      message.reply("An error occurred while trying to display the currently playing track.");
    }
  },
};
