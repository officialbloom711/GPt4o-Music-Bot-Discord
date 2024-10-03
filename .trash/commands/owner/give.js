const { PermissionsBitField } = require('discord.js');
const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

// Load configuration from the absolute path
const configPath = path.join('/home/container', 'config.yml');
const config = yaml.parse(fs.readFileSync(configPath, 'utf8'));
const owners = config.BOT.OWNERS;

module.exports = {
    data: {
        name: 'give',
        description: 'Assigns a role to a user',
        options: [
            {
                name: 'role',
                type: 'STRING',
                description: 'The role to assign',
                required: true
            },
            {
                name: 'user',
                type: 'USER',
                description: 'The user to assign the role to',
                required: true
            }
        ]
    },
    async execute(interaction) {
        // Check if the user is an owner
        if (!owners.includes(interaction.user.id)) {
            return interaction.reply('You do not have permission to use this command.');
        }

        const roleArg = interaction.options.getString('role');
        const userArg = interaction.options.getUser('user');

        const role = interaction.guild.roles.cache.find(r => r.name === roleArg || r.id === roleArg);
        const user = interaction.guild.members.cache.get(userArg.id);

        if (!role) {
            return interaction.reply('Role not found.');
        }

        if (!user) {
            return interaction.reply('User not found.');
        }

        if (!interaction.guild.me.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
            return interaction.reply('I do not have permission to manage roles.');
        }

        try {
            await user.roles.add(role);
            return interaction.reply(`Successfully gave the role ${role.name} to ${user.user.tag}.`);
        } catch (error) {
            console.error(error);
            return interaction.reply('Failed to give the role. Ensure the bot has the necessary permissions and the role is below the bot’s highest role in the role hierarchy.');
        }
    }
};
