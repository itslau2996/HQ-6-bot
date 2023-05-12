const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('log')
        .setDescription('zie het verleden van een gebruiker')
        .addUserOption(option => option.setName('target').setDescription('dit is de persoon waarvan je het verleden wil zien').setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target')
        const embed = new EmbedBuilder()
            .setTitle(`${target.username}'s log`)
            .setColor('Orange')
        db.all(`SELECT REASON reason, MOD issuer FROM warns WHERE USRID = ?`, [target.id], (err, rows) => {
            if (err) {
                throw err;
            } else {
                rows.forEach(async (row) => {
                    embed.spliceFields(0, 0, { name: `**Door:** ${row.issuer}`, value: `**Reden:** ${row.reason}`, inline: false })
                })
                return interaction.reply({ embeds: [embed] })
            }
        })
    }
}