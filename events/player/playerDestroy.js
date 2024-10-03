/** @format
 *
 * GPT 4o By mahaaranii
 * Version: 6.0.0-beta
 * © 2024 NextGen Coders
 */

module.exports = {
  name: "playerDestroy",
  run: async (client, player) => {
    if (player.data.get("message"))
      player.data
        .get("message")
        .edit({
          embeds: [client.endEmbed],
          components: [],
          files: [],
        })
        .catch(() => {});

    if (player.data.get("autoplay"))
      try {
        player.data.delete("autoplay");
      } catch (err) {}

    await client.webhooks.player
      .send({
        username: client.user.username,
        avatarURL: client.user.displayAvatarURL(),
        embeds: [
          new client.embed().desc(
            `**Player Destroyed** in [ ${client.guilds.cache.get(
              player.guildId,
            )} ]`,
          ),
        ],
      })
      .catch(() => {});
  },
};
