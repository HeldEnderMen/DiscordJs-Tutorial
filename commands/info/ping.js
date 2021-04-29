const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { Color } = require("../../config.json");

module.exports = {
  name: "ping",
  aliases: [],
  description: "Pong!",
  usage: "Ping",
  run: async (client, message, args) => {
    message.delete();
    const embed = new MessageEmbed()
      .setColor(Color)
      .setDescription(`Pong - ${client.ws.ping}ms`)
      .setFooter(`Requested By ${message.author.username}`)
      .setTimestamp();

    message.channel.send(embed).catch(error =>
    message.reply(
      `Sorry but I couldn't run work because of: ${error}`
    ));

    //End
  }
};
