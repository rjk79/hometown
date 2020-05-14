import Board from './Board/Board'
import React from "react";
// import io from "socket.io-client";
import './App.css'
import {translateColor} from './utils'
import { Hand } from './Hand';

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.socket = this.props.socket
        this.state = {
            messages: [],
            message: "",
            game: null,
        }
        this.handleSetMessage = this.handleSetMessage.bind(this)
        this.sendMessage = this.sendMessage.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.makeMove = this.makeMove.bind(this);
        this.changeTurn = this.changeTurn.bind(this);
        this.rollDice = this.rollDice.bind(this);
    }

    componentDidMount() {
        this.socket.on("receive message", data => {
            this.setState({ messages: this.state.messages.concat([data]) }, () => {
                let messages = document.getElementsByClassName("messages")[0]
                messages.scrollTop = messages.scrollHeight;
            })
        });
        this.socket.on("receive game", data => {
            this.setState({ game: data })
        });
    }

    componentWillUnmount() {
        this.socket.off('receive message')
        this.socket.off('receive game')
    }

    sendMessage(e) {
        const {id} = this.state.game
        const {message} = this.state
        e.preventDefault()
        this.socket.emit('send message', {message, id})
        this.setState({ message: "" })
    }

    handleSetMessage(e) {
        this.setState({ message: e.target.value })
    }

    resetGame() {
        const {id} = this.state.game
        this.socket.emit('reset game', id)
    }

    makeMove(idx) {
        const {id} = this.state.game
        return () => {
            this.socket.emit('make move', {idx, id})
        }
    }

    changeTurn() {
        const { id } = this.state.game
        this.socket.emit('opt to change turn', { gameId: id })
    }

    rollDice() {
        const { id } = this.state.game
        this.socket.emit('roll dice', { gameId: id })
    }

    render() {
        const { sendMessage, handleSetMessage, resetGame, makeMove, socket } = this
        const { message, messages, game } = this.state
        const { currentUser } = this.props

        const messageLis = messages.map((m, i) => 
            <div key={i}><strong>{m.name}</strong>{":" + m.message}</div>
        )
        let currentUserObject
        let yourColor
        let gameName
        let changeTurnButton
      
        let hands
        if (game) {
            currentUserObject = Object.values(game.players).filter(p => p.username === currentUser)[0]
            yourColor = game ? currentUserObject.color : null
            gameName = game ? game.id : null
            // changeTurnButton = game.currentTurnColor === yourColor ? <button className="btn btn-info" onClick={this.changeTurn}>End Your Team's Turn</button> : null
            
            hands = Object.values(game.players).map((p, i) => (
                <Hand player={p} key={i}/>
            ))
        }
        return (
            <div className="App">                
                <div className="main">
                    <div className="game">
                        <div className="game-codes">
                            <div>Room Code: {gameName}</div>
                            <div>Your Username: {currentUser}</div>
                        </div>
                        <div className="game-controls">
                            <button className="btn btn-info roll-dice" onClick={this.rollDice}>Roll Dice <i className="fas fa-dice"></i></button>
                        </div>
                        <div className="color-reminder" >
                            <div>It's Somebody's Turn... </div>
                            {changeTurnButton}
                        </div>

                        <div>
                            {hands}
                        </div>

                        <Board game={game} 
                            makeMove={makeMove}
                            currentUser={currentUser}
                            socket={socket}
                        />
                        
                    </div>
                    <div className="messaging-controls">
                        <div className="messages">
                            <div className="title">Chat</div>
                            {messageLis}
                        </div>
                        <form onSubmit={sendMessage}>
                            <input type="text" onChange={handleSetMessage} value={message} placeholder="Message"/>
                            <input type="submit" value="Send Message" className="btn btn-primary send" />
                        </form>
                        <button className="btn btn-warning" onClick={resetGame}>New Game</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;