const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')
const fucs = require('./../../functions')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('account')
        .setDescription('Beheer je account!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('registratie')
                .setDescription('Met dit command kan je een account aanmaken, gebruik dit voor ')
                .addStringOption(option => option.setName('naam').setDescription('Onder welke naam je wilt gaan.').setRequired(true))
                .addNumberOption(option => option.setName('leeftijd').setDescription('Voeg hier je leeftijd toe').setRequired(true))
                )
        .addSubcommand(subcommand =>
            subcommand
                .setName('beheren')
                .setDescription('Beheer je account hier')
                .addStringOption(option => option.setName('naam').setDescription('Onder welke naam je wilt gaan.').setRequired(true))
                .addNumberOption(option => option.setName('leeftijd').setDescription('Voeg hier je leeftijd toe').setRequired(true))
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('verwijderen')
                .setDescription('Verwijder je account')
                .addStringOption(option =>
                    option.setName('duidelijk')
                        .setDescription('Weet je het zeker')
                        .setRequired(true)
                        .addChoices(
                            { name: 'ja', value: 'true' },
                            { name: 'nee', value: 'false' }
                        )
                )),
    async execute(interaction) {
        const user = interaction.user
        const member = interaction.member
        const accid = await fucs.getAccId(user.id)
        const name = interaction.options.getString('naam')
        const age = interaction.options.getNumber('leeftijd');
        const confirmation = interaction.options.getString('duidelijk')
        const sub = interaction.options.getSubcommand()

        if(sub === 'registratie') {
            db.run('INSERT INTO accounts(accId, username, age) VALUES(?, ?, ?)', [accid, name, age], function (err) {
                if(err){console.log(err)} else{
                    const embed = new EmbedBuilder()
                        .setTitle('Registratie')
                        .setDescription('Je hebt nu een account aangemaakt')
                        .setAuthor({ name: `${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true }) })
                        .setColor('Gold')
                        .addFields(
                            { name: 'Details', value: `Naam: ${name}\nAccount ID: ${accid}\nLeeftijd: ${age}`}
                        )
                    interaction.reply({ embeds: [embed], ephemeral: true})

                }
            })
        } else if (sub === 'beheren') {
            console.log(name, age, accid)
             db.run('UPDATE accounts SET username = ?, age = ? WHERE accId = ?', [name, age, accid], function (err) {
                if(err){console.log(err.message)} else{
                    interaction.reply('Done')
                }
            })
        } else if (sub === 'verwijderen' && confirmation === 'true') {
            db.run('DELETE FROM accounts WHERE accId = ?', [accid], function(err) {
                if (err) {
                    console.log(err.message)
                    interaction.reply({ content: `Gefeliciteerd? Je hebt een fout gevonden (misschien)?\nGelieve dit te reporten in de DM's van <@642288908381585408>`, ephemeral: true})
                } else {
                    interaction.reply({ content: `Je account is nu verwijderd!`, ephemeral: true})
                }
            })
        }

    }
}