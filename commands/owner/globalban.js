const { EmbedBuilder } = require('discord.js');

const ownersxd = ['702050985660514364', '1207108142157275228'];

module.exports = {
    name: 'globalban',
    aliases: [],
    category: 'owner',
    execute: async (client, message, args) => {
        if (!ownersxd.includes(message.author.id)) return;

        const userId = args[0];
        if (!userId) {
            return message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor('#FF0000') 
                        .setDescription(`${client.emoji?.cross || '<:HvnCross:1274050645623705660>'} | Please provide a valid user ID or mention a member.`)
                ]
            });
        }

        try {
            for (const guild of client.guilds.cache.values()) {
                const member = await guild.members.fetch(userId).catch(() => null);
                if (member) {
                    setTimeout(async () => {
                        try {
                            await member.ban({
                                reason: "User has been globally banned due to repeated and severe violations of Discord's terms of service, including but not limited to harassment, nuking, spamming, distributing malicious content, and engaging in activities that undermine the safety and well-being of the Discord community. This global ban is a result of a pattern of behavior that is deemed unacceptable, and it is necessary to ensure the integrity and security of multiple servers on the platform."
                            });

                            message.channel.send({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor('#00FF00') 
                                        .setDescription(`<:HvnTick:1273315933460369562> Successfully banned user from ${guild.name}.`)
                                ]
                            });
                        } catch (error) {
                            message.channel.send({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor('#FF0000') 
                                        .setDescription(`<:HvnCross:1274050645623705660> Failed to ban user from ${guild.name}: ${error.message}`)
                                ]
                            });
                        }
                    }, 3000); 
                }
            }
        } catch (error) {
            message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor('#FF0000') 
                        .setDescription(`An error occurred while attempting to ban the user: ${error.message}`)
                ]
            });
        }
    }
};
