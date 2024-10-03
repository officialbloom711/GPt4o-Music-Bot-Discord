/** @format
 *
 * GPT 4o By mahaaranii
 * Version: 6.0.0-beta
 * © 2024 NextGen Coders
 */

const { AttachmentBuilder } = require("discord.js");

module.exports = async (file, channel, time) => {
  await require("@functions/archiver.js")(file);
  await channel
    .send({
      files: [
        new AttachmentBuilder(file, {
          name: file,
        }),
      ],
    })
    .then(async (msg) => {
      await require("fs").promises.unlink(file, () => {
        return;
      });
      setTimeout(async () => {
        await msg.delete().catch(() => {});
      }, time);
    });
};
