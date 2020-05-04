import React from "react";
import io from "socket.io-client";
import './App.css'
import Game from './Game'
import { Welcome } from './Welcome'
import { Switch, withRouter } from 'react-router-dom';

const socket = io() // can specify 'http://localhost:5000' to remove error

class Codemynames extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: ""
        }
        this.handleSetCurrentUser = this.handleSetCurrentUser.bind(this);
        this.handleSubmitCurrentUser = this.handleSubmitCurrentUser.bind(this);
    }

    handleSetCurrentUser(e) {
        this.setState({ currentUser: e.target.value })
    }
    
    handleSubmitCurrentUser(e) {
        e.preventDefault()
        this.props.history.push("/game")
    }

    render() {
        const {currentUser} = this.state
        return (
            <div>
                <div className="title">Code/\/ames</div>
                <div>{currentUser}</div>
                <Switch className="container-fluid">
                    <Welcome exact path="/" socket={socket} 
                        handleSetCurrentUser={this.handleSetCurrentUser} 
                        currentUser={currentUser} 
                        handleSubmitCurrentUser={this.handleSubmitCurrentUser}
                        />
                    <Game exact path="/game" socket={socket} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(Codemynames);