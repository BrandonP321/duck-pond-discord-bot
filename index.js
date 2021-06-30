const Discord = require("discord.js")
const client = new Discord.Client()
require("dotenv").config();
const commandFunctions = require("./commandFunctions")

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  if (msg.author.bot) return

  if (commandFunctions.checkForSteamUrl(msg)) {
    return;
  }
})

client.login(process.env.TOKEN)