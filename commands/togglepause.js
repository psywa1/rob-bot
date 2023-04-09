module.exports = {
  name: "togglepause",
  description: "Pause/Unpause the track - MusicPlayer",
  voiceChannel: true,

  async execute(player, interaction) {
    await interaction.deferReply();
    const queue = await player.nodes.get(interaction.guildId);

    if (!queue)
      return interaction.editReply({
        content: `No music currently playing`,
        ephemeral: true,
      });

    if (queue.node.isPaused()) {
      queue.node.resume();
    } else {
      queue.node.pause();
    }

    return interaction.editReply(
      queue.node.isPaused()
        ? `Current music ${queue.currentTrack.title} paused`
        : `Current music ${queue.currentTrack.title} resumed`
    );
  },
};
