const giveMeAJoke = require('discord-jokes');

module.exports = {
	name: 'cn-joke',
	description: 'Gets random chuck norris joke',
    security: 'None',
	execute(message) {
		giveMeAJoke.getRandomCNJoke (function(joke) {
            message.channel.send(`${joke}`);
        });
        
	},
};