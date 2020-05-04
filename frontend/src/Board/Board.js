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
        const {cards, makeMove } = this.props
        
        const grid = []
        if (cards) {
            for (let i = 0; i < 5; i++) {
                let rowItems = []
                for (let j = 0; j < 5; j++) {
                    const card = cards[5 * i + j]
                    let color = this.translateColor(card.color)
                    rowItems.push(
                        <div key={j} className="card" onClick={makeMove(5*i+j)} style={card.isRevealed ? {background: color} : {}}>
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