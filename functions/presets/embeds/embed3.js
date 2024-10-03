/** @format
 *
 * GPT 4o By mahaaranii
 * Version: 6.0.0-beta
 * © 2024 NextGen Coders
 */

const genButtons = require("@gen/playerButtons.js");
const { AttachmentBuilder } = require("discord.js");

module.exports = async (data, client, player) => {
  const title = data.title;
  const author = data.author;
  const duration = data.duration;
  const thumbnail = data.thumbnail;
  const requesterName = player.queue.current.requester.username; // Get the requester's username

  const supportServerLink = "https://discord.gg/9J9X4fzhSt"; // Replace with your actual support server link

  const embed = new client.embed()
    .setColor("#ebf5fb") // Dark background color similar to the one in the image
    .setAuthor({
      name: "Now playing", // Title of the embed
      iconURL: "https://cdn.discordapp.com/attachments/1285884256807161881/1286630506234118174/Did-You-Know-about-the-most-advanced-ChatGPT-4o-features_1.jpg?ex=66ee9b89&is=66ed4a09&hm=6c87411416ed2f67c944b1c0c30d705392189a3270fb5bdc4a35a1b5e427b1cc&", // Replace with the URL to your bot's logo
    })
    .setThumbnail(thumbnail) // Thumbnail image, typically album art or similar
    .addFields([
      {
        name: `${title.substring(0, 20)}...`, // Song title as a clickable link
        value:
          `**Author**: [${author}](${supportServerLink})\n` + // Song author as a clickable link
          `**Duration**: [${duration}](${supportServerLink})\n` + // Song duration as a clickable link
          `**Requester**: [${requesterName}](${supportServerLink})`, // Requester name as a clickable link
        inline: true,
      },
    ])
    .setImage(
      "https://cdn.discordapp.com/attachments/1285884256807161881/1286642237274456116/gpt.jpg?ex=66eea676&is=66ed54f6&hm=06fb06d2684fc69b519680fdf6fbb161e0471885cc852abcf088a52c7c5e6f2c&",
    ); // Image at the bottom of the embed

  return [[embed], [], [genButtons(client, player, 5)[0]]];
};
