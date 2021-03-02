const giveMeAJoke = require('discord-jokes');

module.exports = {
	name: 'cn-joke',
	description: 'Gets random chuck norris joke',
    security: 'None',
	execute(message, args, prefix, client) {
		giveMeAJoke.getRandomCNJoke (function(joke) {
            message.channel.send(`Dad: ${joke}`);
        });
        
	},
};