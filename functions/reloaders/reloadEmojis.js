/** @format
 *
 * GPT 4o By mahaaranii
 * Version: 6.0.0-beta
 * © 2024 NextGen Coders
 */

module.exports = async (client) => {
  let emojiFile = Object.keys(require.cache).filter(
    (f) => f.includes("emoji") && !f.includes("node_modules"),
  );

  for (key of emojiFile) {
    try {
      delete require.cache[require.resolve(key)];
    } catch (e) {}
  }

  client.emoji = require("@assets/emoji.js")[client.emojiSet];
  return `Re-Loaded Emojis`;
};
