module.exports = {
  name: "stop",
  description: "Stop the track - MusicPlayer",
  voiceChannel: true,

  async execute(player, interaction) {
    await interaction.deferReply();
    console.log(player.nodes.get(interaction.guildId));
    const queue = await player.nodes.get(interaction.guildId);

    if (!queue || !queue.isPlaying())
      return interaction.editReply({
        content: `No music currently playing`,
        ephemeral: true,
      });

    queue.delete();

    await interaction.editReply({
      content: `Music stopped!`,
    });
  },
};
