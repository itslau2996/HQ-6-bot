const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Replies with hi!'),
	async execute(interaction) {
        interaction.reply('hi')
		}
    }