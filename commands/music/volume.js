/** @format
 *
 * GPT 4o By mahaaranii
 * Version: 6.0.0-beta
 * © 2024 NextGen Coders
 */

module.exports = {
  name: "volume",
  aliases: ["v", "vol"],
  cooldown: "",
  category: "music",
  usage: "[ 1 - 200 ]",
  description: "Set player volume",
  args: false,
  vote: false,
  new: false,
  admin: false,
  owner: false,
  botPerms: [],
  userPerms: [],
  player: true,
  queue: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  execute: async (client, message, args, emoji) => {
    const player = await client.getPlayer(message.guild.id);

    if (!args.length) {
      let emb = new client.embed().desc(
        `${emoji.bell} **Current player volume: \`[ ${player.volume}% ]\`**`
      );
      return message.reply({ embeds: [emb] }).catch(() => {});
    }

    let volume = Number(args[0]);
    if (isNaN(volume) || volume < 1 || volume > 200) {
      return await message
        .reply({
          embeds: [
            new client.embed().desc(
              `${emoji.no} **Volume must be greater than 0 and less than 100**`,
            ),
          ],
        })
        .catch(() => {});
    }

    await player.setVolume(volume);
    await client.sleep(500);

    return await message
      .reply({
        embeds: [
          new client.embed().desc(
            `${emoji.yes} **Volume set to: \`[ ${volume}% ]\`**`
          ),
        ],
      })
      .catch(() => {});
  },
};
