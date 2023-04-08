const { QueryType } = require("discord-player");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "play",
  description: "Play a song! - MusicPlayer",
  voiceChannel: true,
  options: [
    {
      name: "song",
      description: "Song name",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],

  async execute(player, interaction) {
    console.log(player)
    await interaction.reply("Playing")
  },
};
