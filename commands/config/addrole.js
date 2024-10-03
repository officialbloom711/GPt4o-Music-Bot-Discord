const { Client, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'role',
    aliases: ['r'],
    category: 'mod',
    premium: true,

    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    execute: async (client, message, args) => {
        const defaultPrefix = '-'; 
        let customPrefix;

        try {
            const key = `${client.user.id}_${message.guild.id}`;
            customPrefix = await client.db.pfx.get(key);
        } catch (error) {
            console.error("Error fetching custom prefix:", error);
        }

        const embed = new EmbedBuilder().setColor(client.color);
        const ownerIds = ['920938695060774922'];
        let isOwner = ownerIds.includes(message.author.id);

        if (!isOwner && !message.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji?.cross || '<a:warn:1270709636726788157>'} | You must have \`Manage Roles\` permissions to use this command.`
                        )
                ]
            });
        }

        if (!isOwner && !message.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji?.cross || '<a:warn:1270709636726788157>'} | I don't have \`Manage Roles\` permissions to execute this command.`
                        )
                ]
            });
        }

        let role = await findMatchingRoles(
            message.guild,
            args.slice(1).join(' ')
        );

        let member =
            message.guild.members.cache.get(args[0]) ||
            message.mentions.members.first();

        let prefixDisplay;
        if (customPrefix) {
            prefixDisplay = `${customPrefix} | ${defaultPrefix}`;
        } else {
            prefixDisplay = `${defaultPrefix}`;
        }

        if (!member) {
            return message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji?.cross || '<a:warn:1270709636726788157>'} | You didn't use the command correctly.\nUse: ${prefixDisplay}role <user> <role>`
                        )
                ]
            });
        }

        role = role[0];
        if (!role) {
            return message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji?.cross || '<a:warn:1270709636726788157>'} | You didn't provide a valid role.\nUse: ${prefixDisplay}role <user> <role>`
                        )
                ]
            });
        }

        if (role.managed) {
            return message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji?.cross || '<:HvnCross:1274050645623705660>'} | This role is managed by an integration.`
                        )
                ]
            });
        }

        if (!isOwner && role.position >= message.guild.members.me.roles.highest.position) {
            return message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji?.cross || '<:HvnCross:1274050645623705660>'} | I can't provide this role as my highest role is either below or equal to the provided role.`
                        )
                ]
            });
        }

        if (!isOwner && message.member.roles.highest.position <= role.position) {
            return message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji?.cross || '<:HvnCross:1274050645623705660>'} | I can't provide this role as your highest role is either below or equal to the provided role.`
                        )
                ]
            });
        }

        let hasRole = member.roles.cache.has(role.id);
        if (hasRole) {
            member.roles.remove(
                role.id,
                `${message.author.tag}(${message.author.id})`
            );
            return message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji?.tick || '<:HvnTick:1273315933460369562>'} | Successfully removed <@&${role.id}> from <@${member.id}>.`
                        )
                ]
            });
        } else {
            member.roles.add(
                role.id,
                `${message.author.tag}(${message.author.id})`
            );
            return message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji?.tick || '<:HvnTick:1273315933460369562>'} | Successfully added <@&${role.id}> to <@${member.id}>.`
                        )
                ]
            });
        }
    }
};

function findMatchingRoles(guild, query) {
    const ROLE_MENTION = /<?@?&?(\d{17,20})>?/;
    if (!guild || !query || typeof query !== 'string') return [];

    const patternMatch = query.match(ROLE_MENTION);
    if (patternMatch) {
        const id = patternMatch[1];
        const role = guild.roles.cache.find((r) => r.id === id);
        if (role) return [role];
    }

    const exact = [];
    const startsWith = [];
    const includes = [];
    guild.roles.cache.forEach((role) => {
        const lowerName = role.name.toLowerCase();
        if (role.name === query) exact.push(role);
        if (lowerName.startsWith(query.toLowerCase())) startsWith.push(role);
        if (lowerName.includes(query.toLowerCase())) includes.push(role);
    });
    if (exact.length > 0) return exact;
    if (startsWith.length > 0) return startsWith;
    if (includes.length > 0) return includes;
    return [];
}
