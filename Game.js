const CARDS = require('./constants')
const Card = require("./Card")
const Player = require("./Player")

class Game {
    constructor(id) {
        this.id = id
        this.cards = []
        this.market = {
            small: [],
            big: [],
            purple: []
        }
        this.players = {}      
        this.messages = []
        this.turnOrder = []
        this.currentTurnIdx = 0

        this.winner = null
        this.mostRecentMove = null
    
        this.makeCards()
        this.shuffleCards()
        this.fillMarket()
    }

    currentPlayer() {
        const playerId = this.turnOrder[this.currentTurnIdx]
        return this.players[playerId]
    }

    makeCards() {
        const { BASE_GAME_CARDS } = CARDS
        for (let i = 0; i < BASE_GAME_CARDS.length; i++) {
            const { name, description, color, activation_numbers, magnitude, symbol, quantity, cost } = BASE_GAME_CARDS[i]

            for (let i = 0; i < quantity; i++) {
                this.cards.push(new Card(
                    name,
                    description,
                    color,
                    activation_numbers,
                    magnitude,
                    symbol,
                    cost
                ))
            }
        }

    }

    shuffleCards() { //for any number of cards
        let cards = this.cards
        let res = [] //indices
        for (let i = 0; i < cards.length; i++) {
            let randomIdx = Math.floor(Math.random() * cards.length)
            while (res.includes(randomIdx)) {
                randomIdx = Math.floor(Math.random() * cards.length)
            }
            res.push(randomIdx)
        }
        this.cards = res.map(i=>cards[i])
    }

    fillMarket() { //move cards to market
        const {market, cards} = this
        let seen = []

        while ((market.small.length < 5
           || market.big.length < 5
           || market.purple.length < 3) && cards.length
        ) {
            const currentCard = cards.pop()
            const min = Math.min(...currentCard.activation_numbers)
            if (currentCard.color === 'purple') {
                if (market.purple.length < 3) {
                    market.purple.push(currentCard)
                }
                else {
                    seen.unshift(currentCard) //put it back
                }
            } 
            else {
                if (min <= 6 && market.small.length < 5) {
                    market.small.push(currentCard)
                }
                else if (min > 6 && market.big.length < 5) { 
                    market.big.push(currentCard)
                }
                else {
                    seen.unshift(currentCard) //put it back
                }
            }
        }

        this.cards = seen.concat(cards)
    }

    addPlayer(playerId, username) {
        let { players, turnOrder } = this
        players[playerId] = new Player(username, playerId)
        turnOrder.push(playerId)
    }

    dealCards() {
        const {STARTING_CARDS} = CARDS
        const {players} = this
        
        Object.keys(players).forEach(id => {
            STARTING_CARDS.forEach(s => {
                const { name, description, color, activation_numbers, magnitude, symbol } = s
                players[id].hand.push(new Card(name,
                    description,
                    color,
                    activation_numbers,
                    magnitude,
                    symbol 
                ))
            })
        })
    }

    handleDiceRoll() {
        const diceRoll = Math.floor(Math.random() * 6) + 1 //1-6
        // this.triggerRedCards(diceRoll)
        this.triggerGreenCards(diceRoll)
        this.triggerBlueCards(diceRoll)
        // this.triggerPurpleCards(diceRoll)
        return diceRoll
    }

    triggerGreenCards(diceRoll) {
        this.currentPlayer().hand.forEach(c => {
            if (c.color === 'green' && c.activation_numbers.includes(diceRoll)) {
                p.coins += c.magnitude
            }
        })
        
    }

    triggerBlueCards(diceRoll) {
        Object.values(this.players).forEach(p => {
            p.hand.forEach(c => {
                if (c.color === 'blue' && c.activation_numbers.includes(diceRoll)) {
                    p.coins += c.magnitude
                }
            })
        })
    }

    triggerRedCards() {
        const cp = this.currentPlayer()
        Object.values(this.players).forEach(p => {
            p.hand.forEach(c => {
                if (c.color === 'red' && c.activation_numbers.includes(diceRoll)) {
                    cp.coins -= c.magnitude
                    p.coins += c.magnitude
                }
            })
        })
    }

    triggerPurpleCards() {

    }

    buyCard(playerId, cardName) {
        const {market, players} = this
        const player = players[playerId]

        Object.keys(market).forEach(c => {

            const idx = market[c].map(c => c.name).indexOf(cardName)

            if (idx !== -1) {
                const boughtCard = market[c].splice(idx, 1)[0]
                player.coins -= boughtCard.cost
                player.hand.push(boughtCard)
            }
        })
        this.fillMarket()
        this.changeTurn()
    }

    changeTurn() {
        const {players} = this
        this.currentTurnIdx += 1
        if (this.currentTurnIdx === Object.keys(players).length) this.currentTurnIdx = 0
    }

    setMostRecentMove(player, card) {
        // if (player.color === card.color) {
        //     this.mostRecentMove = `found a fellow spy! (${card.word.toUpperCase()})`
        // }
       
    }

    makeMove(idx, playerId) {
        // const player = this.players[playerId] 
        // const card = this.cards[idx]

        // this.setMostRecentMove(player, card)
        // this.winner = this.findWinner()

    }

    findWinner() {
        
    }
}

module.exports = Game