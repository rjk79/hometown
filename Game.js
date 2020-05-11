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
        this.currentTurnColor = "red"
        this.winner = null
        this.mostRecentMove = null
    
        this.makeCards()

        this.cards = this.shuffleCards(this.cards)
        this.createMarket()
    }

    makeCards() {
        const { BASE_GAME_CARDS } = CARDS
        for (let i = 0; i < BASE_GAME_CARDS.length; i++) {
            const { name, description, color, activation_numbers, magnitude, symbol, quantity } = BASE_GAME_CARDS[i]

            for (let i = 0; i < quantity; i++) {
                this.cards.push(new Card(
                    name,
                    description,
                    color,
                    activation_numbers,
                    magnitude,
                    symbol
                ))
            }
        }

    }

    shuffleCards(cards) { //for any number of cards
        let res = [] //indices
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

    createMarket() { //move cards to market
        const {market, cards} = this
        while (market.small.length < 5
           || market.big.length < 5
           || market.purple.length < 3
        ) {
            const currentCard = cards.pop()
            const min = Math.min(currentCard.activation_numbers)
            if (currentCard.color === 'purple' && market.purple.length < 3) {
                market.purple.push(currentCard)
            }
            else if (min <= 6 && market.small.length < 5) {
                market.small.push(currentCard)
            }
            else if (market.big.length < 5) { //min > 6
                market.big.push(currentCard)
            }
            else {
                cards.unshift(currentCard) //put it back
            }
        }
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

    addPlayer(playerId, username) {
        let { players } = this
        players[playerId] = new Player(username)
    }

    changeTurn() {
        // this.currentTurnColor = this.otherColor(this.currentTurnColor)
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