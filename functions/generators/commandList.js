/** @format
 *
 * GPT 4o By mahaaranii
 * Version: 6.0.0-beta
 * © 2024 NextGen Coders
 */

module.exports = async (client, category) => {
  let commands = await client.commands
    .filter((x) => x.category && x.category === category)
    .map(
      (x) =>
        `${client.emoji.point} **\`${x.name}\` → [${
          x.description || "No description"
        }](${client.support})** ${x.new ? `${client.emoji.new}` : ""}${
          x.vote ? `${client.emoji.diamond}` : ""
        }`,
    )
    .join("\n");
  return commands || "**No commands to display**";
};
