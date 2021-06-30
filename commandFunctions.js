/**
 * if message sent on contains a url to a steam game page and nothing else, will delete that message and send a new message with a url to open the game in the steam desktop app instead
 * @param {*} text 
 * @returns 
 */
const checkForSteamUrl = (msg) => {
    const baseSteamUrlRegex = /^(?<!steam:\/\/openurl\/)https?:\/\/store.steampowered.com\/app\//gi

    const hasSteamUrlWithoutSpecialPrefix = baseSteamUrlRegex.test(msg.content);

    if (hasSteamUrlWithoutSpecialPrefix) {
        msg.reply(msg.content);
        msg.delete({ timeout: 0 });
    }

    return hasSteamUrlWithoutSpecialPrefix;
}

module.exports = {
    checkForSteamUrl
}