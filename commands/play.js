const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const config = require("../config.js");

const queueNames = [];
const requesters = new Map();

async function play(client, interaction) {
    try {
        const query = interaction.options.getString('name');

        if (!interaction.member.voice.channelId) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('Canale vocale richiesto')
                .setDescription('❌ È necessario essere in un canale vocale per utilizzare questo comando.');

            await interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        // Check if Lavalink nodes are available
        if (!client.riffy.nodes || client.riffy.nodes.size === 0) {
            const embed = new EmbedBuilder()
                .setColor('#ff0000')
                .setTitle('nessun nodo Lavalin')
                .setDescription('❌ Nessun nodo Lavalink disponibile per elaborare la richiesta.');

            await interaction.reply({ embeds: [embed], ephemeral: true });
            return;
        }

        // Create the player connection
        const player = client.riffy.createConnection({
            guildId: interaction.guildId,
            voiceChannel: interaction.member.voice.channelId,
            textChannel: interaction.channelId,
            deaf: true
        });

        await interaction.deferReply();

        const resolve = await client.riffy.resolve({ query: query, requester: interaction.user.username });
        if (!resolve || typeof resolve !== 'object') {
            throw new TypeError('La risposta di risoluzione non è un oggetto');
        }

        const { loadType, tracks, playlistInfo } = resolve;

        if (!Array.isArray(tracks)) {
            throw new TypeError('Si prevede che le tracce siano un array');
        }

        if (loadType === 'playlist') {
            for (const track of tracks) {
                track.info.requester = interaction.user.username;
                player.queue.add(track);
                queueNames.push(`[${track.info.title} - ${track.info.author}](${track.info.uri})`);
                requesters.set(track.info.uri, interaction.user.username);
            }

            if (!player.playing && !player.paused) player.play();

        } else if (loadType === 'search' || loadType === 'track') {
            const track = tracks.shift();
            track.info.requester = interaction.user.username;

            player.queue.add(track);
            queueNames.push(`[${track.info.title} - ${track.info.author}](${track.info.uri})`);
            requesters.set(track.info.uri, interaction.user.username);

            if (!player.playing && !player.paused) player.play();
        } else {
            const errorEmbed = new EmbedBuilder()
                .setColor(config.embedColor)
                .setTitle('Error')
                .setDescription('❌ Nessun risultato trovato.');

            await interaction.editReply({ embeds: [errorEmbed] });
            return;
        }

        const randomEmbed = new EmbedBuilder()
            .setColor(config.embedColor)
            .setAuthor({
                name: 'Richiedi aggiornamento',
                iconURL: config.CheckmarkIcon,
                url: config.SupportServer
            })
            .setDescription('**➡️ La tua richiesta è stata elaborata con successo.**\n**➡️ Utilizzare i pulsanti per controllare la riproduzione**')
            .setFooter({ text: '🎶 Goditi la tua musica!' });

        await interaction.followUp({ embeds: [randomEmbed] });

    } catch (error) {
        console.error('Errore durante la riproduzione del comando di riproduzione:', error);
        const errorEmbed = new EmbedBuilder()
            .setColor('#ff0000')
            .setTitle('Error')
            .setDescription('❌ Errore durante il processo della tua richiesta..');

        if (interaction.deferred || interaction.replied) {
            await interaction.editReply({ embeds: [errorEmbed] });
        } else {
            await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }
    }
}

module.exports = {
    name: "play",
    description: "Riproduci una canzone da un nome o un link",
    permissions: "0x0000000000000800",
    options: [{
        name: 'name',
        description: 'Inserisci il nome/link del brano o la playlist',
        type: ApplicationCommandOptionType.String,
        required: true
    }],
    run: play,
    queueNames: queueNames,
    requesters: requesters
};