const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')
const fucs = require('./../../functions');
const { cat } = require('shelljs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('account')
        .setDescription('Beheer je account!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('registratie')
                .setDescription('Met dit command kan je een account aanmaken, gebruik dit voor ')
                .addStringOption(option => option.setName('naam').setDescription('De naam waarmee je in HQ-6 wil aangesproken worden').setRequired(true))
                .addNumberOption(option => option.setName('leeftijd').setDescription('Voeg hier je leeftijd toe').setRequired(true))
                )
        .addSubcommand(subcommand =>
            subcommand
                .setName('beheren')
                .setDescription('Beheer je account hier')
                .addStringOption(option => option.setName('naam').setDescription('Pas de naam aan waarmee je wil aangesproken worden.').setRequired(true))
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
                if(err.errno = 19){interaction.reply({ content: 'Je hebt al een account, als je dit niet hebt, run `/account verwijderen` eerst', ephemeral: true})} else{
                    const embed = new EmbedBuilder()
                        .setTitle('Registratie')
                        .setDescription('Je hebt nu een account aangemaakt')
                        .setAuthor({ name: `${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true }) })
                        .setColor('Gold')
                        .addFields(
                            { name: 'Details', value: `Naam: ${name}\nAccount ID: ${accid}\nLeeftijd: ${age}`}
                        )
                    try{
                        member.setNickname(name, 'Aangepast, Gedaan door registratie.')
                        interaction.reply({ embeds: [embed], ephemeral: true})
                    } catch(err) {
                        console.error(err)
                        interaction.reply({ ephemeral: true, content: "Er is iets fout gegaan, DM <@642288908381585408>"})
                    }

                }
            })
        } else if (sub === 'beheren') {
             db.run('UPDATE accounts SET username = ?, age = ? WHERE accId = ?', [name, age, accid], function (err) {
                if(err){console.log(err.message)} else{
                    interaction.reply({content: "Je profiel is aangepast", ephemeral: true})
                    member.setNickname(name, 'Aangepast, Gedaan door registratie.')
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