/** @format
 *
 * GPT 4o By mahaaranii
 * Version: 6.0.0-beta
 * © 2024 NextGen Coders
 */

module.exports = {
  name: "error",
  run: async (client, name, error) => {
    client.log(`Lavalink "${name}" error ${error}`, "error");
  },
};
