import React, { Component } from 'react';
import './Board.css'

class Board extends Component {
    translateColor(color) {
        let res 
        switch(color) {
            case "red":
                res = "lightcoral"
                break
            case "blue":
                res = "lightblue"
                break
            case "black":
                res = "rgb(15, 15, 15)"
                break
            case "white":
                res = "rgb(235, 235, 235)"
                break
            default:
        }
        return res
    }
    render() {
        const {game, makeMove, currentUser } = this.props
        const cards = game && game.cards

        
        const grid = []
        if (cards) {
            const currentUserObject = Object.values(game.players).filter(p => p.username === currentUser)[0]
            const isSpymaster = currentUserObject.isSpymaster
            const hasTurn = currentUserObject.color === game.currentTurnColor

            for (let i = 0; i < 5; i++) {
                let rowItems = []
                for (let j = 0; j < 5; j++) {
                    const card = cards[5 * i + j]
                    let color = this.translateColor(card.color)
                    let borderable = card.isRevealed || !hasTurn ? "" : "borderable"
                    const clickEffect = hasTurn && !card.isRevealed ? makeMove(5 * i + j) : null

                    const style = {}
                    if (card.isRevealed || isSpymaster) style.background = color 
                    if (isSpymaster && !card.isRevealed) style.filter = "brightness(50%)"

                    rowItems.push(
                        <div key={j} className={"card " + borderable} onClick={clickEffect} style={style}>
                            <div>
                                {card.word}
                            </div>
                        </div>)
                }
                grid.push(
                    <div key={i} className="card-row">
                        {rowItems}
                    </div>
                )
            }
        }
        return (
            <ul className="card-container">
                {grid}
            </ul>
        );
    }
}

export default Board;