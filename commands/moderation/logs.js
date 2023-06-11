const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, userMention } = require('discord.js');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')
const fucs = require('./../../functions')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('log')
        .setDescription('zie het verleden van een gebruiker')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option => option.setName('target').setDescription('dit is de persoon waarvan je het verleden wil zien').setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getUser('target')
        const accid = await fucs.getAccId(target.id)
        const embed = new EmbedBuilder()
            .setTitle(`${target.username}'s log`)
            .setColor('Orange')
        db.all(`SELECT reason, mod FROM warns WHERE accId = ?`, [accid], (err, rows) => {
            if (err) {
                throw err;
            } else {
                rows.forEach(async (row) => {
                    embed.spliceFields(0, 0, { name: `Door: ${row.mod}`, value: `**Reden:** ${row.reason}`, inline: false })
                })
                return interaction.reply({ ephemeral: true, embeds: [embed] })
            }
        })
    }
}