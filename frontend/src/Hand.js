import * as React from 'react';
import {translateColor} from './utils'

export const Hand = (props) => {
    const {player} = props
    
    return (
        <div>
            <div>
                <div className="title">Player Name: {player.username}</div>
                {player.hand.map((c, i) => {
                    const style = {}
                    style.background = translateColor(c.color)
                    return (
                    <div key={i} className={"card"} style={style}>
                        <div>
                            <div>{c.name}</div>
                            <div>{c.description}</div>
                            <div>{c.activation_numbers}</div>
                            <div>{c.symbol}</div>
                            <div>{c.quantity}</div>
                        </div>
                    </div>
                )})}
            </div>
        </div>
    );
};