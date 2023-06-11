const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')
const moment = require('moment');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('muzieklink')
        .setDescription('Met dit command krijg je de link voor /profielopties favoriete muziek'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Link?')
            .setDescription('Om je favoriete nummer met iedereen te delen kan je deze [site](https://odesli.co/) gebruiken')
            .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
            .addFields(
                { name: '**Stap 1/3**', value: 'Ga naar jouw muziekstreamingdienst (zoals bijv. Spotify), kopieer hier de link van jouw favoriete nummer.\nWeet jij niet hoe dit moet, dit kan ook via Youtube, dan kopieer je ook die link', inline: false},
                { name: '**Stap 2/3**', value: 'Ga naar deze [site](https://odesli.co/), en plak hier de link van jouw favoriete nummer, en dan op enter klikken\nDan staat er **Copy URL**, klik hierop', inline: true},
                { name: '**Stap 3/3**', value: 'Met die link kan je het command uitvoeren, je plakt de link dan in het "link" veld', inline:true }
                
                )

        interaction.reply({ embeds: [embed] })

    }
}