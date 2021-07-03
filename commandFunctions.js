const axios = require("axios");
const HangmanPlayer = require("./HangmanPlayer");
const helpData = require("./helpData.json");

/**
 * if message sent on contains a url to a steam game page and nothing else, will delete that message and send a new message with a url to open the game in the steam desktop app instead
 * @param {*} text 
 * @returns 
 */
const checkForSteamUrl = (msg) => {
    const baseSteamUrlRegex = /^(?<!steam:\/\/openurl\/)https?:\/\/store.steampowered.com\/app\//gi

    const hasSteamUrlWithoutSpecialPrefix = baseSteamUrlRegex.test(msg.content);

    if (hasSteamUrlWithoutSpecialPrefix) {
        msg.reply("steam://openurl/" + msg.content);
        msg.delete({ timeout: 0 });
    }

    return hasSteamUrlWithoutSpecialPrefix;
}

const getKanyeQuote = (msg) => {
    axios.get("https://api.kanye.rest/")
    .then(response => {
        msg.channel.send('"' + response.data.quote + '"' + "\n\t-Kanye");
    })
}

const printHelpText = (msg) => {
    let msgStr = "***AVAILABLE COMMANDS***"

    helpData.forEach(command => {
        msgStr += `\n${command.command} -> ${command.description}`
    })

    msg.reply(msgStr);
}

const hangmanGame = {
    players: {},
    creator: null,
    playerCount: 0,
    word: null,
    guessesLeft: 0,
    maxGuesses: 5,
    isGameInProgress: false,
    channel: null
}

const createHangmanGame = (msg) => {
    if (hangmanGame.isGameInProgress) {
        msg.reply("Can not create new game while another is in progress");
        return;
    }

    const creator = msg.author.username;
    hangmanGame.creator = creator;
    hangmanGame.playerCount++;

    hangmanGame.isGameInProgress = true;
    hangmanGame.channel = msg.channel;

    hangmanGame.channel.send(creator + " has created a new game of hangman.  Use //joinhangman to join the game");
} 

const joinHangmanGame = (msg) => {
    const user = msg.author.username;

    if (!hangmanGame.players[user]) {
        hangmanGame.players[user] = new HangmanPlayer(user, "");
        hangmanGame.playerCount++;
    } else {
        msg.reply("It looks like you have already joined this game");
        return
    }
}

const startHangmanGame = (msg) => {
    if (hangmanGame.players <= 0) {
        msg.reply("Waiting for at least one player to join the game");
        return;
    }

    hangmanGame.isGameInProgress = true;

    const beginMsg = "***HANGMAN HAS BEGUN***";
    hangmanGame.word.forEach(letter => beginMsg += "_");
    hangmanGame.channel.send(beginMsg);
}

const functions = {
    kanye: getKanyeQuote,
    help: printHelpText,
    createhangman: createHangmanGame,
    joinhangman: joinHangmanGame,
    starthangman: startHangmanGame
}

const isCommandMessage = (msg) => {
    const isCommandRegex = /^\/\/(?!\/)/;
    const isCommand = isCommandRegex.test(msg.content);

    if (isCommand) {
        const commandRegex = /(?<=^\/\/)\w+/;
        const commandMatch = msg.content.match(commandRegex)
        const command = commandMatch[0].toLowerCase();

        if (functions[command]) {
            functions[command](msg);
            return true;
        }
    }

    return false;
}

module.exports = {
    checkForSteamUrl,
    isCommandMessage
}