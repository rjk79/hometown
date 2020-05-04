const WORDS = require('./constants')
const Card = require("./Card")
const Player = require("./Player")

class Game {
    constructor(id) {
        this.id = id
        this.cards = []
        this.players = {}      
        this.messages = []
        this.isStarted = false
        this.currentTurnColor = "red"

        const colors = ['red', 'blue', 'white', 'black']
        const amounts = [9, 8, 7, 1]
        for (let i=0; i<colors.length; i++) {
            const newCards = this.makeCards(colors[i], amounts[i], this.cards)
            this.cards = this.cards.concat(newCards)
        }
        
        this.cards = this.shuffleCards(this.cards)
    }

    shuffleCards(cards) {
        let res = []
        for (let i = 0; i < cards.length; i++) {
            let randomIdx = Math.floor(Math.random() * cards.length)
            while (res.includes(randomIdx)) {
                randomIdx = Math.floor(Math.random() * cards.length)
            }
            res.push(randomIdx)
        }
        res = res.map(i=>cards[i])
        return res
    }

    makeCards(color, amount, cards) {
        let res = []
        for (let i = 0; i < amount; i++) {
            let randomIdx = Math.floor(Math.random() * 400) //400 words. highest random # is ~399.999 => 399
            const chosenWords = cards.map(c => c.word).concat(res.map(c => c.word))
            while (chosenWords.includes(WORDS[randomIdx])) {
                randomIdx = Math.floor(Math.random() * 400)
            }
            res.push(new Card(color, WORDS[randomIdx], randomIdx))
        }
        return res
    }

    addPlayer(playerId) {
        let { players } = this
        players[playerId] = new Player()
    }

    changeTeams(playerId) {
        let {players} = this
        if (players[playerId].color === "red") {
            players[playerId].color = "blue"
        }
        else {
            players[playerId].color = "red"
        }
        
    }

    makeMove(idx, playerId) {
        if (this.players[playerId].color === this.currentTurnColor) {
            this.cards[idx].isRevealed = true
        }
    }

    winner() {
        if (this.cards.filter(c=>c.color==="red" && c.isRevealed).length === 9) {
            return "red"
        }
        else if (this.cards.filter(c => c.color === "blue" && c.isRevealed).length === 8) {
            return "blue"
        } 
        else if (this.cards.filter(c => c.color === "black" && c.isRevealed).length) {
            if (this.currentTurnColor === "red") {
                return "red"
            }
            else {
                return "blue"
            }
        }
        else {
            return null
        }
    }
}

module.exports = Game