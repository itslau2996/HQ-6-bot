const { Events } = require('discord.js');
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/main.db");
const {welcomeChannel} = require('./../config.json')

module.exports = {
	name: Events.GuildMemberAdd,
	async execute(member, client) {
		db.run(`INSERT INTO users(discordId) VALUES(?)`, [member.id])
		const channel = client.channels.cache.get(welcomeChannel);
		channel.send(`Jo <@${member.id}>, Welkom bij **HEADQUARTER-6**!`)
	},
};
