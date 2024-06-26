const { SlashCommandBuilder, EmbedBuilder, Embed, PermissionFlagsBits } = require('discord.js');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')
const { logChannel } = require('./../../config.json')
const fucs = require('./../../functions')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('warn een user')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option => option.setName('target').setDescription('De persoon die je wil warnen'))
        .addStringOption(option => option.setName('reden').setDescription('de reden waarom deze user moet gewaarschuwd worden')),
    async execute(interaction) {
        const target = interaction.options.getUser('target')
        const client = interaction.client
        const issuer = interaction.user
        const reason = interaction.options.getString('reden')
        const channel = client.channels.cache.get(logChannel);
        const accid = await fucs.getAccId(target.id)
        

        const responseEmbed = new EmbedBuilder()
            .setTitle('Waarschuwing')
            .setColor('Red')
            .setAuthor({ name: `${target.tag}`, iconURL: target.displayAvatarURL({ dynamic: true }) })
            .setDescription(`Je hebt ${target.tag} gewaarschuwd vanwege: \n ${reason}`)

        const logembed = new EmbedBuilder()
            .setTitle('Waarschuwing')
            .setColor('Red')
            .setAuthor({ name: `${target.tag}`, iconURL: target.displayAvatarURL({ dynamic: true }) })
            .setDescription(`${issuer.tag} heeft ${target.tag} gewaarschuwd vanwege: \n ${reason}`)

        async function warn(issuer, reason, target, embed, channel, logembed) {
            return new Promise((resolve, reject) => {
                db.run(`INSERT INTO warns (accId, reason, MOD) values (?, ?, ?)`, [accid, reason, issuer.id], function (err) {
                    if (err) {
                        interaction.reply({ content: err.message, ephemeral: true })
                    } else {
                        interaction.reply({ content: `<@${target.id}>`, embeds: [responseEmbed], ephemeral: true })
                        db.run(`UPDATE users SET warnCount = warnCount + 1 where accId = ${accid}`)
                        channel.send({ embeds: [logembed] })
                        client.users.send(target.id, `Je bent gewaarschuwd: **${reason}**`)
                    }
                })

            })
        }
        warn(issuer, reason, target, responseEmbed, channel, logembed)

    }
}