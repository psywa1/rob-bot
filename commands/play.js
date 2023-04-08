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

  async execute(interaction) {
    console.log(interaction + "awdawd");
  },
};
