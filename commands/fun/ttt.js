const { tictactoe } = require('reconlx')

module.exports = {
	name: 'ttt',
	description: 'Tic Tac Toe',
    security: 'None',
	async execute(message, args, prefix, client, eco) {
		const member = message.mentions.members.first() 
            if(!member)  return  message.channel.send('Please specify a member')
        
        new tictactoe({
            player_two: member, 
            message: message
        })
	},
};