const { SlashCommandBuilder, EmbedBuilder, Embed, PermissionFlagsBits } = require('discord.js');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('mute een user')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option => option.setName('target').setDescription('De persoon die je wil muten').setRequired(true))
        .addStringOption(option => option.setName('reden').setDescription('de reden waarom deze user moet gemute worden').setRequired(true))
        .addStringOption(option => option.setName('tijd').setDescription('Hoelang je de user wil muten in minuten').setRequired(true)),
    async execute(interaction) {
        const target = interaction.options.getMember('target')
        const targetu = interaction.options.getUser('target')
        const client = interaction.client
        const issuer = interaction.user
        const reason = interaction.options.getString('reden')
        const channel = client.channels.cache.get('969595410018607186');
        const time = interaction.options.getString('tijd');
        const toMilliseconds = (hrs,min,sec) => (hrs*60*60+min*60+sec)*1000;
        const mutetime = toMilliseconds(0,time,0)
        const embed = new EmbedBuilder()
            .setTitle('Waarschuwing')
            .setColor('Red')
            .setAuthor({ name: `${target.user.tag}`, iconURL: target.displayAvatarURL({ dynamic: true }) })
            .setDescription(`Je hebt ${target.user.tag} gemute vanwege: \n ${reason} voor ${time} minuten`)

        const logembed = new EmbedBuilder()
            .setTitle('Waarschuwing')
            .setColor('Red')
            .setAuthor({ name: `${target.user.tag}`, iconURL: target.displayAvatarURL({ dynamic: true }) })
            .setDescription(`${issuer.tag} heeft ${target.user.tag} gemute vanwege: \n ${reason} voor ${time} minuten`)

        async function warn(issuer, reason, mutetime, mintijd, target, embed, channel, logembed) {
            return new Promise((resolve, reject) => {
                db.run(`INSERT INTO warns (USRID, reason, MOD) values (?, ?, ?)`, [target.id, `mute voor ${mintijd}: ${reason}`, issuer.id], function (err) {
                    if (err) {
                        interaction.reply({ content: err.message, ephemeral: true })
                    } else {
                        target.timeout(mutetime)
                        interaction.reply({ content: `<@${target.id}>`, embeds: [embed], ephemeral: true })
                        db.run(`UPDATE strafblad SET MUTECOUNT = MUTECOUNT + 1 where USRID = ${target.id}`)
                        channel.send({ embeds: [logembed] })
                        client.users.send(target.id, `Je bent gemute: **${reason}** voor ${mintijd} minuten`)
                    }
                })

            })
        }
        warn(issuer, reason, mutetime, time, target, embed, channel, logembed)

    }
}