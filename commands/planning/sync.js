const { SlashCommandBuilder } = require('discord.js');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sync')
        .setDescription('syncs the bot'),
    async execute(interaction) {
        const members = interaction.guild.members.fetch({ force: true })
            .then(members => members.filter((user) => !user.user.bot))
            .then(members => members.map(member => db.run(`INSERT INTO users(discordId) VALUES(${member.id})`)))
            .catch(console.log)
        interaction.reply({ content: `Members gesynced`, ephemeral: true })

    }
}