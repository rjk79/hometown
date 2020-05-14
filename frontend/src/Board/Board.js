import React, { Component } from 'react';
import './Board.css'
import { translateColor } from '../utils'
import Card from '../Card'

class Board extends Component {
    
    render() {
        const {game, makeMove, currentUser, socket } = this.props

        let grid = []
        if (game) {
            const currentUserObject = Object.values(game.players).filter(p => p.username === currentUser)[0]
            const hasTurn = currentUserObject.socketId === game.turnOrder[game.currentTurnIdx]
            const isOver = game.winner
            const categories = ["small", "big", "purple"]
            debugger
            categories.forEach((c, idx) => {
                let rowItems = game.market[c].map((card, i) => {
                    const canClick = hasTurn && !isOver
                    let borderable = canClick ? "borderable" : ""
                    const clickEffect = canClick ? makeMove(5 * i) : null
                    let color = translateColor(card.color)
                    const style = {}
                    style.background = color 

                    return (
                        <div 
                            key={i}
                            className="card"
                            onClick={clickEffect}
                            style={style}
                        >
                            <Card 
                                card={card}
                                socket={socket}
                                game={game}
                                buyable={true}
                            />
                        </div>
                    )
                })
                
                grid.push(
                    <div className="card-row" key={idx}>
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