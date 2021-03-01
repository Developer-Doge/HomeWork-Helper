const fs = require('fs');

module.exports = {
	name: 'help',
	description: 'Displays availible commands.',
  security: 'None',
	async execute(message, args, prefix, client, token) {
        let str = '';
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

		for (const file of commandFiles) {
			const command = require(`./${file}`);
			str += `Name: ${command.name}, Description: ${command.description}, Permission Level: ${command.security} \n`;
		}

		message.channel.send(str);
	},
};