const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')
const dayjs = require('dayjs')
var weekOfYear = require('dayjs/plugin/weekOfYear')
dayjs().format()
dayjs.extend(weekOfYear)

module.exports = {
    data: new SlashCommandBuilder()
        .setName('reserveer')
        .setDescription('Reserveer gear')
        .addSubcommand(subcommand =>
            subcommand
                .setName('windows')
                .setDescription('Reserveer een Windows-PC')
                .addStringOption(option =>
                    option.setName('gear')
                        .setDescription('Windows 1, 2 of 3')
                        .setRequired(true)
                        .addChoices(
                            { name: '1', value: '1' },
                            { name: '2', value: '2' },
                            { name: '3', value: '3' }
                        ))
                .addStringOption(option =>
                    option.setName('dagdeel')
                        .setDescription('Welk dagdeel je kan, hoelaat de dagdelen zijn kan je zien in het event')
                        .setRequired(true)
                        .addChoices(
                            { name: 'dagdeel 1', value: 'd1' },
                            { name: 'dagdeel 2', value: 'd2' }
                        ))
                .addStringOption(option => option.setName('project').setDescription('Waar ga je aan werken'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('apple')
                .setDescription('Reserveer een Apple-PC')
                .addStringOption(option =>
                    option.setName('gear')
                        .setDescription('Apple 1, 2 of 3')
                        .setRequired(true)
                        .addChoices(
                            { name: '1', value: '4' },
                            { name: '2', value: '5' },
                            { name: '3', value: '6' }
                        ))
                .addStringOption(option =>
                    option.setName('dagdeel')
                        .setDescription('Welk dagdeel je kan, hoelaat de dagdelen zijn kan je zien in het event')
                        .setRequired(true)
                        .addChoices(
                            { name: '1', value: 'd1' },
                            { name: '2', value: 'd2' }
                        ))
                .addStringOption(option => option.setName('project').setDescription('Waar ga je aan werken'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('vr')
                .setDescription('Reserveer een VR-headset')
                .addStringOption(option =>
                    option.setName('gear')
                        .setDescription('VR oculus Quest 1, 2 of 3')
                        .setRequired(true)
                        .addChoices(
                            { name: '1', value: '7' },
                            { name: '2', value: '8' },
                            { name: '3', value: '9' }
                        ))
                .addStringOption(option =>
                    option.setName('dagdeel')
                        .setDescription('Welk dagdeel je kan, hoelaat de dagdelen zijn kan je zien in het event')
                        .setRequired(true)
                        .addChoices(
                            { name: '1', value: 'd1' },
                            { name: '2', value: 'd2' },
                            { name: '3', value: 'd3' }
                        ))
                .addStringOption(option => option.setName('project').setDescription('Waar ga je aan werken'))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('audio')
                .setDescription('Reserveer een audio-onderdeel')
                .addStringOption(option =>
                    option.setName('gear')
                        .setDescription('Wat je wilt reserveren')
                        .setRequired(true)
                        .addChoices(
                            { name: 'Podcast set', value: '18' },
                            { name: 'headphone', value: '10' },
                            { name: 'headphone', value: '11' },
                            { name: 'headphone', value: '12' },
                            { name: 'microfoon', value: '13' },
                            { name: 'microfoon', value: '14' },
                            { name: 'microfoon', value: '15' },
                            { name: 'microfoon', value: '16' },
                            { name: 'Camera', value: '17' }
                        ))
                .addStringOption(option =>
                    option.setName('dagdeel')
                        .setDescription('Welk dagdeel je kan, hoelaat de dagdelen zijn kan je zien in het event')
                        .setRequired(true)
                        .addChoices(
                            { name: '1', value: 'd1' },
                            { name: '2', value: 'd2' }
                        ))
                .addStringOption(option => option.setName('project').setDescription('Waar ga je aan werken'))
        ),
    async execute(interaction) {
        let choice = interaction.options.getString('gear')
        let daypart = interaction.options.getString('dagdeel')
        let project = interaction.options.getString('project')
        console.log(`choice = ${choice}\ndaypart: ${daypart}\nproject: ${project}`)
        let id = interaction.user.id
        let week = dayjs(new Date()).week()
        async function status(choice, daypart, db) {
            return new Promise((resolve, reject) => {
                db.get(`SELECT USRID FROM reservaties WHERE (gear= ${choice} AND daypart= '${daypart}')`, (err, row) => {
                    if (typeof row === 'undefined') {
                         resolve(true)
                    } else {
                        resolve(false)
                    }
                })
            })
        }
        async function gearcheck(gear) {
            return new Promise((resolve, reject) => {
                let sql = `SELECT name FROM omnummer WHERE gear = ?`;
                db.get(sql, [gear], (err, row) => {
                    resolve(row.name)
                })
            })
        }
        async function embed(choice, dp) {
            return new Promise(async (resolve, reject) => {
                let gear = await gearcheck(choice)
                let daypart = dp.match(/\d+/);
                const embed = new EmbedBuilder()
                    .setTitle('Nieuwe reservatie')
                    .setDescription('Je hebt gereserveerd voor het opkomende **Open voor Jongeren** event')
                    .addFields(
                        { name: '**Details:**', value: `Gear: ${gear}\nDagdeel: ${daypart}` }
                    )
                    .setColor('Green')

                resolve(embed)
            })
        }


        async function reserveer(id, choice, week, project, dp, db) {
            if (status(choice, daypart, db)) {
                db.run('INSERT INTO reservaties(USRID, GEAR, WEEK, project, daypart) values(?, ?, ?, ?, ?)', [id, choice, week, project, dp], async function (err) {
                    if (err) {
                        console.log(err)
                        interaction.reply({ content: 'Je hebt al gereserveerd', ephemeral: true })
                    } else {
                    db.run(`UPDATE users SET count = count + 1 where USRID = ${id}`)
                    interaction.reply({ embeds: [await embed(choice, dp)] })
                    }
                })
            } else {
                interaction.reply({ content: 'dit dagdeel heeft al een reservatie voor het gekozen device', ephemeral: true})
            }
        }
        await reserveer(id, choice, week, project, daypart, db)
    }
}