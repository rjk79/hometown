import React, { Component } from 'react';
import './Board.css'
import { translateColor } from '../utils'
import {Card} from '../Card'

class Board extends Component {
    
    render() {
        const {game, makeMove, currentUser } = this.props

        let grid = []
        if (game) {
            const currentUserObject = Object.values(game.players).filter(p => p.username === currentUser)[0]
            const hasTurn = currentUserObject.color === game.currentTurnColor
            const isOver = game.winner
            const categories = ["small", "big", "purple"]
            
            categories.forEach(c => {
                let rowItems = []
                
                game.market[c].map((card, i) => {
                    let color = translateColor(card.color)
                    const canClick = hasTurn && !isOver
                    let borderable = canClick ? "borderable" : ""
                    const clickEffect = canClick ? makeMove(5 * i) : null
                    const style = {}
                    style.background = color 
                    const min = Math.min(...card.activation_numbers)
                    const max = Math.max(...card.activation_numbers)
                    let activationNumberLabel = ""
                    if (isFinite(min)) {
                        activationNumberLabel += min
                        if (isFinite(max) && min !== max) {
                            activationNumberLabel += " - "
                            activationNumberLabel += max
                        }
                    }

                    rowItems.push(
                        <div key={i} className={"card " + borderable} onClick={clickEffect} style={style}>
                            <div>
                                <div>{card.name}</div>
                                <div>{card.description}</div>
                                <div>{activationNumberLabel}</div>
                                <div>{card.symbol}</div>
                                <div>{card.quantity}</div>
                            </div>
                        </div>
                    )
                })
                
                grid.push(
                    <div className="card-row">
                        {rowItems}
                    </div>
                )

            })
        }
        
        return (
            <ul className="card-container">
                <div className="title">Market:</div>
                {grid}
            </ul>
        );
    }
}

export default Board;