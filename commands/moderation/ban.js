const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('ban een user')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option => option.setName('target').setDescription('De persoon die je wil bannen'))
        .addStringOption(option => option.setName('reden').setDescription('de reden waarom deze user gebanned moet worden')),
    async execute(interaction) {
        const target = interaction.options.getMember('target')
        const client = interaction.client
        const issuer = interaction.user
        const reason = interaction.options.getString('reden')
        const channel = client.channels.cache.get('1093121317617811536');

        const embed = new EmbedBuilder()
            .setTitle('Kick')
            .setColor('Red')
            .setAuthor({ name: `${target.user.tag}`, iconURL: target.displayAvatarURL({ dynamic: true }) })
            .setDescription(`Je hebt ${target.user.tag} gebanned vanwege: \n ${reason}`)

        const logembed = new EmbedBuilder()
            .setTitle('Kick')
            .setColor('Red')
            .setAuthor({ name: `${target.user.tag}`, iconURL: target.displayAvatarURL({ dynamic: true }) })
            .setDescription(`${issuer.tag} heeft ${target.user.tag} gebanned vanwege: \n ${reason}`)

        async function warn(issuer, reason, target, embed, channel, logembed) {
            return new Promise((resolve, reject) => {
                db.run(`INSERT INTO warns (USRID, reason, MOD) values (?, ?, ?)`, [target.id, `ban: ${reason}`, issuer.id], function (err) {
                    if (err) {
                        interaction.reply({ content: err.message, ephemeral: true })
                    } else {
                        interaction.reply({ content: `<@${target.id}>`, embeds: [embed], ephemeral: true})
                        target.ban({reason: `Door ${issuer.tag}, met reden ${reason}`})
                        db.run(`UPDATE strafblad SET BANCOUNT = BANCOUNT + 1 where USRID = ${target.id}`)
                        channel.send({ embeds: [logembed] })
                    }
                })

            })
        }
        warn(issuer, reason, target, embed, channel, logembed)

    }
}