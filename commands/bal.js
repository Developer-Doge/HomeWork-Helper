module.exports = {
	name: 'bal',
	description: 'Displays balance',
    security: 'None',
	async execute(message, args, prefix, client, eco) {
		let money = await eco.fetchMoney(message.author.id, message.guild.id);
        return message.channel.send(`${message.author} has ${money} coins.`);
	},
};