module.exports = {
	name: 'search',
	description: 'Makes you search',
    security: 'None',
	async execute(message, args, prefix, client, eco) {
		let search = await eco.search({
			userId: message.author.id,
			searchMoney: 50,
			searchPlace: ["Park", "Toilet", "Closet", "Gas Tank", "Poop", "Pants", "Trump's Purse"]
		  });
		  message.channel.send(
			`You have search in ${search.place} and got ${search.amount}$`
		  );
	},
};