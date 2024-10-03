/** @format
 *
 * GPT 4o By mahaaranii
 * Version: 6.0.0-beta
 * © 2024 NextGen Coders
 */

module.exports = async (client) => {
  await client.user.setPresence({
    activities: [
      {
        name: ` Chatting Ready, vibes activated! 🎧✨ | ${client.prefix}help`,
        type: require("discord.js").ActivityType.Custom,
      },
    ],
    status: "idle",
  });

  let mcount = 0;
  let gcount = client.guilds.cache.size;
  client.guilds.cache.forEach((g) => {
    mcount += g.memberCount;
  });

  let eventsSize = {};
  let commandsSize = {};
  commandsSize.slash = {};
  [
    eventsSize.client,
    eventsSize.node,
    eventsSize.player,
    eventsSize.custom,
    commandsSize.message,
  ] = await Promise.all([
    require("@loaders/clientEvents.js")(client),
    require("@loaders/nodeEvents")(client),
    require("@loaders/playerEvents")(client),
    require("@loaders/customEvents.js")(client),
    require("@loaders/commands.js")(client),
  ]);

  client.invite = {
    required: `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=37080065&scope=bot`,
    admin: `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`,
  };

  const supportServerLink = "https://discord.gg/9J9X4fzhSt"; // Replace with your actual support server link

  client.endEmbed = new client.embed()
    .desc(
      `**Enjoying Music with me?**\n` +
      `If yes, consider voting for me or [joining our support server](${supportServerLink}).`
    )
    .thumb(client.user.displayAvatarURL())
    .setAuthor({
      iconURL: client.user.displayAvatarURL(),
      name: client.user.username,
    })
    .setFooter({ text: "GPT4o Music | By Team GPT4o" });

  client.log(
    `Loaded ` +
    ` Client: ${eventsSize.client} ` +
    ` Node: ${eventsSize.node} ` +
    ` Player: ${eventsSize.player} ` +
    ` Custom: ${eventsSize.custom} `,
    "event"
  );
  client.log(`Loaded ` + ` Message: ${commandsSize.message} `, "cmd");
  client.log(`Ready for ${gcount} Servers | ${mcount} Users`, "ready");
};
