const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')
const fucs = require('./../../functions')
const { logChannel } = require('./../../config.json')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('resban')
        .setDescription('resban een user')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option => option.setName('target').setDescription('De persoon die je wil bannen voor reserveren voor 1 week').setRequired(true))
        .addStringOption(option => option.setName('reden').setDescription('de reden waarom deze user gebanned moet worden').setRequired(true)),
    async execute(interaction) {
        //discord user vars
        const issuer = interaction.user;
        const target = interaction.options.getUser('target');
        const reason = interaction.options.getString('reden');
        const client = interaction.client
        //discord channel vars
        const logchannel = client.channels.cache.get(logChannel);

        //database vars
        const issuerAccId = await fucs.getAccId(issuer.id);
        const targetAccId = await fucs.getAccId(target.id);
        //Embeds
        const logembed = new EmbedBuilder()
            .setTitle('Waarschuwing')
            .setColor('Red')
            .setAuthor({ name: `${target.tag}`, iconURL: target.displayAvatarURL({ dynamic: true }) })
            .setDescription(`${issuer.tag} heeft ${target.tag} gebanned van reserveringen vanwege: \n ${reason}`)



        //deleting all the users reservations
        db.get(`SELECT * FROM reservaties WHERE accId = ?`, [targetAccId], async (err, row) => {
            if (typeof row === 'undefined') {
                //Catch undefined rows, respond quietly to interaction user that person didnt had a reservation.
                interaction.reply({ ephemeral: true, content: 'user heeft nog niet gereserveerd.' })
            } else {
                //User has atleast 1 reservation, so it deletes it
                db.run(`DELETE FROM reservaties WHERE accId = ?`, [targetAccId], async function (err) {
                    if (err) {
                        interaction.reply({ content: `Er is wat fout gegaan`, ephemeral: true });
                        return console.log(err.message);
                    }
                })
            }
        })
        //User has no reservations, add the banned tag
        db.run(`INSERT INTO reservaties(accId, gear) VALUES(?, ?)`, [targetAccId, 13], async function (err) {
            //catch error
            if (err) { console.log(err.message); }
            //ban log
            db.run(`INSERT INTO warns (accId, reason, MOD) values (?, ?, ?)`, [targetAccId, `resban: ${reason}`, issuer.id], function (err) {
                if (err) {
                    interaction.reply({ content: err.message, ephemeral: true })
                    console.log(err.message)
                } else {
                    //no error > notify issuer that user got banned
                    interaction.reply({ ephemeral: true, content: `User: ${target.tag}, is gebanned deze week van reserveren.\nReden: ${reason}` });
                    //Notify user about the ban
                    client.users.send(target.id, `Je bent deze week gebanned deze week voor reserveren.\nReden: ${reason}` );
                    //Put the ban in logs
                    logchannel.send({ embeds: [logembed] })
                    //Ban registered in userprofile
                    db.run(`UPDATE users SET resbans = resbans + 1 where accId = ${targetAccId}`)
                }
            })


        })



    }
}