const { MessageMentions } = require("discord.js");
module.exports = {
	name: 'prefix',
	description: 'Send the current prefix.',
	security: "None",
	execute(message, args, prefix) {
		message.reply("The current prefix is '" + prefix + "'")
	},
};