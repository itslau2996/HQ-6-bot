const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')
const fucs = require('./../../functions')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('profielopties')
        .addSubcommandGroup(subcommandgroup => subcommandgroup
            .setName('favoriete')
            .setDescription('Voeg je favorieten toe, LET OP: 1 per categorie')
            .addSubcommand(subcommand => subcommand
                .setName('muziek')
                .setDescription('Wat is je favoriete nummer')
                .addStringOption(option => option.setName('titel').setDescription('De titel van het nummer').setRequired(true))
                .addStringOption(option => option.setName('link').setDescription('Link van het nummer, hoe je deze link krijgt zie je met /muzieklink').setRequired(true))
            )
            .addSubcommand(subcommand => subcommand
                .setName('film')
                .setDescription('Wat is je favoriete film?')
                .addStringOption(option => option.setName('titel').setDescription('De titel van de film').setRequired(true))
                .addStringOption(option => option.setName('waar').setDescription('Waar kan je deze film kijken').setRequired(true))
            )
            .addSubcommand(subcommand => subcommand
                .setName('serie')
                .setDescription('Wat is je favoriete serie?')
                .addStringOption(option => option.setName('titel').setDescription('De titel van de serie').setRequired(true))
                .addStringOption(option => option.setName('waar').setDescription('Waar kan je deze serie kijken').setRequired(true))
            )

        )
        .addSubcommand(subcommand => subcommand
            .setName('persoonlijk')
            .setDescription('Hier kan je alle andere persoonlijke info toevoegen.')
            .addStringOption(option => option.setName('geboortedatum').setDescription('Geef hier je geboortedatum in vorm DD-MM-JJJJ, bijvoorbeeld 05-01-2000'))
            .addStringOption(option => option.setName('pronoun').setDescription('Waarmee wil je aangesproken worden?'))
            )
        .setDescription('Beheer je profiel!'),
    async execute(interaction) {
        // TODO embeds
        const accid = await fucs.getAccId(interaction.user.id)
        const subcommandgroup = interaction.options.getSubcommandGroup()
        const subcommand = interaction.options.getSubcommand()
        if (subcommandgroup === 'favoriete') {
            if (subcommand === 'muziek') {
                let title = interaction.options.getString('titel')
                let link = interaction.options.getString('link')
                let linkbutton = new ButtonBuilder()
                    .setLabel('Link')
                    .setURL(link)
                    .setStyle(ButtonStyle.Link)
                let actionrow = new ActionRowBuilder()
                    .addComponents(linkbutton)
                let embed = new EmbedBuilder()
                    .setTitle('Profielupdate')
                    .setDescription('Je favoriete nummer is nu toegevoegd')
                    .addFields(
                        { name: '**Details:**', value: `Nummer: ${title} toegevoegd aan profiel`, inline: false }
                    )
                db.run('UPDATE accounts SET musicName = ?, musicSrc = ? WHERE accId = ?', [title, link, accid], function (err) {
                    if (err) {
                        interaction.reply('Interaction failed')
                        console.log(err.message)
                    }
                    interaction.reply({ embeds: [embed], components: [actionrow] })

                })
            } else if (subcommand === 'film') {
                let title = interaction.options.getString('titel')
                let provider = interaction.options.getString('waar')
                let embed = new EmbedBuilder()
                    .setTitle('Profielupdate')
                    .setDescription('Je favoriete film is toegevoegd')
                    .addFields(
                        { name: '**Details:**', value: `Film: ${title}\nProvider: ${provider}`, inline: false }
                    )
                db.run('UPDATE accounts SET movieName = ?, movieSrc = ? WHERE accId = ?', [title, provider, accid], function (err) {
                    if (err) {
                        interaction.reply('Interaction failed')
                        console.log(err.message)
                    }
                    interaction.reply({ embeds: [embed] })
                })

            } else if (subcommand === 'film') {
                let title = interaction.options.getString('titel')
                let provider = interaction.options.getString('waar')
                let embed = new EmbedBuilder()
                    .setTitle('Profielupdate')
                    .setDescription('Je favoriete film is toegevoegd')
                    .addFields(
                        { name: '**Details:**', value: `Serie: ${title}\nProvider: ${provider}`, inline: false }
                    )
                db.run('UPDATE accounts SET serieName = ?, serieSrc = ? WHERE accId = ?', [title, provider, accid], function (err) {
                    if (err) {
                        interaction.reply('Interaction failed')
                        console.log(err.message)
                    }
                    interaction.reply({ embeds: [embed] })
                })

            }

        } else if (subcommand === 'persoonlijk'){
            const birthday = interaction.options.getString('geboortedatum')
            const pronoun = interaction.options.getString('pronoun')
            if (birthday === null && pronoun === null){
                interaction.reply({ content: 'Om dit command te gebruiken moet je minstens 1 waarde invoeren in een van beide textvelden', ephemeral: true})
            } else {
                db.run('UPDATE accounts SET birthday = ?, pronoun = ? WHERE accId = ?', [birthday, pronoun, accid], function(err) {
                    if (err) {
                        interaction.reply({ content: 'Oops ongevangen error, please report', ephemeral: true})
                    } interaction.reply({ content: 'Aangepast', ephemeral: true})
                })                        
            }

        }


    }
}