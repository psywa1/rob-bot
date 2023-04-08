require('dotenv').config({ path:'./.env' })

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
  // client.guilds.cache.get("277106122824089601");
  // await client.application?.fetch();
  // console.log(client.guilds.cache.get("277106122824089601").members.cache);

  client.application.commands.set(CommandsArray);
  client.user.setActivity("Rob-Bot", { type: 2 });
  await client.guilds.cache
    .get(process.env.GUILD_ID)
    .commands.set(client?.commands)
    .then(console.log(`${c.user.tag} is online`))
    .catch((err) => {
      console.log("Error with setting commands");
    });
});

client.on("messageCreate", async (message) => {
  console.log(`${message.author.username} sent a message: ${message.content}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  const command = client.commands.get(interaction.commandName);
  command.execute(client, interaction)
});

client.login(process.env.TOKEN);
