import React, { Component } from 'react';
import './Welcome.css'
import { withRouter} from 'react-router-dom';

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gameName: "",
        }

        this.handleSetGameName = this.handleSetGameName.bind(this);
        this.handleSubmitCurrentUser = this.handleSubmitCurrentUser.bind(this);
    }

    handleSetGameName(e) {
        this.setState({ gameName: e.target.value })
    }

    handleSubmitCurrentUser(e) {
        const { gameName } = this.state
        const {currentUser, socket} = this.props
        e.preventDefault()
        if (!currentUser.length || !gameName.length) return;
        socket.emit('join lobby', { gameName, currentUser })
        this.props.history.push("/game")
    }

    render() {
        const {props, handleSetGameName, handleSubmitCurrentUser} = this
        const {gameName} = this.state

        return (
            <div className="welcome">
                <div className="title">#ometown</div>
                <form onSubmit={handleSubmitCurrentUser} >
                    <div className="form-group">
                        <input type="text" onChange={props.handleSetCurrentUser} value={props.currentUser} placeholder="Choose Username" className="form-control" />
                    </div>
                    <div className="form-group">
                        <input type="text" onChange={handleSetGameName} value={gameName} placeholder="Join / Create Room Code" className="form-control" />
                    </div>

                    <input className="btn btn-primary" type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default withRouter(Welcome);