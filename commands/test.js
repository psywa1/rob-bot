module.exports = {
    name: 'test',
    description: 'Test Command',
    type: 1,
    async execute(interaction) {
        await interaction.reply("Test Command")
    }
}