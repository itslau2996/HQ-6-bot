const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')
const fucs = require('./../../functions')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('reservaties')
        .setDescription('Displays every reservation.'),
    async execute(interaction) {
        async function getID(gear, dp, db) {
            return new Promise((resolve, reject) => {
                var value = null
                db.get(`SELECT accId FROM reservaties WHERE (gear= ${gear} AND daypart= '${dp}')`, async (err, row) => {
                    if (typeof row === 'undefined') {
                        value = 'open'
                    } else {
                        value = `<@${await fucs.getDiscId(row.accId)}>`
                    }
                    resolve(value)
                })

            })
        }


        embed = new EmbedBuilder()
            .setColor('DarkButNotBlack')
            .setTitle('Beschikbaarheid')
            .setDescription('Hieronder vind je alle computers en gear die er beschikbaar zijn!')
            .addFields(
                { name: 'Windows 1', value: `dagdeel 1: ${await getID('1', 'd1', db)}\ndagdeel 2: ${await getID('1', 'd2', db)}`, inline: true },
                { name: 'Windows 2', value: `dagdeel 1: ${await getID('2', 'd1', db)}\ndagdeel 2: ${await getID('2', 'd2', db)}`, inline: true },
                { name: 'Windows 3', value: `dagdeel 1: ${await getID('3', 'd1', db)}\ndagdeel 2: ${await getID('3', 'd2', db)}`, inline: true },
                { name: 'Apple 1', value: `dagdeel 1: ${await getID('4', 'd1', db)}\ndagdeel 2: ${await getID('4', 'd2', db)}`, inline: true },
                { name: 'Apple 2', value: `dagdeel 1: ${await getID('5', 'd1', db)}\ndagdeel 2: ${await getID('5', 'd2', db)}`, inline: true },
                { name: 'Apple 3', value: `dagdeel 1: ${await getID('6', 'd1', db)}\ndagdeel 2: ${await getID('6', 'd2', db)}`, inline: true },
                // { name: 'VR 1', value: `dagdeel 1: ${await getID('7', 'd1', db)}\ndagdeel 2: ${await getID('7', 'd2', db)}\ndagdeel 3: ${await getID('7', 'd3', db)}`, inline: true },
                // { name: 'VR 2', value: `dagdeel 1: ${await getID('8', 'd1', db)}\ndagdeel 2: ${await getID('8', 'd2', db)}\ndagdeel 3: ${await getID('8', 'd3', db)}`, inline: true },
                // { name: 'VR 3', value: `dagdeel 1: ${await getID('9', 'd1', db)}\ndagdeel 2: ${await getID('9', 'd2', db)}\ndagdeel 3: ${await getID('9', 'd3', db)}`, inline: true },
                { name: 'Headphones 1', value: `dagdeel 1: ${await getID('10', 'd1', db)}\ndagdeel 2: ${await getID('10', 'd2', db)}`, inline: true },
                { name: 'Headphones 2', value: `dagdeel 1: ${await getID('11', 'd1', db)}\ndagdeel 2: ${await getID('11', 'd2', db)}`, inline: true },
                { name: 'Headphones 3', value: `dagdeel 1: ${await getID('12', 'd1', db)}\ndagdeel 2: ${await getID('12', 'd2', db)}`, inline: true },
            )
            .setColor('#33b6e9')
        interaction.reply({ embeds: [embed] })
    }
}
