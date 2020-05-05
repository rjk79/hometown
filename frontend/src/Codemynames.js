import React from "react";
import io from "socket.io-client";
import './App.css'
import Game from './Game'
import Welcome from './Welcome'
import { Switch } from 'react-router-dom';

const socket = io('http://localhost:5000') // can specify 'http://localhost:5000' to remove error

class Codemynames extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: ""
        }

        this.handleSetCurrentUser = this.handleSetCurrentUser.bind(this);
    }

    handleSetCurrentUser(e) {
        this.setState({ currentUser: e.target.value })
    }
    
    render() {
        const {currentUser} = this.state
        const { handleSetCurrentUser } = this
        return (
            <div>
                <Switch className="container-fluid">
                    <Welcome exact path="/" socket={socket} 
                        currentUser={currentUser}
                        handleSetCurrentUser={handleSetCurrentUser}
                        />
                    <Game exact path="/game" 
                        socket={socket} 
                        currentUser={currentUser}
                        />
                </Switch>
            </div>
        );
    }
}

export default Codemynames;