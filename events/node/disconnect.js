/** @format
 *
 * GPT 4o By mahaaranii
 * Version: 6.0.0-beta
 * © 2024 NextGen Coders
 */

module.exports = {
  name: "disconnect",
  run: async (client, name, players, moved) => {
    client.log(`Lavalink ${name}: Disconnected`, "warn");
  },
};
