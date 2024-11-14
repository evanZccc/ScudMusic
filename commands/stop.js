const { EmbedBuilder } = require('discord.js');
const config = require("../config.js");

async function stop(client, interaction) {
    try {
        const player = client.riffy.players.get(interaction.guildId);

        if (!player) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Error')
                .setDescription('❌ Non è stata trovata nessuna riproduzione audio attiva.');

            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
            return;
        }

        player.stop();
        player.destroy();

        const embed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setDescription('**⏹️ Playback has been stopped and player destroyed!**');

        await interaction.reply({ embeds: [embed] });

    } catch (error) {
        console.error('Error processing stop command:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('Error')
            .setDescription('❌ Errore durante il processo della tua richiesta..');

        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}

module.exports = {
    name: "stop",
    description: "Ferma la riproduzione del bot",
    permissions: "0x0000000000000800",
    options: [],
    run: stop
};
