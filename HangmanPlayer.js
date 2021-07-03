class HangmanPlayer {
    constructor(username, memberData) {
        this.username = username;
        this.incorrectGuessLeft = 5;
        this.discordMember = memberData;
    }
}

module.exports = HangmanPlayer;