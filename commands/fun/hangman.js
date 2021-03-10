const { hangman } = require('reconlx')

module.exports = {
    name : 'hangman',
    description : 'Plays hangman',
    security : 'None',
    async execute(message, args, prefix, client, eco)  {
        //if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You need manage messages permission.')
        var things = ['Rock', 'Paper', 'Scissor', 'Actor', 'Advertisement', 'Afternoon', 'Grass', 'Fart', 'Dinner', 'Fortnite', 'PUBG', 'House', 'Discord', 'Computer', 'Hangman', 'TicTacToe', 'Pizza', 'Spaghetti', 'James', 'Sean', 'Brennan', 'Keyboard'];
var word = things[Math.floor(Math.random()*things.length)];
        message.delete()
        const channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0])
        if(!channel) {
        const hang = new hangman({
            message: message,
            word: word,
            client: client,
            channelID: message.channel.id,
        })

        hang.start();
        return;
        }
        const hang = new hangman({
            message: message,
            word: word,
            client: client,
            channelID: channel.id,
        })

        hang.start();
        console.log(word)
    }
}