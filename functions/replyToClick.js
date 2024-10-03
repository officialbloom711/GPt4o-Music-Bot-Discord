/** @format
 *
 * GPT 4o By mahaaranii
 * Version: 6.0.0-beta
 * © 2024 NextGen Coders
 */

module.exports = replyToClick = async (int, args, ephemeral = true) => {
  args
    ? await int
        .reply({
          embeds: [new int.client.embed().desc(`${args}`)],
          ephemeral: ephemeral,
        })
        .catch((err) => {
          int.deferUpdate();
        })
    : await int.deferUpdate();
};
