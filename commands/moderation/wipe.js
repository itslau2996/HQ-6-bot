const { SlashCommandBuilder } = require('discord.js');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wipe')
		.setDescription('e'),
	async execute(interaction) {
        if (interaction.user.id === '642288908381585408') {
            db.run('DELETE FROM reservaties')
            interaction.reply('done')
		} else {interaction.reply({ content: 'ERROR: Missing access', ephemeral: true})}
    }
}