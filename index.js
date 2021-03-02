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
const { prefix, token, emoji} = require('./config.json');
client.emotes = emoji

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
	       const cmd = args.shift().toLowerCase();
         const command = client.commands.get(cmd);
         if (!client.commands.has(cmd)) return;
          console.log(command)
         if (command.security === 'Mod') {
           console.log(command.security)
          if (!message.member.roles.cache.some(r=>[guildConf.adminRole, guildConf.modRole].includes(r.name))) {
            message.reply('Insufficient Permissions')
            return;
         }
        }

         if (command.security === 'Admin') {
          console.log(command.security)
          if (!message.member.roles.cache.some(r=>[guildConf.adminRole].includes(r.name))) {
            message.reply('Insufficient Permissions')
            return;
         }
        }

        if (command.security === 'Owner') {
          console.log(command.security)
          if (!message.member.hasPermission('ADMINISTRATOR') || message.member.id !== 702245746736496702) {
            message.reply('Insufficient Permissions')
            return;
         }
        }

        try {
	      command.execute(message, args, prefix, client, token);
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
        client.user.setActivity(`homework helper. (h!), Currently helping ${client.guilds.cache.size} servers!`, { type: "PLAYING" });
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

//logs in
client.login(token);
