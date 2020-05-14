import * as React from 'react';
import {translateColor} from './utils'
import './Hand.css'
import Card from './Card'

export const Hand = (props) => {
    const {player} = props

    return (
        <div>
            <div>
                <div className="title">Coins: {player.coins}</div>
                <div className="title">Your Hand:</div>
                <div className="hand-cards">
                    {player.hand.map((c, i) => {
                        const style = {}
                        style.background = translateColor(c.color)

                        return (
                        <div key={i} className={"card"} style={style}>
                            <Card card={c} buyable={false} />
                        </div>
                    )})}
                </div>
            </div>
        </div>
    );
};