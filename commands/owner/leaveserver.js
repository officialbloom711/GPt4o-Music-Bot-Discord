const { EmbedBuilder } = require('discord.js');
const fs = require('fs');
const yaml = require('js-yaml');

// Load the YAML configuration from the specified path
let config;
try {
    config = yaml.load(fs.readFileSync('/home/gpt4o/htdocs/gpt4o.com/config.yml', 'utf8'));
} catch (e) {
    console.error('Error loading YAML configuration:', e);
    process.exit(1);
}

module.exports = {
    name: 'leaveserver',
    category: 'owner',
    aliases: ['leaveg', 'gleave'],
    description: 'Leaves A Guild',
    execute: async (client, message, args) => {
        if (!config.BOT.OWNERS.includes(message.author.id)) {
            return message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription('You do not have permission to use this command.')
                ]
            });
        }

        let id = args[0];
        if (!id) {
            return message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription('You didn\'t provide the server Id.')
                ]
            });
        }

        let guild;
        try {
            guild = await client.guilds.fetch(id);
        } catch (e) {
            return message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(client.color)
                        .setDescription('You didn\'t provide a valid server Id.')
                ]
            });
        }

        let name = guild?.name || 'No Name Found';
        await guild.leave();

        return message.channel.send({
            embeds: [
                new EmbedBuilder()
                    .setColor(client.color)
                    .setDescription(`<a:Check:1273627161332289616> Successfully left **${name} (${id})**.`)
            ]
        });
    }
};
