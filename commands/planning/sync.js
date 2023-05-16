const { SlashCommandBuilder } = require('discord.js');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sync')
        .setDescription('syncs the bot'),
    async execute(interaction) {
        const members = interaction.guild.members.fetch({ force: true })
            .then(members => members.map(member => db.run(`INSERT INTO strafblad(USRID, WARNCOUNT, MUTECOUNT, KICKCOUNT, BANCOUNT) VALUES(${member.id}, 0, 0, 0, 0)`)))
            .catch(console.log)

        interaction.reply({ content: `Members gesynced`, ephemeral: true})
        let sql = `INSERT INTO omnummer(gear, name) VALUES(?, ?)`

        // db.run(sql, ['1', 'Windows 1'])
        // db.run(sql, ['2', 'Windows 2'])
        // db.run(sql, ['3', 'Windows 3'])
        // db.run(sql, ['4', 'Apple 1'])
        // db.run(sql, ['5', 'Apple 2'])
        // db.run(sql, ['6', 'Apple 3'])
        // db.run(sql, ['7', 'VR 1'])
        // db.run(sql, ['8', 'VR 2'])
        // db.run(sql, ['9', 'VR 3'])
        // db.run(sql, ['10', 'Headset 1'])
        // db.run(sql, ['11', 'Headset 2'])
        // db.run(sql, ['12', 'Headset 3'])
    }
}