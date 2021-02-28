
    module.exports = {
      name: 'config',
      description: 'Shows server configuration.',
      security: "Owner",
      execute(message, args, prefix, client, token) {
        const guildConf = client.settings.get(message.guild.id);
        let configProps = Object.keys(guildConf).map(prop => {
          return `${prop}  :  ${guildConf[prop]}`;
        });
        message.channel.send(`The following are the server's current configuration:
        \`\`\`${configProps.join("\n")}\`\`\``);
      },
    };