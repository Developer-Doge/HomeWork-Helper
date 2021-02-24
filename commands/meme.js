module.exports = {
	name: 'meme',
	description: 'Selects a random meme from the selected subreddits',
	execute(message) {
		let reddit = [
            "Kiddet",
            "animemes",
            "MemesOfAnime",
            "animememes",
            "dankmemes",
            "wholesomememes",
            "MemeEconomy",
            "techsupportanimals",
            "memes",
            "meme"
          ];
    
          let subreddit = reddit[Math.floor(Math.random() * reddit.length)];
    
          randomPuppy(subreddit)
            .then(async url => {
              let embedPoll = new Discord.MessageEmbed()
                .setColor("GREEN")
                .setTitle("Meme:")
                .setImage(url)
                .setFooter("r/" + subreddit);
              await message.channel.send(
                embedPoll
              ); /*{
                  
                    files: [{
                        attachment: url,
                        name: 'meme.png'
                    }]
                  
                })*/
              console.log(url);
            })
            .catch(err =>
              message.channel.send(
                "The meme was too big, try again. We are currently working to fix this issue."
              )
            );
	},
};