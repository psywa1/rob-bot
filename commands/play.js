const { QueryType } = require("discord-player");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "play",
  description: "Play a song!",
  voiceChannel: true,
  options: [
    {
      name: "song",
      description: "Song name",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  async execute(interaction, player) {
    console.log(player + "awdawd");
    try {
      await interaction.deferReply();
    } catch (e) {
      console.log(e);
      interaction.followUp({
        content: "Error executing that command: " + e.message,
      });
    }
  },
};
