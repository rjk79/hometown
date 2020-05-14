class Player {
    constructor(username, socketId) {
        this.username = username
        this.hand = []
        this.coins = 3
        this.socketId = socketId
    }
}
module.exports = Player