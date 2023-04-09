require("dotenv").config({ path: "./.env" });

const { Player } = require("discord-player");
const { Client, GatewayIntentBits, Collection, Events } = require("discord.js");
const fs = require("fs");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.commands = new Collection();

CommandsArray = [];

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const player = new Player(client);

client.on("ready", async (c) => {
  client.application.commands.set(CommandsArray);
  client.user.setActivity("Rob-Bot", { type: 2 });
  await client.guilds.cache
    .get(process.env.GUILD_ID)
    .commands.set(client?.commands)
    .then(console.log(`${c.user.tag} is online`))
    .catch((err) => {
      console.log("Error with setting commands: " + err);
    });
});

client.on("messageCreate", async (message) => {
  console.log(`${message.author.username} sent a message: ${message.content}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  const command = client.commands.get(interaction.commandName);
  if (command.description.includes("MusicPlayer")) {
    console.log("Music command")
    if (!interaction.member.voice.channel) {
      return void interaction.reply({
        content: "You are not in a voice channel!",
        ephemeral: true,
      });
    }
    
    if (
      interaction.guild.members.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.members.me.voice.channelId
    ) {
      return void interaction.reply({
        content: "You are not in my voice channel!",
        ephemeral: true,
      });
    }
    command.execute(player, interaction);
  } else {
    command.execute(interaction);
  }
});

client.login(process.env.TOKEN);
