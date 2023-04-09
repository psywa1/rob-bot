const { QueryType } = require("discord-player");
const { ApplicationCommandOptionType, GuildMember } = require("discord.js");

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
    await interaction.deferReply();
    const song = interaction.options.getString("song");
    const searchResult = await player.search(song, {
      requestedBy: interaction.member,
      searchEngine: QueryType.AUTO,
    });

    if (!searchResult || !searchResult.tracks.length) {
      return interaction.editReply({
        content: `${song} - requested by - ${interaction.member} not found`,
        epheremal: true,
      });
    }

    const queue = await player.nodes.create(interaction.guild, {
      ytdlOptions: {
        quality: "highest",
        filter: "audioonly",
        highWaterMark: 1 << 25, 
        dlChunkSize: 0,
      },
      metadata: interaction.channel,
      spotifyBridge: true, 
      volume: 50, 
    }); 

    try {
      if (!queue.connection)
        await queue.connect(interaction.member.voice.channel);
    } catch {
      await player.nodes.delete(interaction.guildId);
      return interaction.editReply({
        content: `Can't join the voice channel ${interaction.member}`,
        ephemeral: true,
      });
    }

    searchResult.playlist
      ? queue.addTrack(searchResult.tracks)
      : queue.addTrack(searchResult.tracks[0]);

    if (!queue.node.isPlaying()) await queue.node.play();

    await interaction.editReply({
      content: `Queued ${searchResult.playlist ? "playlist" : "track"}:\n${
        searchResult.tracks[0].title
      } - (${searchResult.tracks[0].url})\nrequested by - ${
        interaction.member
      }`,
    });
  },
};
