const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')
const wait = require('node:timers/promises').setTimeout;
const fucs = require('./../../functions')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('adminres')
        .setDescription('admincmds voor reserveringen')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addSubcommand(subcommand => subcommand
            .setName('display')
            .setDescription('Krijg de reservatie van een user')
            .addUserOption((option) =>
                option
                    .setName("target")
                    .setDescription('De user waarvan je de reservatie wil opvragen.')
                    .setRequired(true)
            )
        )
        .addSubcommand(subcommand => subcommand
            .setName('delete')
            .setDescription('Verwijder een reservering van een andere user')
            .addUserOption((option) => option
                .setName('target')
                .setRequired(true)
                .setDescription('De user waarvan de reservering moet verwijderen.')
            )
            .addStringOption((option) => option
                .setName('reden')
                .setDescription('Met welke reden je deze reservering verwijderd')
                .setRequired(true)    
            )

        ),
    async execute(interaction) {
        const sub = interaction.options.getSubcommand();
        const target = interaction.options.getUser('target')
        const reason = interaction.options.getString('reden')
        const accid = await fucs.getAccId(target.id)

        if (sub === 'display') {
            const sql = `SELECT * FROM reservaties WHERE accId = ?`
            const embed = new EmbedBuilder()
                .setTitle('Reserveringen')
                .setColor('DarkNavy')
                .setAuthor({ name: `${target.tag}`, iconURL: target.displayAvatarURL({ dynamic: true }) })
            db.all(sql, [accid], async (err, rows) => {
                if (typeof rows === 'undefined'){
                    interaction.reply({ content: `<@${target.id}> heeft deze week niet gereserveerd`, ephemeral: true})
                } else {

                    for (let i = 0; i < rows.length; i++) {
                        embed.spliceFields(0, 0, { name: `Device: ${await fucs.gearcheck(rows[i].gear)}`, value: `dagdeel: ${rows[i].daypart}\nProject: ${rows[i].project}\nreservatie id: ${rows[i].ResID}`, inline: false })
                    }
                    await interaction.reply({ embeds: [embed], ephemeral: true })

                     
                    
                    
                    
                }
            })
        } else if (sub === 'delete') {
            db.get(`SELECT * FROM reservaties WHERE accId = ?`, [accid], async (err, row) => {
                if (typeof row === 'undefined') {
                    interaction.reply({ content: 'Nog niet gereserveerd', ephemeral: true })
                } else {
                    let dp = row.daypart
                    dp = dp.match(/\d+/);
                    const embed = new EmbedBuilder()
                        .setTitle('Deleted')
                        .setColor('Red')
                        .addFields(
                            { name: 'Verwijderde reservering', value: `De reservering(en) van **${target.username} zijn verwijderd.`, inline: false }
                        )
                    db.run(`DELETE FROM reservaties WHERE accId = ?`, [accid], async function (err) {
                        if (err) {
                            interaction.reply({ content: `Er is wat fout gegaan`, ephemeral: true });
                            return console.log(err.message);
                        }
                        await interaction.reply({ embeds: [embed] })
                        interaction.client.users.send(target.id, `Je reservatie van deze week is verwijderd\n**Reden:** ${reason}`)
                    })
                }
            })
        }

    }
}