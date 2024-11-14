const { EmbedBuilder } = require('discord.js')
const config = require("../config.js");

module.exports = {
  name: "ping",
  description: "controlla la latenza del bot",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {


    try {

      const start = Date.now();
      interaction.reply("Ping...").then(msg => {
        const end = Date.now();
        const embed = new EmbedBuilder()
          .setColor(config.embedColor)
          .setTitle(`Latenza del bot`)
          .setDescription(`**Pong** : ${end - start}ms`)
        return interaction.editReply({ embeds: [embed] }).catch(e => { });
      }).catch(err => { })

    } catch (e) {
    console.error(e); 
  }
  },
};