const Discord = require("discord.js");
const bot = new Discord.Client();

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

function doesMessageContainMaths(str) { 

  if (str.includes('-')) {
    return true
  }
  if (str.includes('+')) {
    return true
  }
  if (str.includes('*')) {
    return true
  }
  if (str.includes('/')) {
    return true
  }
  
  return false
  
} 
bot.on('message', msg => {
  if (doesMessageContainMaths(msg.content.toString())) {
    let res
    
    try {
      res = eval(msg.content)
    } catch (e) {
      msg.reply(e)
      console.err(e)
      return
    }
    
    msg.channel.send(`${msg.content} is ${res}\nQUICK MATHS!`)
  }
  
  if (msg.content.toLowerCase().includes('twitch')) {
    msg.channel.send('https://www.twitch.tv/pandelisz/')
  }
});

bot.login(process.env.DISCORD_KEY);
