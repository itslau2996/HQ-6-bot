const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/main.db");
const fucs = require('./../../functions')
const dayjs = require("dayjs");
var weekOfYear = require("dayjs/plugin/weekOfYear");
dayjs().format();
dayjs.extend(weekOfYear);

module.exports = {
	data: new SlashCommandBuilder()
		.setName("reservering")
		.setDescription("Reserveer gear")
		.addSubcommandGroup((subcommandgroup) =>
			subcommandgroup
				.setName("nieuw")
				.setDescription("een nieuwe reservering maken")
				.addSubcommand((subcommand) =>
					subcommand
						.setName("windows")
						.setDescription("Reserveer een Windows-PC")
						.addStringOption((option) =>
							option
								.setName("gear")
								.setDescription("Windows 1, 2 of 3")
								.setRequired(true)
								.addChoices(
									{ name: "1", value: "1" },
									{ name: "2", value: "2" },
									{ name: "3", value: "3" }
								)
						)
						.addStringOption((option) =>
							option
								.setName("dagdeel")
								.setDescription(
									"Welk dagdeel je kan, hoelaat de dagdelen zijn kan je zien in het event"
								)
								.setRequired(true)
								.addChoices(
									{ name: "dagdeel 1", value: "d1" },
									{ name: "dagdeel 2", value: "d2" }
								)
						)
						.addStringOption((option) =>
							option
								.setName("project")
								.setDescription("Waar ga je aan werken")
								.setRequired(true)
						)
				)
				.addSubcommand((subcommand) =>
					subcommand
						.setName("apple")
						.setDescription("Reserveer een Apple-PC")
						.addStringOption((option) =>
							option
								.setName("gear")
								.setDescription("Apple 1, 2 of 3")
								.setRequired(true)
								.addChoices(
									{ name: "1", value: "4" },
									{ name: "2", value: "5" },
									{ name: "3", value: "6" }
								)
						)
						.addStringOption((option) =>
							option
								.setName("dagdeel")
								.setDescription(
									"Welk dagdeel je kan, hoelaat de dagdelen zijn kan je zien in het event"
								)
								.setRequired(true)
								.addChoices(
									{ name: "1", value: "d1" },
									{ name: "2", value: "d2" }
								)
						)
						.addStringOption((option) =>
							option
								.setName("project")
								.setDescription("Waar ga je aan werken")
								.setRequired(true)
						)
				)
				.addSubcommand((subcommand) =>
					subcommand
						.setName("vr")
						.setDescription("Reserveer een VR-headset")
						.addStringOption((option) =>
							option
								.setName("gear")
								.setDescription("VR oculus Quest 1, 2 of 3")
								.setRequired(true)
								.addChoices(
									{ name: "1", value: "7" },
									{ name: "2", value: "8" },
									{ name: "3", value: "9" }
								)
						)
						.addStringOption((option) =>
							option
								.setName("dagdeel")
								.setDescription(
									"Welk dagdeel je kan, hoelaat de dagdelen zijn kan je zien in het event"
								)
								.setRequired(true)
								.addChoices(
									{ name: "1", value: "d1" },
									{ name: "2", value: "d2" },
									{ name: "3", value: "d3" }
								)
						)
						.addStringOption((option) =>
							option
								.setName("project")
								.setDescription("Waar ga je aan werken")
								.setRequired(true)
						)
				)
				.addSubcommand((subcommand) =>
					subcommand
						.setName("audio")
						.setDescription("Reserveer een audio-onderdeel")
						.addStringOption((option) =>
							option
								.setName("gear")
								.setDescription("Wat je wilt reserveren")
								.setRequired(true)
								.addChoices(
									{ name: "headphone", value: "10" },
									{ name: "headphone", value: "11" },
									{ name: "headphone", value: "12" }
								)
						)
						.addStringOption((option) =>
							option
								.setName("dagdeel")
								.setDescription(
									"Welk dagdeel je kan, hoelaat de dagdelen zijn kan je zien in het event"
								)
								.setRequired(true)
								.addChoices(
									{ name: "1", value: "d1" },
									{ name: "2", value: "d2" }
								)
						)
						.addStringOption((option) =>
							option
								.setName("project")
								.setDescription("Waar ga je aan werken")
								.setRequired(true)
						)
				)
		)
		.addSubcommand((subcommand) =>
			subcommand.setName("verwijder").setDescription("Cancel al je reservering")
		),
	async execute(interaction) {
		let group = interaction.options.getSubcommandGroup();
		let subcommand = interaction.options.getSubcommand();
		let choice = interaction.options.getString("gear");
		let daypart = interaction.options.getString("dagdeel");
		let project = interaction.options.getString("project");
		let accid = await fucs.getAccId(interaction.user.id);
		let count = await fucs.getCount(accid)
		let status = await fucs.available(choice, daypart, db)

		await interaction.deferReply();

		async function embed(choice, dp, resid) {
			return new Promise(async (resolve, reject) => {
				let gear = await fucs.gearcheck(choice);
				let daypart = dp.match(/\d+/);
				const embed = new EmbedBuilder()
					.setTitle(`Reservering #${resid}`)
					.setDescription("Reservering voor: **Open voor Jongeren** event")
					.addFields(
						{ name: "**Details:**", value: `Gear: ${gear}\nDagdeel: ${daypart}`, inline: false }
					)
					.setColor("Green");

				resolve(embed);
			});
		}
		if (group === "nieuw") {
			async function reserveer(id, choice, project, dp) {
				db.run(`INSERT INTO reservaties(accId, gear, daypart, project) VALUES(?, ?, ?, ?)`, [id, choice, dp, project], async function (err) {
					if (err) {
						await interaction.editReply({ content: "Er was een error, </reservaties:1106196609609502773> voor de huidige beschikbare apperaten.", ephemeral: true });
					} else {
						db.run('UPDATE accounts SET resScore = resScore + 1 WHERE AccId = ?', [id])
						await interaction.editReply({ embeds: [await embed(choice, dp, this.lastID)] })
					}
				})
			}
			if (count < 2 && status === 'open') {
				await reserveer(accid, choice, project, daypart);
			} else if (count >= 2) {
				interaction.editReply({ content: 'Je mag maar 2x per week reserveren'})
			} else if (status === 'closed') {
				interaction.editReply({ content: 'De gekozen gear is niet beschikbaar op het gekozen dagdeel'})
			}
		} else if (subcommand === "verwijder") {
			let user = interaction.user;
			let sql = `DELETE FROM reservaties WHERE accId = ?`;
			db.run(sql, [accid], async function (err) {
				if (err) {
					await interaction.editReply({ content: `Er is wat fout gegaan`, ephemeral: true });
					return console.log(err.message);
				}
				const embed = new EmbedBuilder()
					.setAuthor({
						name: `${user.tag}`,
						iconURL: user.displayAvatarURL({ dynamic: true }),
					})
					.setTitle("Reservering verwijderd!")
					.setColor("Red")
					.setDescription("Je Reservering is nu verwijderd.");
				await interaction.editReply({ embeds: [embed], ephemeral: true });
			});
		}

	},
};
