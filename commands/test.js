const wait = require('node:timers/promises').setTimeout;

module.exports = {
  name: "test",
  description: "Test Command",
  type: 1,
  async execute(interaction) {
    await interaction.deferReply()
    //await interaction.reply({ content: "Test Command", ephemeral: false });
    await wait(2000)
    await interaction.editReply("OOOOO")
  },
};
