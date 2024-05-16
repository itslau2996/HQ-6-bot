const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wipe')
        .setDescription('Verwijdert alle huidige reserveringen, Backup voor automatische systeem.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const client = interaction.client
        const admChannel = client.channels.cache.get("1235684112602501181");
        db.run('DELETE FROM reservaties')
        admChannel.send(`Tables wiped by ${interaction.user.id}.`)
        interaction.reply({ ephemeral: true, content: ':white_check_mark:'})
        client.users.send('642288908381585408', `<@${interaction.user.id}>: WIPE`)

    }
}