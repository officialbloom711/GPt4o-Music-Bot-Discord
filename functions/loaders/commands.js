/** @format
 *
 * GPT 4o By mahaaranii
 * Version: 6.0.0-beta
 * © 2024 NextGen Coders
 */

const { readdirSync } = require("fs");

module.exports = async (client) => {
  let count = 0;
  readdirSync("./commands").forEach((dir) => {
    const commandFiles = readdirSync(`./commands/${dir}/`).filter((f) =>
      f.endsWith(".js"),
    );
    for (const file of commandFiles) {
      count++;
      const command = require(`${process.cwd()}/commands/${dir}/${file}`);
      client.commands.set(command.name, command);
    }
  });
  return count;
};
