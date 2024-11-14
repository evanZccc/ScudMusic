const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "support",
  description: "Get support server link",
  permissions: "0x0000000000000800",
  options: [],
  run: async (client, interaction) => {
    try {

      const supportServerLink = "https://discord.gg/43VDd3UTrM";
      const githubLink = "https://github.com";
      const replitLink = "https://replit.com";
      const youtubeLink = "https://www.youtube.com/@3v4ns_";
        const embed = new EmbedBuilder()
            .setColor('#b300ff')
            .setAuthor({
              name: 'Support Server',
              iconURL: 'https://cdn.discordapp.com/attachments/1230824451990622299/1230824519220985896/6280-2.gif?ex=6638ae28&is=66375ca8&hm=13e4a1b91a95b2934a39de1876e66c11711c7b30ac1a91c2a158f2f2ed1c2fc6&', 
              url: 'https://discord.gg/43VDd3UTrM'
          })
            .setDescription(`➡️ **Unisciti al nostro server Discord per supporto e aggiornamenti:**\n- Discord - ${supportServerLink}\n\n➡️ **Seguici su:**\n- GitHub - ${githubLink}\n- Replit - ${replitLink}\n- YouTube - ${youtubeLink}`)
            .setImage('https://tenor.com/view/happy-happy-dog-dog-happiest-dog-super-happy-gif-17885812')
            .setTimestamp();

      return interaction.reply({ embeds: [embed] });
    } catch (e) {
    console.error(e); 
  }
  },
};