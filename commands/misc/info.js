const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')
const moment = require('moment');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Dit command geeft een bericht met alle informatie over hoe je de bot gebruikt'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('GETTING STARTED')
            .setDescription('Hallo, Laurens hier, dus ik heb een bot gemaakt voor reserveren, wat betekent dit?\nGemak, waarom? Ga je nu achterkomen')
            .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .addFields(
                { name: '**Stap 1/3**', value: 'We beginnen met wat leuks, account aanmaken. Dit is voor niks anders dan om ons je naam te vertellen, op ditzelfde account worden ook je aantal reserveringen bijgehouden.\nCommand: `/account registratie`', inline: false},
                { name: '**Stap 2/3**', value: 'Voor je echt gaat reserveren, check de beschikbaarheid, om spam te voorkomen kan je ook de laatste in de channel gebruiken\nCommand: </reservaties:1110468555507519547>', inline: false},
                { name: '**Stap 3/3**', value: 'Een reservatie maken, dit zorgt ervoor dat jij in ieder geval een plekje hebt in de volgende Open voor Jongeren event\nCommand: `/reservering nieuw <apple/vr/windows/audio>`\nVoer een van de opties in die tussen de **<>** staat`', inline: false},
                { name: '**Extra informatie**', value: "Wil je je reservering aanpassen? Gebruik dan inplaats van 'nieuw' > 'aanpassen'.\nVerwijderen van je reserveringen kan ook, nieuw wordt in dit geval verwijderen.", inline: false},
                { name: '**Nog meer vragen?**', value: "Als je na deze guide er nog steeds niet uitkomt, vraag het aan andere serverleden, weten die het ook niet? Stuur mij dan een dm!", inline: false}
            )

        interaction.reply({ embeds: [embed] })

    }
}