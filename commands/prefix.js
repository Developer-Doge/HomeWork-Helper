const { MessageMentions } = require("discord.js");
module.exports = {
	name: 'prefix',
	description: 'Send the current prefix.',
	execute(message, args, prefix) {
		message.reply("The current prefix is '" + prefix + "'")
	},
};