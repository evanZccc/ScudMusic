const { EmbedBuilder } = require('discord.js');
const config = require("../config.js");

async function pause(client, interaction) {
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

        player.pause(true);

        const embed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setDescription('**⏸️ La riproduzione è stata messa in pausa!**');

        await interaction.reply({ embeds: [embed] });

    } catch (error) {
        console.error('Errore durante la riproduzione del comando di pausa:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('Error')
            .setDescription('❌ Errore durante il processo della tua richiesta.');

        await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    }
}

module.exports = {
    name: "pause",
    description: "Metti in pausa la seguente canzone",
    permissions: "0x0000000000000800",
    options: [],
    run: pause
};
