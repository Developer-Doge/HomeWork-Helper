module.exports = {
	name: 'bal',
	description: 'Displays balance',
    security: 'None',
	async execute(message, args, prefix, client, eco) {
		let balance = await eco.balance({
			userId: message.author.id //It can be any users ID
		  });
		  message.channel.send("Your balance: " + balance.money);
	},
};