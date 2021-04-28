const Discord = require("discord.js");
const fs = require("fs")
const client = new Discord.Client();
const { default_prefix, Token, Color} = require("./config.json");

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

client.on("ready", async message =>{
  console.log("Hey I am Online");
  client.user.setActivity("Minecraft lol", {type: 'PLAYING'})
})


let modules = ["info"];

modules.forEach(function(module) {
  fs.readdir(`./commands/${module}`, function(err, files) {
    if (err)
      return new Error(
        "Missing Folder Of Commands! Example : Commands/<Folder>/<Command>.js"
      );
    files.forEach(function(file) {
      if (!file.endsWith(".js")) return;
      let command = require(`./commands/${module}/${file}`);
      console.log(`${command.name} Command Has Been Loaded`);
      if (command.name) client.commands.set(command.name, command);
      if (command.aliases) {
        command.aliases.forEach(alias =>
          client.aliases.set(alias, command.name)
        );
      }
      if (command.aliases.length === 0) command.aliases = null;
    });
  });
}) 

client.on("message", async message => {
  if (message.channel.type === "dm") return;
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  
  if (!message.content.startsWith(default_prefix)) return;
  
  const args = message.content
  .slice(default_prefix.length)
  .trim()
  .split(" ");
  
  const cmd = args.shift().toLowerCase();
  
  if (cmd.length === 0) return;
  
  let command =
      client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd))
  if (!command) return;
  if (command) {
    if(!message.guild.me.hasPermission("ADMINISTRATOR"))
    return message.channel.send(
    "I don't have enough permission to use this command! Require: Administrator")
  command.run(client, message, args);
  }
})

client.login(Token);
