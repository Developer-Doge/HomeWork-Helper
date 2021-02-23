// Import the discord.js module
const Discord = require("discord.js");

// Create an instance of a Discord client
const client = new Discord.Client();
const guild = new Discord.Guild(client);
const randomPuppy = require("random-puppy");
const Canvas = require('canvas');
const { prefix, token, admin } = require('./config.json');

client.on("ready", () => {
  console.log("I am ready!");
  client.user.setActivity("homework helper. (h!)", { type: "PLAYING" });
});

client.on("message", message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // If the message content starts with "!kick"
  if (message.content.startsWith(prefix + "kick")) {
    if (message.member.roles.cache.find(r => r.name === admin)) {
      // Assuming we mention someone in the message, this will return the user
      // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
      const user = message.mentions.users.first();
      // If we have a user mentioned
      if (user) {
        // Now we get the member from the user
        const member = message.guild.member(user);
        // If the member is in the guild
        if (member) {
          /**
           * Kick the member
           * Make sure you run this on a member, not a user!
           * There are big differences between a user and a member
           */
          member
            .kick("Optional reason that will display in the audit logs")
            .then(() => {
              // We let the message author know we were able to kick the person
              message.reply(`Successfully kicked ${user.tag}`);
            })
            .catch(err => {
              // An error happened
              // This is generally due to the bot not being able to kick the member,
              // either due to missing permissions or role hierarchy
              message.reply("I was unable to kick the member");
              // Log the error
              console.error(err);
            });
        } else {
          // The mentioned user isn't in this guild
          message.reply("That user isn't in this guild!");
        }
        // Otherwise, if no user was mentioned
      } else {
        message.reply("You didn't mention the user to kick!");
      }
    }
  }
});

client.on("message", message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;
  if (message.content === prefix + "restart") {
    if (message.member.roles.cache.find(r => r.name === admin)) {
      message.channel.send("Rebooting...").then(() => {
        message.channel.send(
          "Rebooted, please wait 5 seconds till I am online."
        );
        process.exit(1);
      });
    }
  }
});

client.on("message", message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;
  if (message.content.startsWith(prefix + "clear")) {
    if (message.member.roles.cache.find(r => r.name === admin)) {
      const messageArray = message.content.split(" ");
      const args = messageArray.slice(1);

      let deleteAmount;

      if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
        return message.reply("Please put a number only!");
      }

      if (parseInt(args[0]) > 99) {
        return message.reply("You can only delete 100 messages at a time!");
      } else {
        deleteAmount = parseInt(args[0]);
      }

      message.channel.bulkDelete(deleteAmount + 1, true);
      message.reply(`Successfully deleted ${deleteAmount} message(s).`);
      setTimeout(function() {
        message.channel.bulkDelete(1, true);
      }, 5000);
    }
  }
});


/** Command For h!poll **/
client.on("message", async message => {
  if (!message.guild) return;
  if (message.content.startsWith(prefix + "poll")) {
    if (message.member.roles.cache.find(r => r.name === admin)) {
      const messageArray = message.content.split(" ");
      const cmd = messageArray[0];
      const args = messageArray.slice(1);

      if (cmd === "h!poll") {
        let pollChannel = message.mentions.channels.first();
        let pollDescription = args.slice(1).join(" ");
        if (!pollChannel) {
          let embedPoll = new Discord.MessageEmbed()
            //.setTitle('Poll')
            .setDescription(args.join(" "))
            .setColor("BLUE")
            .setAuthor(
              message.guild.name,
              message.guild.iconURL(),
              "https://roblox.com"
            );
          let msgEmbed = await message.channel.send(embedPoll);
          await msgEmbed.react("👍");
          await msgEmbed.react("👎");
          return;
        }
        let embedPoll = new Discord.MessageEmbed()
          //.setTitle('Poll')
          .setDescription(pollDescription)
          .setColor("BLUE")
          .setAuthor(
            message.guild.name,
            message.guild.iconURL(),
            "https://roblox.com"
          );
        let msgEmbed = await pollChannel.send(embedPoll);
        await msgEmbed.react("👍");
        await msgEmbed.react("👎");
      }
    }
  }
});

/**client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // If the message content starts with "!kick"
  if (message.content.startsWith('h!set')) {
    if(message.member.roles.cache.find(r => r.name === "Admin")) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        member
          //sql.set('moneys', '1000')
          .then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`Successfully gave money to: ${user.tag}`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply('I was unable to give money to the member');
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
      // Otherwise, if no user was mentioned
    } else {
      message.reply("You didn't mention the user to set!");
    }
  }
}
});

client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // If the message content starts with "!kick"
  if (message.content.startsWith('h!get')) {
    if(message.member.roles.cache.find(r => r.name === "Admin")) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        member
          //const amount = sql.get('moneys')
          .then(() => {
            // We let the message author know we were able to kick the person
            message.reply(`, ${user.tag} has points!`);
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to kick the member,
            // either due to missing permissions or role hierarchy
            message.reply('I was unable to give money to the member');
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
      // Otherwise, if no user was mentioned
    } else {
      message.reply("You didn't mention the user to set!");
    }
  }
}
});*/

client.on("message", message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // if the message content starts with "!ban"
  if (message.content.startsWith(prefix + "ban")) {
    if (message.member.roles.cache.find(r => r.name === admin)) {
      // Assuming we mention someone in the message, this will return the user
      // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
      const user = message.mentions.users.first();
      // If we have a user mentioned
      if (user) {
        // Now we get the member from the user
        const member = message.guild.member(user);
        // If the member is in the guild
        if (member) {
          /**
           * Ban the member
           * Make sure you run this on a member, not a user!
           * There are big differences between a user and a member
           * Read more about what ban options there are over at
           * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
           */
          member
            .ban({
              reason: "They were bad!"
            })
            .then(() => {
              // We let the message author know we were able to ban the person
              message.reply(`Successfully banned ${user.tag}`);
            })
            .catch(err => {
              // An error happened
              // This is generally due to the bot not being able to ban the member,
              // either due to missing permissions or role hierarchy
              message.reply("I was unable to ban the member");
              // Log the error
              console.error(err);
            });
        } else {
          // The mentioned user isn't in this guild
          message.reply("That user isn't in this guild!");
        }
      } else {
        // Otherwise, if no user was mentioned
        message.reply("You didn't mention the user to ban!");
      }
    }
  }
});

client.on("message", message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // if the message content starts with "!ban"
  if (message.content.startsWith(prefix + "softban")) {
    if (message.member.roles.cache.find(r => r.name === admin)) {
      // Assuming we mention someone in the message, this will return the user
      // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
      const user = message.mentions.users.first();
      const id = user.id;
      // If we have a user mentioned
      if (user) {
        // Now we get the member from the user
        const member = message.guild.member(user);
        // If the member is in the guild
        if (member) {
          /**
           * Ban the member
           * Make sure you run this on a member, not a user!
           * There are big differences between a user and a member
           * Read more about what ban options there are over at
           * https://discord.js.org/#/docs/main/master/class/GuildMember?scrollTo=ban
           */
          member
            .ban({
              reason: "They were bad!"
            })
            .then(() => {
              // We let the message author know we were able to ban the person
              message.guild.members.unban(id);
              message.reply(`Successfully soft-banned ${user.tag}`);
            })
            .catch(err => {
              // An error happened
              // This is generally due to the bot not being able to ban the member,
              // either due to missing permissions or role hierarchy
              message.reply("I was unable to soft-ban the member");
              // Log the error
              console.error(err);
            });
        } else {
          // The mentioned user isn't in this guild
          message.reply("That user isn't in this guild!");
        }
      } else {
        // Otherwise, if no user was mentioned
        message.reply("You didn't mention the user to soft-ban!");
      }
    }
  }
});

client.on("message", message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;
  if (message.content.startsWith(prefix + "meme")) {
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
  }
});

client.on("message", message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;
  if (message.content.startsWith(prefix + "prefix")) {
    message.reply("The current prefix is '" + prefix + "'")
  }
});

client.on("message", message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;
  if (message.content.startsWith(prefix + "join")) {
    client.emit('guildMemberAdd', message.member);
  }
});

client.on("message", async message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;
  if (message.content.startsWith(prefix + "rip")) {
    const channel = message.channel
    const user = message.mentions.users.first();
  
  if (!channel) return;

  const canvas = Canvas.createCanvas(250, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2Ffuneral-icons-set-cartoon-style%2F512%2Fa373-512.png&f=1&nofb=1');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';

	const avatar = await Canvas.loadImage(user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, canvas.width / 3.35, canvas.height / 2.75, canvas.width / 2.5, canvas.height / 2.5);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`***RIP,*** ${user}!`, attachment);
  }
});

client.on('guildMemberAdd', async member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
  
  if (!channel) return;

  const canvas = Canvas.createCanvas(700, 250);
	const ctx = canvas.getContext('2d');

	const background = await Canvas.loadImage('https://raw.githubusercontent.com/discordjs/guide/master/guide/images/canvas.jpg');
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	ctx.strokeStyle = '#74037b';
	ctx.strokeRect(0, 0, canvas.width, canvas.height);

	// Slightly smaller text placed above the member's display name
	ctx.font = '28px sans-serif';
	ctx.fillStyle = '#ffffff';
	ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

	// Add an exclamation point here and below
	ctx.font = '68px sans-serif'
	ctx.fillStyle = '#ffffff';
	ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

	ctx.beginPath();
	ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
	ctx.closePath();
	ctx.clip();

	const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
	ctx.drawImage(avatar, 25, 25, 200, 200);

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

	channel.send(`Welcome to the server, ${member}!`, attachment);
});

client.on("message", message => {
    // Ignore messages that aren't from a guild
    if (!message.guild) return;
    if (message.content.startsWith(prefix + "test")) {
      message.reply("It Worked!")
    }
  });

// Log our bot in using the token from https://discord.com/developers/applications
client.login(token);
