const { EmbedBuilder } = require('discord.js');
const config = require("../config.js");

module.exports = {
  name: "help",
  description: "Ottieni informazioni del bot",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {
    try {
      const botName = client.user.username; 

      const helpDescription = `
\`\`\`css
Benvenuto in ${botName}!

Il tuo compagno musicale definitivo su Discord. Ecco i comandi disponibili:

[ /play    ] - Riproduci la canzone desiderata.
[ /pause   ] - Metti in pausa la corrente riproduzione audio.
[ /resume  ] - Riprendi la corrente riproduzione audio.
[ /lyrics  ] - Mostra lyrics delle canzoni.
[ /skip    ] - Skippa la corrente riproduzione audio.
[ /stop    ] - Ferma la riproduzione del bot.
[ /np      ] - Mostra il minutaggio corrente della riproduzione audio.
[ /volume  ] - Modifica il volume.
[ /ping    ] - Controlla la latenza del bot.
[ /support ] - Mostra le informazioni di supporto.
[ /help    ] - Mostra questo esatto menu.
\`\`\`
      `;

      const embed = new EmbedBuilder()
        .setColor(config.embedColor)
        .setTitle(`${botName} Help`)
        .setThumbnail(client.user.displayAvatarURL()) 
        .setDescription(helpDescription)
        .setFooter({ text: `Marco Maserati v3.2`, iconURL: client.user.displayAvatarURL() }) 
      

      return interaction.reply({ embeds: [embed] });
    } catch (e) {
      console.error(e);
    }
  },
};
