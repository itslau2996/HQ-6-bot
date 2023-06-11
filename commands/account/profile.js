const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')
const moment = require('moment');
moment.locale('nl')
const fucs = require('./../../functions')
module.exports = {
	data: new SlashCommandBuilder()
		.setName('profiel')
		.setDescription('Zie hier je profiel!')
		.addSubcommand(subcommand =>
			subcommand
				.setName('ander')
				.setDescription('Laat het profiel van een ander zien.')
				.addUserOption(option => option.setName('target').setDescription('The user')))
		.addSubcommand(subcommand =>
			subcommand
				.setName('eigen')
				.setDescription('Laat je eigen profiel zien')),
	async execute(interaction) {
		let choice = interaction.options.getSubcommand()

		if (choice === 'eigen') {
			var user = interaction.user
			var member = interaction.member
		} else {
			var user = interaction.options.getUser('target')
			var member = interaction.options.getMember('target')
		}
		var accid = await fucs.getAccId(user.id)
		var roles = member.roles.cache.map(r => `${r}`).join('')
		db.get('SELECT * FROM accounts WHERE accId = ?', [accid], (err, row) => {
			if (typeof row === 'undefined'){
				interaction.reply({ content: 'User is niet geregistreerd', ephemeral: true})
			} else {
				if (row.movieName === null || row.movieSrc === null) {
					var movie = 'Geen favoriet opgeslagen'
				} else { var movie = `${row.movieName}, kijkbaar op ${row.movieSrc}`}
				if (row.serieName === null || row.serieSrc === null) {
					var serie = 'Geen favoriet opgeslagen'
				} else { var serie = `${row.serieName}, kijkbaar op ${row.serieSrc}`}
				if (row.musicName === null || row.musicSrc === null) {
					var music = 'Geen favoriet opgeslagen'
				} else { var music = `[${row.musicName}](${row.musicSrc})`}
				const embed = new EmbedBuilder()
				.setTitle(user.username)
				.setColor('DarkNavy')
				.setAuthor({ name: `${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true }) })
				.setDescription(`<@${user.id}>'s id is ${user.id}, dit account bestaat al sinds ${moment(user.createdAt).format('DD/M/YYYY')}. `)
				.addFields(
					{ name: 'Persoonlijk', value: `**Pronouns:** ${row.pronoun}\n**Verjaardag:** ${moment(row.birthday, 'DD/MM/YYYY').format('D MMMM')}\n**Leeftijd:** ${row.age}`},
					{ name: 'Stats', value: `Aantal reserveringen: ${row.resScore}\nroles: ${roles}` },
					{ name: 'Favorieten', value: `**Film:** ${movie}\n**Serie:** ${serie}\n**Nummer:** ${music}`}
				)
			interaction.reply({ embeds: [embed], ephemeral: true })
				}
		})
	}
}