const { EmbedBuilder } = require('discord.js');
const config = require("../config.js");

async function skip(client, interaction) {
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

        const embed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setDescription('**⏭️ Il player riprodurrà la canzone successiva!**');

        await interaction.reply({ embeds: [embed] });

    } catch (error) {
        console.error('Errore durante la riproduzione del comando di salto:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('Error')
            .setDescription('❌ Errore durante il processo della tua richiesta..');

        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}

module.exports = {
    name: "skip",
    description: "Salta la corrente riproduzione audio",
    permissions: "0x0000000000000800",
    options: [],
    run: skip
};
