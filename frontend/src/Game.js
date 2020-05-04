import Board from './Board/Board'
import React from "react";
// import io from "socket.io-client";
import './App.css'

// const socket = io('http://localhost:5000')

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
    }

    componentDidMount() {
        this.socket.on("receive message", data => {
            this.setState({ messages: this.state.messages.concat([data]) }, () => {
                let messages = document.getElementsByClassName("messages")[0]
                messages.scrollTop = messages.scrollHeight;
            })
        });
        this.socket.on("receive game", data => {
            debugger
            this.setState({ game: data }, () => console.log(this.state))
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

    render() {
        const { sendMessage, handleSetMessage, resetGame, makeMove } = this
        const { message, messages, game } = this.state
        const messageLis = messages.map((m, i) => <div key={i}>{m.name + ":" + m.message}</div>)
        return (
            <div>                
                <div className="main">
                    <div className="cards-headers">
                        <div>Current Team's Turn: {game && game.currentTurnColor}</div>
                        <Board cards={game && game.cards} 
                            makeMove={makeMove}
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