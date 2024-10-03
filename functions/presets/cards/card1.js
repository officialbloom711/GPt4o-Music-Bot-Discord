const { AttachmentBuilder } = require("discord.js");
  const { muzicard } = require("muzicard");
const genButtons = require("@gen/playerButtons.js");
module.exports = async (data, client, player) => {

  const card = new muzicard()
        .setName(data.title)
        .setAuthor(data.author)
        .setColor("auto")
        .setTheme("neonx")
        .setBrightness(69)
        .setThumbnail(data.thumbnail) 
        .setProgress(data.progress)
        .setStartTime("0:00")
        .setEndTime(data.duration);

    const buffer = await card.build();
    const attachment = new AttachmentBuilder(buffer, { name: `muzicard.png` });
    const embed = new client.embed()
    .setTitle(`${client.user.username} is currently playing :\n`)
    .img(`attachment://${attachment.name}`);

  return [[embed], [attachment], [genButtons(client, player)[0]]];
};