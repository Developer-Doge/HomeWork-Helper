// Import the discord.js and file system module
const fs = require('fs');
const Discord = require("discord.js");

// Create an instance of a Discord client, Guild, RandomPuppy, Canvas, Commands Collection, and Read the Prefix, Token, and Admin Role Name.
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const guild = new Discord.Guild(client);
const { prefix, token, admin } = require('./config.json');

const Enmap = require("enmap");
client.points = new Enmap("points");

client.settings = new Enmap({
  name: "settings",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep',
  autoEnsure: {
    prefix: "h!",
    modLogChannel: "mod-log",
    modRole: "Mod",
    adminRole: "Admin",
    welcomeChannel: "welcome",
    welcomeMessage: "Say hello to {{user}}, everyone!"
  }
});

client.on("ready", () => {
  console.log("Succesful Starting");
  client.user.setActivity(`homework helper. (h!), Currently helping ${client.guilds.cache.size} servers!`, { type: "PLAYING" });
});

/** Dynamic Commands Setup **/
client.on("message", async message => {
      // We get the value, and autoEnsure guarantees we have a value already.
      const guildConf = client.settings.get(message.guild.id);
      if (!message.content.startsWith(guildConf.prefix) || message.author.bot) return;
	       const args = message.content.slice(prefix.length).trim().split(/ +/);
	       const command = args.shift().toLowerCase();

         if (!client.commands.has(command)) return;

         if (!command.security === "Mod") {
          if (!message.guild.roles.cache.find(role => role.name === guildConf.modRole)) {
            message.reply('Insufficient Permissions')
            return;
         }
        }

         if (!command.security === "Admin") {
          if (!message.guild.roles.cache.find(role => role.name === guildConf.adminRole)) {
            message.reply('Insufficient Permissions')
            return;
         }
        }

         if (!command.security === "Owner") {
          if (!message.author == message.guild.owner) {
            message.reply('Insufficient Permissions')
            return;
         }
        }

        try {
	      client.commands.get(command).execute(message, args, prefix, client, token);
}       catch (error) {
	      console.error(error);
	      message.reply('there was an error trying to execute that command!');
  }
      if (!message.author.bot) {
        const key = `${message.guild.id}-${message.author.id}`;

        // Triggers on new users we haven't seen before.
        client.points.ensure(`${message.guild.id}-${message.author.id}`, {
          user: message.author.id,
          guild: message.guild.id,
          points: 0,
          level: 1
        });
    
        client.points.inc(key, "points");
    
        // Calculate the user's current level
        const curLevel = Math.floor(0.1 * Math.sqrt(client.points.get(key, "points")));
    
        // Act upon level up by sending a message and updating the user's level in enmap.
        if (client.points.get(key, "level") < curLevel) {
          message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
          client.points.set(key, curLevel, "level");
        }
      }
  });
client.on("guildDelete", guild => {
  // When the bot leaves or is kicked, delete settings to prevent stale entries.
  client.settings.delete(guild.id);
});

client.on("guildMemberAdd", member => {
  // This executes when a member joins, so let's welcome them!

  // First, ensure the settings exist
  client.settings.ensure(member.guild.id, defaultSettings);

  // First, get the welcome message using get: 
  let welcomeMessage = client.settings.get(member.guild.id, "welcomeMessage");

  // Our welcome message has a bit of a placeholder, let's fix that:
  welcomeMessage = welcomeMessage.replace("{{user}}", member.user.tag)

  // we'll send to the welcome channel.
  member.guild.channels.cache
    .find(channel => channel.name === client.settings.get(member.guild.id, "welcomeChannel"))
    .send(welcomeMessage)
    .catch(console.error);
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

// RIP Command
/**client.on("message", async message => {
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
});*/

// Broken Welcome Message
/*client.on('guildMemberAdd', async member => {
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
});*/

// Log our bot in using the token from https://discord.com/developers/applications
client.login(token);
