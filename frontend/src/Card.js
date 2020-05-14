import {activationNumberLabel} from './utils'
import './Card.css'

import React, { Component } from 'react';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDescription: false
        }
    }

    buyCard(cardName) {
        const {socket, game} = this.props
        return e => {
            debugger
            const gameId = game.id
            const data = {
                gameId, 
                cardName
            }
            socket.emit('buy card', data)
        }
    }
    
    render() {
        const { name, description, symbol, activation_numbers, cost } = this.props.card
        const {buyable} = this.props
        const { showDescription} = this.state
        let handleClick
        handleClick = buyable ? this.buyCard(name) : () => {}
        let coinCost 
        if (cost) coinCost = <div className="cost">{cost}&cent;</div>
        
        return (
            
            <div 
                onMouseEnter={() => {
                    this.setState({showDescription: true})
                }}
                onMouseLeave={() => this.setState({ showDescription: false })}
                onClick={handleClick}
            >
                <div>{name}</div>
                <div className="description" style={showDescription ? {} : {display: "none"}}><div className="up-triangle"></div>{description}</div>
                <div>{activationNumberLabel(activation_numbers)}</div>
                <div>{symbol}</div>
                {coinCost}
                {/* <div>{quantity}</div> */}
            </div>
            
        );
    }
}

export default Card;