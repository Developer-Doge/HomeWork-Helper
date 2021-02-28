const got = require('got')
const Discord = require('discord.js')

module.exports = {
	name: 'meme',
	description: 'Selects a random meme',
        security: "None",
	async execute(message, args) {
try {

//Sends a request to https://api.imgflip.com/get_memes and saves the response
const data = await got('https://api.imgflip.com/get_memes')

//Converts the response to a JSON readable format
const data2 = JSON.parse(data.body);

//Runs random thing getting a random meme from the metatable.
const memes = data2.data.memes
const meme = randomThing(memes)
console.log(meme);

//Creates an embed with the info parsed above.
const embed = new Discord.MessageEmbed()
            .setColor(0x00A2E8)
            .setTitle(meme.name)
            .setImage(meme.url)
            .setFooter(meme.url)
            .setDescription(args)
            .setColor('RANDOM')
message.channel.send(embed)
        } catch (err) {
return console.log(err);
        }
}}

//Is a function that choses a random item from a table.
function randomThing(memes) {
  return memes[Math.floor(Math.random() * memes.length)];
}