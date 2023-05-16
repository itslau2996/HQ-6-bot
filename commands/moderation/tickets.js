const { ButtonBuilder, ButtonStyle, SlashCommandBuilder, ChannelType, PermissionsBitField, EmbedBuilder, ActionRowBuilder } = require('discord.js');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/main.db')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticket')
        .setDescription('ticketopties')
        .addSubcommand(subcommand =>
            subcommand
                .setName('open')
                .setDescription('Open een ticket')
                .addStringOption(option => option.setName('reden').setDescription('Geef een korte reden voor deze ticket (<2 woorden)').setRequired(true))
        ),
    async execute(interaction, client) {
        const choice = interaction.options.getSubcommand()
        const reden = interaction.options.getString('reden')
        if (choice === 'open') {
            const embed = new EmbedBuilder()
                .setAuthor({ name: `${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                .setTitle(`Ticket - ${reden}`)

            const close = new ButtonBuilder()
                .setCustomId('sluit')
                .setLabel('sluit ticket')
                .setStyle(4)

            const row = new ActionRowBuilder()
                .addComponents(close)

            interaction.guild.channels.create({
                name: `ticket-${reden}`,
                type: ChannelType.GuildText,
                parent: '1108142438712885270',
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id: interaction.user.id,
                        allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages],
                    },
                ],
            }).then(channel => channel.send({ embeds: [embed], components: [row]}))
            interaction.reply({content:`Channel created`, ephemeral: true})
            

            

        }
    }
}