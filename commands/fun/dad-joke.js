const giveMeAJoke = require('discord-jokes');

module.exports = {
	name: 'dad-joke',
	description: 'Gets random dad joke',
    security: 'None',
	execute(message) {
		giveMeAJoke.getRandomDadJoke (function(joke) {
            message.channel.send(`Dad: ${joke}`);
        });
        
	},
};