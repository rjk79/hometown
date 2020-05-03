const WORDS = require('./constants')
const Card = require("./Card")

class Game {
    constructor() {
        this.cards = []
        this.players = {}        
        this.messages = []
        this.isStarted = false

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
            let randomWord = WORDS[Math.floor(Math.random() * 401)]
            const chosenWords = cards.map(c => c.word)
            while (chosenWords.includes(randomWord)) {
                randomWord = WORDS[Math.floor(Math.random() * 401)]
            }
            res.push(new Card(color, randomWord))
        }
        return res
    }

    makeMove(idx, playerId) {
        this.cards[idx].isRevealed = true
    }

    isGameover() {

    }
}

module.exports = Game