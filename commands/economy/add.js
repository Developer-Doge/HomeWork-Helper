module.exports = {
	name: 'add',
	description: 'Adds cash',
    security: 'Owner',
	async execute(message, args, prefix, client, eco) {
        const pointsToAdd = parseInt(args[1], 10);
		let amount = await eco.addMoney({
			userId: message.author.id, //It can be any users ID
			amountMoney: amount //Can be any amount
		  });
		  message.channel.send("I have added to your balance " + addMoney.amount + "$");
	},
};