const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./db/main.db");
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
    .addSubcommandGroup((subcommandgroup) =>
      subcommandgroup
        .setName("aanpassen")
        .setDescription("Pas je huidige reservering aan")
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
                .setRequired(true))

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
              option.setName("project")
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
      subcommand.setName("verwijder").setDescription("Cancel je reservering")
    ),
  async execute(interaction) {
    let group = interaction.options.getSubcommandGroup();
    let subcommand = interaction.options.getSubcommand();
    let choice = interaction.options.getString("gear");
    let daypart = interaction.options.getString("dagdeel");
    let project = interaction.options.getString("project");
    let id = interaction.user.id;
    let week = dayjs(new Date()).week();

    async function gearcheck(gear) {
      return new Promise((resolve, reject) => {
        let sql = `SELECT name FROM omnummer WHERE gear = ?`;
        db.get(sql, [gear], (err, row) => {
          resolve(row.name);
        });
      });
    }
    async function embed(choice, dp) {
      return new Promise(async (resolve, reject) => {
        let gear = await gearcheck(choice);
        let daypart = dp.match(/\d+/);
        const embed = new EmbedBuilder()
          .setTitle("Reservatie aangepast")
          .setDescription(
            "Je hebt je reservering aangepast voor het opkomende **Open voor Jongeren** event"
          )
          .addFields({
            name: "**Details:**",
            value: `Gear: ${gear}\nDagdeel: ${daypart}`,
          })
          .setColor("Green");

        resolve(embed);
      });
    }

    if (group === "nieuw") {
      let choice = interaction.options.getString("gear");
      let daypart = interaction.options.getString("dagdeel");
      let project = interaction.options.getString("project");
      let id = interaction.user.id;
      let week = dayjs(new Date()).week();

      async function reserveer(id, choice, week, project, dp, db) {
        db.run(
          "INSERT INTO reservaties(USRID, GEAR, WEEK, project, daypart) values(?, ?, ?, ?, ?)",
          [id, choice, week, project, dp],
          async function (err) {
            if (err) {
              console.log(err.message);
              interaction.reply({
                content:
                  "Er was een error, </reservaties:1106196609609502773> voor de huidige beschikbare apperaten.",
                ephemeral: true,
              });
            } else {
              db.run(`UPDATE users SET count = count + 1 where USRID = ${id}`);
              interaction.reply({ embeds: [await embed(choice, dp)] });
            }
          }
        );
      }
      await reserveer(id, choice, week, project, daypart, db);
    } else if (group === "aanpassen") {
      async function edit(id, choice, week, project, dp, db) {
        db.run(`DELETE FROM reservaties WHERE USRID = ?`, [id], function (err) {
          if (err) {
            interaction.reply({
              content: `Er is wat fout gegaan`,
              ephemeral: true,
            });
            return console.log(err.message);
          } else {
            console.log(`Row deleted with id: ${id}`);
            db.run(
              "INSERT INTO reservaties(USRID, GEAR, WEEK, project, daypart) values(?, ?, ?, ?, ?)",
              [id, choice, week, project, dp],
              async function (err) {
                if (err) {
                  console.log(err);
                  interaction.reply({
                    content: "Je hebt al gereserveerd",
                    ephemeral: true,
                  });
                } else {
                  interaction.reply({ embeds: [await embed(choice, dp)] });
                }
              }
            );
          }
        });
      }
      await edit(id, choice, week, project, daypart, db);
    } else if (subcommand === "verwijder") {
      let user = interaction.user;
      let sql = `DELETE FROM reservaties WHERE USRID = ?`;
      db.run(sql, [user.id], function (err) {
        if (err) {
          interaction.reply({
            content: `Er is wat fout gegaan`,
            ephemeral: true,
          });
          return console.log(err.message);
        }
        console.log(`Row deleted with id: ${id}`);
        const embed = new EmbedBuilder()
          .setAuthor({
            name: `${user.tag}`,
            iconURL: user.displayAvatarURL({ dynamic: true }),
          })
          .setTitle("Reservering verwijderd!")
          .setColor("Red")
          .setDescription("Je Reservering is nu verwijderd.");
        interaction.reply({ embeds: [embed], ephemeral: true });
      });
    }
  },
};
