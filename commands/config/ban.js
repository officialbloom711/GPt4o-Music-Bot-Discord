const { Client, Message, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'ban',
    aliases: ['hackban', 'fuckban', 'fuckoff'],
    category: 'mod',
    premium: true,

    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    execute: async (client, message, args) => {
        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji?.cross || '<a:warn:1270709636726788157>'} | You must have \`Ban Members\` permissions to use this command.`
                        )
                ]
            });
        }
        if (!message.guild.members.me.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji?.cross || '<a:warn:1270709636726788157>'} | I must have \`Ban Members\` permissions to use this command.`
                        )
                ]
            });
        }

        let user = await getUserFromMention(message, args[0]);
        if (!user) {
            try {
                user = await client.users.fetch(args[0]);
            } catch (error) {
                return message.channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(client.color)
                            .setDescription(
                                `${client.emoji?.cross || '<a:warn:1270709636726788157>'} | Please provide a valid user ID or mention a member.`
                            )
                    ]
                });
            }
        }

        let reason = args.slice(1).join(' ') || 'No reason provided';
        reason = `${message.author.tag} (${message.author.id}) | ` + reason;

        if (!user) {
            return message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`${client.emoji?.cross || '<a:warn:1270709636726788157>'} | User not found.`)
                ]
            });
        }

        if (user.id === client.user.id) {
            return message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji?.cross || '<:HvnCross:1274050645623705660>'} | If you ban me, who will play musc in your server ?`
                        )
                ]
            });
        }

        if (user.id === message.guild.ownerId) {
            return message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji?.cross || '<:HvnCross:1274050645623705660>'} | I can't ban the owner of this server.`
                        )
                ]
            });
        }
    

        let check = message.guild.members.cache.has(user.id);
        if (check || user.bannable) {
            try {
                const banMessage = new EmbedBuilder()
                    .setAuthor({
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({ dynamic: true })
                    })
                    .setDescription(
                        `<:Ban:1273492462479999097> You have been banned from **${message.guild.name}**\nExecutor: <@${message.author.id}>\nReason: \`${reason}\``
                    )
                    .setColor(client.color)
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));

                let member = await message.guild.members.fetch(user.id, true);
                await message.guild.members.ban(member.id, { reason });
                await member.send({ embeds: [banMessage] }).catch(() => null);
            } catch (err) {
                return message.channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(client.color)
                            .setDescription(
                                `${client.emoji?.cross || '<:HvnCross:1274050645623705660>'} | My highest role is below **<@${user.id}>**`
                            )
                    ]
                });
            }

            return message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji.tick || '<:HvnTick:1273315933460369562>'} | Successfully banned **<@${user.id}>** from the server.`
                        )
                ]
            });
        }

        if (!check) {
            try {
                const banMessage = new EmbedBuilder()
                    .setAuthor({
                        name: message.author.tag,
                        iconURL: message.author.displayAvatarURL({ dynamic: true })
                    })
                    .setDescription(
                        `You have been banned from ${message.guild.name}\nExecutor: ${message.author.tag}\nReason: \`${reason}\``
                    )
                    .setColor(client.color)
                    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));

                let member = await client.users.fetch(user.id);
                await message.guild.bans.create(member.id, { reason });
            } catch (err) {
                return message.channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(client.color)
                            .setDescription(
                                `${client.emoji?.cross || '<:HvnCross:1274050645623705660>'} | My highest role is below or the same as **<@${user.id}>**`
                            )
                    ]
                });
            }

            return message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji.tick || '<:HvnTick:1273315933460369562>'} | Successfully banned **<@${user.id}>** from the server.`
                        )
                ]
            });
        }
    }
}

/**
 * Helper function to get a user from a mention or ID.
 * @param {Message} message - The message object
 * @param {string} mention - The mention or user ID
 * @returns {Promise<User|null>} The user object or null
 */
async function getUserFromMention(message, mention) {
    if (!mention) return null;

    const matches = mention.match(/^<@!?(\d+)>$/);
    if (!matches) return null;

    const id = matches[1];
    try {
        return await message.client.users.fetch(id);
    } catch {
        return null;
    }
}
