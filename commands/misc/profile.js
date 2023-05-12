const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')
const moment = require('moment');

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
		async function GetInfo(id, db) {
			return new Promise((resolve, reject) => {
				db.get(`SELECT count count, USRNAME name FROM users WHERE USRID = ?`, [id], (err, row) => {
					if (typeof row === 'undefined') {
						resolve('Deze user is niet geregistreerd')
					} else {
						resolve(`Aantal reservaties: ${row.count}`)
					}
				})
			})
		}
		if (choice === 'eigen') {
			var user = interaction.user
			var member = interaction.member
		} else {
			var user = interaction.options.getUser('target')
			var member = interaction.options.getMember('target')
		}
		var roles = member.roles.cache.map(r => `${r}`).join(' | ')
		var count = await GetInfo(user.id, db)
		const embed = new EmbedBuilder()
			.setTitle(user.username)
			.setColor('DarkNavy')
			.setAuthor({ name: `${user.tag}`, iconURL: user.displayAvatarURL({ dynamic: true }) })
			.setDescription(`<@${user.id}>'s id is ${user.id}, dit account bestaat al sinds ${moment(user.createdAt).format('DD/M/YYYY')}. `)
			.addFields(
				{ name: 'Stats', value: `${count}\nroles: ${roles}` }
			)
		interaction.reply({ embeds: [embed], ephemeral: true })
	}
}