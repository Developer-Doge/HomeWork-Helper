module.exports = {
	name: 'beg',
	description: 'Makes you beg',
    security: 'None',
	async execute(message, args, prefix, client, eco) {
		let beg = await eco.beg({
			userId: message.author.id,
			begMoney: 50,
			begPeople: ["Ricky Bobby", "Elon Musk", "Trump", "Joe Bidome", "Peppa Pig", "Your Mom", "Your sister", "You foot", "Your Supreme Leader", "Vladimir Poopin"]
		  });
		  message.channel.send(`${beg.people}: Here take ${beg.amount}$`);
	},
};