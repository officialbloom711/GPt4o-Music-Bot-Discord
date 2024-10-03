/** @format
 *
 * Fuego By Painfuego
 * Version: 6.0.0-beta
 * © 2024 1sT-Services
 */

const genButtons = require("@gen/playerButtons.js");

module.exports = async (data, client, player) => {
  /*
  const title = data.title;
  const author = data.author;
  const thumbnail = data.thumbnail;
  const duration = data.duration;
  const color = data.color;
  const progress = data.progress;
  const source = data.source;
  */

  const title = data.title;
  const author = data.author;
  const duration = data.duration;
  const source = data.source;

  const thumbs = {
    youtube:
      "https://media.discordapp.net/attachments/1188399617121984542/1192720573231538216/yt1.png",
    soundcloud:
      "https://media.discordapp.net/attachments/1188399617121984542/1192720572329762937/soundcloud.png",
    spotify:
      "https://media.discordapp.net/attachments/1188399617121984542/1192720573231538216/yt1.png",
    deezer:
      "https://media.discordapp.net/attachments/1188399617121984542/1192720855847940106/image.png",
    nicovideo:
      "https://cdn.discordapp.com/attachments/1273235557182472296/1273235602418171914/www.reallygreatsite.com.jpg?ex=66bfdacf&is=66be894f&hm=86325175da10b132e2ed724c14e8b13d75446108ec704fb450e5a715d1359288&",
  };

  let thumb = thumbs[${source}];

  const embed = new client.embed()
    .thumb(thumb)
    .desc(
      ### I am currently playing \n +
        **Name: [${
          title.charAt(0).toUpperCase() +
          title.substring(0, 20).slice(1).toLowerCase()
        }](https://x.x.x.)\n +
        Author: ${
          author.charAt(0).toUpperCase() +
          author.substring(0, 12).slice(1).toLowerCase()
        }\n +
        Duration: \${duration}\**,
    );