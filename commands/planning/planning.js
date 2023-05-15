const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('reservaties')
        .setDescription('Displays every reservation.'),
    async execute(interaction) {
        sql = `SELECT USRID FROM reservaties WHERE (gear= ? AND daypart= ?)`
        async function getID(gear, dp, db) {
            return new Promise((resolve, reject) => {
                var value = null
                db.get(`SELECT USRID FROM reservaties WHERE (gear= ${gear} AND daypart= '${dp}')`, (err, row) => {
                    if (typeof row === 'undefined') {
                        value = 'open'
                    } else {
                        value = `<@${row.USRID}>`
                    }
                    resolve(value)
                })

            })
        }
        const g1d1 = await getID('1', 'd1', db)
        const g1d2 = await getID('1', 'd2', db)
        const g2d1 = await getID('2', 'd1', db)
        const g2d2 = await getID('2', 'd2', db)
        const g3d1 = await getID('3', 'd1', db)
        const g3d2 = await getID('3', 'd2', db)
        const g4d1 = await getID('4', 'd1', db)
        const g4d2 = await getID('4', 'd2', db)
        const g5d1 = await getID('5', 'd1', db)
        const g5d2 = await getID('5', 'd2', db)
        const g6d1 = await getID('6', 'd1', db)
        const g6d2 = await getID('6', 'd2', db)
        const g7d1 = await getID('7', 'd1', db)
        const g7d2 = await getID('7', 'd2', db)
        const g7d3 = await getID('7', 'd3', db)
        const g8d1 = await getID('8', 'd1', db)
        const g8d2 = await getID('8', 'd2', db)
        const g8d3 = await getID('8', 'd3', db)
        const g9d1 = await getID('9', 'd1', db)
        const g9d2 = await getID('9', 'd2', db)
        const g9d3 = await getID('9', 'd3', db)
        const g10d1 = await getID('10', 'd1', db)
        const g10d2 = await getID('10', 'd2', db)
        const g11d1 = await getID('11', 'd1', db)
        const g11d2 = await getID('11', 'd2', db)
        const g12d1 = await getID('12', 'd1', db)
        const g12d2 = await getID('12', 'd2', db)
        const g13d1 = await getID('13', 'd1', db)
        const g13d2 = await getID('13', 'd2', db)
        const g14d1 = await getID('14', 'd1', db)
        const g14d2 = await getID('14', 'd2', db)
        const g15d1 = await getID('15', 'd1', db)
        const g15d2 = await getID('15', 'd2', db)
        const g16d1 = await getID('16', 'd1', db)
        const g16d2 = await getID('16', 'd2', db)
        const g17d1 = await getID('17', 'd1', db)
        const g17d2 = await getID('17', 'd2', db)
        const g18d1 = await getID('18', 'd1', db)
        const g18d2 = await getID('18', 'd2', db)

        embed = new EmbedBuilder()
            .setColor('DarkButNotBlack')
            .setTitle('Beschikbaarheid')
            .setDescription('Hieronder vind je alle computers en gear die er beschikbaar zijn!')
            .addFields(
                { name: 'Windows 1', value: `dagdeel 1: ${g1d1}\ndagdeel 2: ${g1d2}`, inline: true },
                { name: 'Windows 2', value: `dagdeel 1: ${g2d1}\ndagdeel 2: ${g2d2}`, inline: true },
                { name: 'Windows 3', value: `dagdeel 1: ${g3d1}\ndagdeel 2: ${g3d2}`, inline: true },
                { name: 'Apple 1', value: `dagdeel 1: ${g4d1}\ndagdeel 2: ${g4d2}`, inline: true },
                { name: 'Apple 2', value: `dagdeel 1: ${g5d1}\ndagdeel 2: ${g5d2}`, inline: true },
                { name: 'Apple 3', value: `dagdeel 1: ${g6d1}\ndagdeel 2: ${g6d2}`, inline: true },
                { name: 'VR 1', value: `dagdeel 1: ${g7d1}\ndagdeel 2: ${g7d2}\ndagdeel 3: ${g7d3}`, inline: true },
                { name: 'VR 2', value: `dagdeel 1: ${g8d1}\ndagdeel 2: ${g8d2}\ndagdeel 3: ${g7d3}`, inline: true },
                { name: 'VR 3', value: `dagdeel 1: ${g9d1}\ndagdeel 2: ${g9d2}\ndagdeel 3: ${g7d3}`, inline: true },
                { name: 'Headphones 1', value: `dagdeel 1: ${g10d1}\ndagdeel 2: ${g10d2}`, inline: true },
                { name: 'Headphones 2', value: `dagdeel 1: ${g11d1}\ndagdeel 2: ${g11d2}`, inline: true },
                { name: 'Headphones 3', value: `dagdeel 1: ${g12d1}\ndagdeel 2: ${g12d2}`, inline: true },
                { name: 'Microfoon 1', value: `dagdeel 1: ${g13d1}\ndagdeel 2: ${g13d2}`, inline: true },
                { name: 'Microfoon 2', value: `dagdeel 1: ${g14d1}\ndagdeel 2: ${g14d2}`, inline: true },
                { name: 'Microfoon 3', value: `dagdeel 1: ${g15d1}\ndagdeel 2: ${g15d2}`, inline: true },
                { name: 'Microfoon 4', value: `dagdeel 1: ${g16d1}\ndagdeel 2: ${g16d2}`, inline: true },
                { name: 'Camera', value: `dagdeel 1: ${g17d1}\ndagdeel 2: ${g17d2}`, inline: true },
                { name: 'Podcast set', value: `dagdeel 1: ${g18d1}\ndagdeel 2: ${g18d2}`, inline: true },
            )
            .setColor('#33b6e9')
        interaction.reply({ embeds: [embed] })
    }
}