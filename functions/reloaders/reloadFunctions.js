/** @format
 *
 * GPT 4o By mahaaranii
 * Version: 6.0.0-beta
 * © 2024 NextGen Coders
 */

module.exports = async (client) => {
  let functionFile = Object.keys(require.cache).filter(
    (f) => f.includes("functions") && !f.includes("node_modules"),
  );

  for (key of functionFile) {
    try {
      delete require.cache[require.resolve(key)];
    } catch (e) {}
  }

  return `Re-Loaded Functions`;
};
