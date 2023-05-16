const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('kick een user')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option => option.setName('target').setDescription('De persoon die je wil kicken'))
        .addStringOption(option => option.setName('reden').setDescription('de reden waarom deze user gekicked moet worden')),
    async execute(interaction) {
        const target = interaction.options.getMember('target')
        const client = interaction.client
        const issuer = interaction.user
        const reason = interaction.options.getString('reden')
                const channel = client.channels.cache.get('969595410018607186');

        const embed = new EmbedBuilder()
            .setTitle('Kick')
            .setColor('Red')
            .setAuthor({ name: `${target.user.tag}`, iconURL: target.displayAvatarURL({ dynamic: true }) })
            .setDescription(`Je hebt ${target.user.tag} gekicked vanwege: \n ${reason}`)

        const logembed = new EmbedBuilder()
            .setTitle('Kick')
            .setColor('Red')
            .setAuthor({ name: `${target.user.tag}`, iconURL: target.displayAvatarURL({ dynamic: true }) })
            .setDescription(`${issuer.tag} heeft ${target.user.tag} gekicked vanwege: \n ${reason}`)

        async function warn(issuer, reason, target, embed, channel, logembed) {
            return new Promise((resolve, reject) => {
                db.run(`INSERT INTO warns (USRID, reason, MOD) values (?, ?, ?)`, [target.id, `kick: ${reason}`, issuer.id], function (err) {
                    if (err) {
                        interaction.reply({ content: err.message, ephemeral: true })
                    } else {
                        interaction.reply({ content: `<@${target.id}>`, embeds: [embed], ephemeral: true})
                        target.kick(`Door ${issuer.tag}, met reden ${reason}`)
                        db.run(`UPDATE strafblad SET KICKCOUNT = KICKCOUNT + 1 where USRID = ${target.id}`)
                        channel.send({ embeds: [logembed] })
                        client.users.send(target.id, `Je bent gekicked van de HQ-6 server: **${reason}**`)
                    }
                })

            })
        }
        warn(issuer, reason, target, embed, channel, logembed)

    }
}