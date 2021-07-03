const Discord = require("discord.js")
const client = new Discord.Client()
require("dotenv").config();
const commandFunctions = require("./commandFunctions")
const axios = require("axios");
const apexData = require("./duckApexData.json");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", msg => {
  if (msg.author.bot) return

  const isCommandMsg = commandFunctions.isCommandMessage(msg);
  if (isCommandMsg) return;

  if (msg.author.username === "bzzzzzzzbee") {
      msg.channel.send("STFU DENALI")
      return;
  }

  if (commandFunctions.checkForSteamUrl(msg)) {
    return;
  }
})

const apexAPIKey = process.env.APEX_API_KEY;

const getApexTest = (msg) => {
    msg.channel.send("Fetching apex data for " + msg.author.username);

    // const user = apexData[msg.author.username];
    const user = apexData["drdylanman"];
    console.log(user);

    const getUrl = `https://api.mozambiquehe.re/bridge?platform=${user.platform}&player=${user.apexUserName}&auth=${apexAPIKey}`
    // console.log(getUrl);

    // axios.get(getUrl)
    // .then((response) => {
    //     console.log(response.data);

    //     const replyMsg = ``;
    // })
    // .catch(err => {
    //     msg.channel.send("Error fetching data for " + msg.author.username);
    //     console.log(err);
    // })

    axios.get(`https://api.mozambiquehe.re/nametouid?player=drdylanman&platform=PC&auth=${apexAPIKey}`)
    .then(response => {
        console.log(response.data);
    }) 
}

client.login(process.env.TOKEN)