const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("./config.json");

client.on('ready', () => {
  console.log(`Started.`);
  client.user.setGame(config.status);
});

client.on('message', message => { if (!message.content.startsWith(config.prefix) || message.author.bot) return;

  if (message.content.toLowerCase() === config.prefix + `about`) {
    message.reply(`About test, blah blah blah..`);
  }
  
});

client.login(config.token);
