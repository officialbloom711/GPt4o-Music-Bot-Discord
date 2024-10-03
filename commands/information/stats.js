/** @format
 *
 * GPT 4o By mahaaranii
 * Version: 6.0.0-beta
 * © 2024 NextGen Coders
 */

const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
  name: "stats",
  aliases: ["stats","st"],
  category: "information",
  description: "Shows bot's shard stats",
  args: false,
  execute: async (client, message, args, emoji) => {
    try {
      const loadingEmbed = new client.embed().setDescription(
        `${emoji.cool} **Fetching details, please wait . . .**`
      );
      const wait = await message.reply({ embeds: [loadingEmbed] });

      const statsData = await client.cluster.broadcastEval(async (x) => {
        const osUtils = require("os-utils");
        const cpuUsage = await new Promise((resolve) => {
          osUtils.cpuUsage((v) => resolve(v));
        });

        const totalUsers = x.guilds.cache.reduce((total, guild) => total + guild.memberCount, 0);
        const totalPlayers = x.manager && x.manager.players ? [...x.manager.players.values()].length : 0;
        const playingPlayers = x.manager && x.manager.players ? [...x.manager.players.values()].filter((p) => p.playing).length : 0;
        const serverCount = x.guilds.cache.size;

        return [
          `[**__${x.emoji.free} Basic Info__**](${x.support})\n` +
            `**⠀⠀⠀• Ping : **\`${x.ws.ping} ms\`\n` +
            `**⠀⠀⠀• Uptime : **\`${x.formatTime(x.uptime)}\`\n` +
            `[**__${x.emoji.cog} Resources__**](${x.support})\n` +
            `**⠀⠀⠀• RAM : **\`${x.formatBytes(process.memoryUsage().heapUsed)}\`\n` +
            `**⠀⠀⠀• CPU : **\`${cpuUsage.toFixed(2)} %vCPU\`\n` +
            `[**__${x.emoji.user} Size & Stats__**](${x.support})\n` +
            `**⠀⠀⠀• Players: **\`${playingPlayers}/${totalPlayers}\`\n` +
            `**⠀⠀⠀• Servers: **\`${serverCount}\`\n` +
            `**⠀⠀⠀• Users : **\`${(totalUsers / 1000).toFixed(3)}K\`\n`,
        ];
      });

      const statsEmbed = new client.embed()
        .setTitle(`**__GPT4o Stats:__**`)
        .setThumbnail("https://cdn.discordapp.com/avatars/1213025121669750814/5f52b936f9df374f778bc76c18d32aa0.webp") // Adds the thumbnail
        .setFooter({ text: `Page : [1/3] By ━● Team GPT4o` });

      statsData.forEach((data, i) => {
        statsEmbed.addFields({
          name: `Cluster [${i}]:`,
          value: data[0],
          inline: true,
        });
      });

      const nodeStatsEmbed = new client.embed()
        .setTitle(`**__Node Status:__**`)
        .setThumbnail("https://cdn.discordapp.com/avatars/1213025121669750814/5f52b936f9df374f778bc76c18d32aa0.webp") // Adds the thumbnail
        .setDescription(
          [...client.manager.shoukaku.nodes.values()]
            .map((node) => {
              if (!node || !node.stats) {
                return `[**__${client.emoji.cog} ${node.name || 'Unknown'}__**](https://0.0)\n` +
                  `**⠀⠀⠀• Players : **\`N/A\`\n` +
                  `**⠀⠀⠀• CPU : **\`N/A\`\n` +
                  `**⠀⠀⠀• RAM : **\`N/A\`\n` +
                  `**⠀⠀⠀• Uptime : **\`N/A\``;
              }

              return `[**__${client.emoji.cog} ${node.name}__**](https://0.0)\n` +
                `**⠀⠀⠀• Players : **\`${node.stats.players}\`\n` +
                `**⠀⠀⠀• CPU : **\`${(node.stats.cpu.systemLoad + node.stats.cpu.lavalinkLoad).toFixed(2)}/${node.stats.cpu.cores * 100} %vCPU\`\n` +
                `**⠀⠀⠀• RAM : **\`${(node.stats.memory.used / (1024 * 1024 * 1024)).toFixed(1)}/${((node.stats.memory.reservable + node.stats.memory.allocated) / (1024 * 1024 * 1024)).toFixed(1)} GiB\`\n` +
                `**⠀⠀⠀• Uptime : **\`${client.formatTime(node.stats.uptime)}\``;
            })
            .join("\n\n")
        )
        .setFooter({ text: `Page : [2/3] By ━● Team GPT4o` });

      const teamEmbed = new client.embed()
        .setTitle("**__Team Info__**")
        .addFields(
          {
            name: `${emoji.developer} Developers`,
            value:
     
              
              `1. [! Una 🌸](https://discordapp.com/users/920938695060774922) (Main Dev)`,
            inline: false,
          }
      
        )
        .setFooter({ text: "Join GPT4o Music Support Server For More Info!" })
        .setThumbnail(
          "https://cdn.discordapp.com/avatars/1213025121669750814/5f52b936f9df374f778bc76c18d32aa0.webp"
        );

      const pages = [statsEmbed, nodeStatsEmbed, teamEmbed];
      let page = 0;

      const statsButton = new ButtonBuilder()
        .setCustomId("stats")
        .setLabel("Stats")
        .setStyle(ButtonStyle.Secondary);

      const nodeButton = new ButtonBuilder()
        .setCustomId("node")
        .setLabel("Node")
        .setStyle(ButtonStyle.Secondary);

      const teamButton = new ButtonBuilder()
        .setCustomId("team")
        .setLabel("Team Info")
        .setStyle(ButtonStyle.Secondary);

      const row = new ActionRowBuilder().addComponents(
        statsButton,
        nodeButton,
        teamButton
      );

      const m = await wait.edit({ embeds: [pages[page]], components: [row] });

      const collector = m.createMessageComponentCollector({
        filter: () => true,
        time: 60000,
        idle: 30000,
      });

      collector.on("collect", async (c) => {
        if (!c.deferred) await c.deferUpdate();

        switch (c.customId) {
          case "stats":
            page = 0;
            break;
          case "node":
            page = 1;
            break;
          case "team":
            page = 2;
            break;
        }

        await m.edit({ embeds: [pages[page]], components: [row] });
      });

      collector.on("end", async () => {
        await m.edit({ components: [] });
      });
    } catch (error) {
      console.error("An error occurred in the stats command:", error);
      await message.reply(
        "An error occurred while fetching the stats. Please try again later."
      );
    }
  },
};
