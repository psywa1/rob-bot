module.exports = {
    name: 'test',
    description: 'Test Command',
    async execute(client, interaction) {
        await interaction.reply("Test Command")
    }
}