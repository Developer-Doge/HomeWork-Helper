module.exports = {
	name: 'work',
	description: 'Makes you work',
    security: 'None',
	async execute(message, args, prefix, client, eco) {
		let work = await eco.work({
			userId: message.author.id, //It can be any users ID
			workMoney: 100, //Amount of money between 1-500
			workJobs: ["Cashier", "Janitor", "Stupid Person", "Dummy", "Vampire Hunter", "Professional Toilet", "Professional Gamer", "Professional Rule Breaker", "Bank Robber", "Professional Brennan"] //Optional. Default: ["Chef", "Cashier", "Teacher", "Programmer"]
		  });
		  message.channel.send(
			"You have worked as a " + work.job + " and got " + work.amount + "$"
		  );
	},
};