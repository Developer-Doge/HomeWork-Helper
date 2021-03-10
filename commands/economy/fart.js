module.exports = {
	name: 'fart',
	description: 'Makes you fart',
    security: 'None',
	async execute(message, args, prefix, client, eco) {
		let beg = await eco.beg({
			userId: message.author.id,
			begMoney: 99999999,
			begPeople: ["Ricky Bobby", "Elon Musk", "Trump", "Joe Bidome", "Peppa Pig"]
		  });
		  message.channel.send(`${beg.people} farted, Here take ${beg.amount}$ and be quiet`);
	},
};