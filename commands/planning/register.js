const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, Embed } = require('discord.js');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('account')
        .setDescription('Beheer je account!')
        .addSubcommand(subcommand =>
            subcommand
                .setName('registratie')
                .setDescription('Account registreren.')
                .addStringOption(option => option.setName('naam').setDescription('Onder welke naam je wilt gaan.')))
        .addSubcommand(subcommand =>
            subcommand
                .setName('beheren')
                .setDescription('Beheer je account hier')
                .addStringOption(option => option.setName('naam').setDescription('Onder welke naam je hierna wilt gaan')))
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
                        { name: 'nee', value: 'false'}
                        )   
                    )),
    async execute(interaction) {
        choice = interaction.options.getSubcommand()
        let user = interaction.user
        let id = user.id
        let name = interaction.options.getString('naam')
        if (choice === 'registratie') {         
            db.run(`INSERT INTO users(USRID, USRNAME, count) VALUES(?, ?, 0)`, [id, name], function (err) {
                if (err) {
                    return console.log(err.message)
                }
                console.log(`Row inserted with rowid ${this.lastID}`)
                const embed = new EmbedBuilder()
                    .setAuthor({ name: `${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true})})
                    .setTitle('Registratie succesvol!')
                    .setColor('Green')
                    .setDescription(`Je hebt nu een 'account', dit betekent dat de bot nu bijhoud hoevaak je een reservatie plaatst voor gear.\nJe score kan je zien door **/profiel** te runnen`)
                interaction.reply({ embeds: [embed]})

            })
        } else if (choice === 'beheren') {
            db.run(`UPDATE users SET USRNAME = ? WHERE USRID = ?`, [name, id], function (err) {
                if (err) {
                    interaction.reply(`There was an ERROR \n ${err.message}`)
                    return console.log(err.message)
                }
                console.log(`Row edited with rowid ${this.lastID}`)
                const embed = new EmbedBuilder()
                    .setAuthor({ name: `${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true})})
                    .setTitle('Aanpassingen gemaakt!')
                    .setColor('Orange')
                    .setDescription(`Je naam in het systeem is nu: **${name}**`)
                interaction.reply({ embeds: [embed]})
            })
        } else if (choice === 'verwijderen') {
            let asured = interaction.options.getString('duidelijk')
            let id = interaction.user.id
            if (asured === 'true') {
                db.run(`DELETE FROM users WHERE USRID = ?`, [id], function (err){
                    if (err) {
                        interaction.reply(`There was an ERROR \n${err.message}`)
                        return console.log(err.message)
                    }
                    console.log(`Row deleted with id: ${id}`)
                    const embed = new EmbedBuilder()
                        .setAuthor({ name: `${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true})})
                        .setTitle('Account verwijderd!')
                        .setColor('Red')
                        .setDescription('Je account is nu verwijderd.')
                    interaction.reply({embeds:[embed]})
                })
            } else {
                interaction.reply({ephemeral: true, content: `weet je het zeker?\nRun het command opnieuw, en antwoord dan **'ja'**`})
            }
        }
    }
}