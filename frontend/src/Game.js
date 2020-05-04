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
        this.startGame = this.startGame.bind(this);
        this.makeMove = this.makeMove.bind(this);
    }

    componentDidMount() {
        this.socket.on("receive message", data => {
            this.setState({ messages: this.state.messages.concat([data]) })
        });
        this.socket.on("receive game", data => {
            this.setState({ game: data }, () => console.log(this.state))
        });
    }

    componentWillUnmount() {
        this.socket.off('receive message')
        this.socket.off('receive game')
    }

    sendMessage(e) {
        e.preventDefault()
        this.socket.emit('send message', this.state.message)
        this.setState({ message: "" })
    }

    handleSetMessage(e) {
        this.setState({ message: e.target.value })
    }

    startGame() {
        this.socket.emit('start game')
    }

    makeMove(idx) {
        return () => {
            this.socket.emit('make move', idx)
        }
    }

    render() {
        const { sendMessage, handleSetMessage, startGame, makeMove } = this
        const { message, messages, game } = this.state
        const messageLis = messages.map((m, i) => <div key={i}>{m.name + ":" + m.message}</div>)
        return (
            <div>                
                <div className="main">
                    <Board cards={game && game.cards} 
                        makeMove={makeMove}
                    />
                    <div className="messaging-controls">
                        <div className="messages">
                            <div className="title">Chat</div>
                            {messageLis}
                        </div>
                        <form onSubmit={sendMessage}>
                            <input type="text" onChange={handleSetMessage} value={message} />
                            <input type="submit" value="Send" className="btn btn-primary send" />
                        </form>
                        <button onClick={startGame}>New Game</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game;