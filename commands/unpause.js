module.exports = {
    name: "unpause",
    description: "Un-pause the track - MusicPlayer",
    voiceChannel: true,
  
    async execute(player, interaction) {
      await interaction.deferReply();
      const queue = await player.nodes.get(interaction.guildId);
  
      if (!queue)
        return interaction.editReply({
          content: `No music currently playing`,
          ephemeral: true,
        });
  
      if (!queue.node.isPaused())
        return interaction.editReply({
          content: "The track is currently playing!",
          ephemeral: true,
        });
  
      const success = queue.node.resume();
  
      return interaction.editReply({
        content: success
          ? `Current music ${queue.currentTrack.title} resumed`
          : `Something went wrong ${interaction.member}`,
      });
    },
  };
  