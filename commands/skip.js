module.exports = {
  name: "skip",
  description: "Skip the track - MusicPlayer",
  voiceChannel: true,

  async execute(player, interaction) {
    await interaction.deferReply();
    const queue = await player.nodes.get(interaction.guildId);

    if (!queue || !queue.isPlaying())
      return interaction.editReply({
        content: `No music currently playing ${interaction.member}`,
        ephemeral: true,
      });

    const success = queue.node.skip();

    return interaction.editReply({
      content: success
        ? `Current track: ${queue.currentTrack.title} skipped`
        : `Something went wrong ${interaction.member}`,
    });
  },
};
