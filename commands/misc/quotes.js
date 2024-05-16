const { SlashCommandBuilder, EmbedBuilder, Embed, PermissionFlagsBits } = require('discord.js');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')
const { logChannel } = require('./../../config.json')
const fucs = require('./../../functions')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quotes')
        .setDescription('soontm')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addUserOption(option => option.setName('quote').setDescription('Welke quote wil je toeveogen')),
    async execute(interaction) {
        const target = interaction.options.getUser('target')
        const client = interaction.client
        const issuer = interaction.user
        const reason = interaction.options.getString('reden')
        const channel = client.channels.cache.get(logChannel);
        const accid = await fucs.getAccId(target.id)
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