/** @format
 *
 * GPT 4o By mahaaranii
 * Version: 6.0.0-beta
 * © 2024 NextGen Coders
 */

const { readdirSync } = require("fs");
module.exports = async (client) => {
  let count = 0;
  readdirSync("./events/player").forEach((file) => {
    const event = require(`${process.cwd()}/events/player/${file}`);
    client.manager.on(event.name, (...args) => event.run(client, ...args));
    count++;
  });
  return count;
};
