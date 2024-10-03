const { Client, EmbedBuilder, PermissionsBitField, GuildMember } = require('discord.js');

module.exports = {
    name: 'kick',
    aliases: [],
    category: 'mod',
    premium: true,
    execute: async (client, message, args) => {
        
        if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji?.cross || '<:Alert:1273491192210001993>'} | You must have \`Kick Members\` permission to use this command.`
                        )
                ]
            });
        }

        
        const isOwner = message.author.id === message.guild.ownerId;

        
        let user;
        try {
            user = await getUserFromMention(message, args[0]) || await message.guild.members.fetch(args[0]);
        } catch (error) {
            return message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji?.cross || '<:Alert:1273491192210001993>'} | Please provide a valid user ID or mention a member.`
                        )
                ]
            });
        }

       
        const reason = args.slice(1).join(' ') || 'No reason provided';
        const formattedReason = `${message.author.tag} (${message.author.id}) | ${reason}`;

       
        const userNotFound = new EmbedBuilder()
            .setDescription(`${client.emoji?.cross || '<:Alert:1273491192210001993>'} | User not found`)
            .setColor(client.color);
        const mentionUser = new EmbedBuilder()
            .setDescription(`${client.emoji?.cross || '<:Alert:1273491192210001993>'} | Mention the user first`)
            .setColor(client.color);

      
        if (!user || !(user instanceof GuildMember)) return message.channel.send({ embeds: [mentionUser] });
        if (user === undefined) return message.channel.send({ embeds: [userNotFound] });

        
        if (user.id === client.user.id) {
            return message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`${client.emoji?.cross || '<a:Cross:1273648680540311573>'} | You can't kick me.`)
                ]
            });
        }

        if (user.id === message.guild.ownerId) {
            return message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`${client.emoji?.cross || '<a:Cross:1273648680540311573>'} | I can't kick the owner of this server.`)
                ]
            });
        }

        
        if (!hasHigherRole(message.member, user) && !isOwner) {
            return message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription(`${client.emoji?.cross || '<a:Cross:1273648680540311573>'} | You must have a higher role than the user to use this command.`)
                ]
            });
        }

        
        if (!user.kickable) {
            return message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${client.emoji?.cross || '<a:Cross:1273648680540311573>'} | My highest role is below **<@${user.id}>**.`)
                        .setColor(client.color)
                ]
            });
        }

        
        const kickNotification = new EmbedBuilder()
            .setAuthor({
                name: message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true })
            })
            .setDescription(`You have been kicked from **${message.guild.name}**\nExecutor: <@${message.author.id}>\nReason: \`${formattedReason}\``)
            .setColor(client.color)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }));

        
        await message.guild.members.kick(user.id, formattedReason).catch(() => null);
        await user.send({ embeds: [kickNotification] }).catch(() => null);

       
        const successEmbed = new EmbedBuilder()
            .setDescription(`${client.emoji.tick || '<a:Check:1273627161332289616>'} | Successfully kicked **<@${user.id}>** from the server.`)
            .setColor(client.color);

        return message.channel.send({ embeds: [successEmbed] });
    }
};


async function getUserFromMention(message, mention) {
    if (!mention) return null;

    const matches = mention.match(/^<@!?(\d+)>$/);
    if (!matches) return null;

    const id = matches[1];
    try {
        return await message.guild.members.fetch(id);
    } catch (error) {
        return null;
    }
}


function hasHigherRole(member1, member2) {
   
    if (!(member1 instanceof GuildMember) || !(member2 instanceof GuildMember)) {
        console.error('One of the provided objects is not a GuildMember:', { member1, member2 });
        return false;
    }

    
    const roleComparison = member1.roles.highest.comparePositionTo(member2.roles.highest);
    return roleComparison > 0;
}
