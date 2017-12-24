const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("./config.json");
const mc = require('minecraft-protocol');

client.on('ready', () => {
  console.log(`Initiating startup..`);
  client.user.setGame(config.status);
  console.log(`Set bot user status to config.status.`);
  console.log(`Attempting to connect to the server client..`);
  var serverclient = mc.createClient({
    host: config.host,
    port: config.port,
    username: config.email,
    password: config.password,
  });
  if (!serverclient) {
    console.log(`Server client could not be connected.\nPlease fix any details in your config.json and reboot the bot.`);
  } else { console.log(`Server client connected.`); console.log(`Startup finished.`); }
});

serverclient.on('chat', function(packet) {
  
  var jsonMsg = JSON.parse(packet.message);
  if(jsonMsg.translate == 'chat.type.announcement' || jsonMsg.translate == 'chat.type.text') {
    var username = jsonMsg.with[0].text;
    var msg = jsonMsg.with[1];
    // if(username === client.username) return;
    // client.write('chat', {message: msg});
    console.log(username + `: ` + msg);
  }
});

client.on('message', message => { if (message.content.startsWith(config.prefix)) {
    if (message.content.toLowerCase() === config.prefix + `about`) {
      message.reply(`About test, blah blah blah..`);
    }
  } else {
    serverclient.write('chat', {message: message.content.toString()});
  }});

client.login(config.token);
