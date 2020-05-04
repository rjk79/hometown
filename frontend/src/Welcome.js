import * as React from 'react';
import './Welcome.css'

export const Welcome = (props) => {
    return (
        <div className="welcome">
            <div className="title">Code/\/ames</div>
            <form onSubmit={props.handleSubmitCurrentUser} >
                <div className="form-group">
                    <input type="text" onChange={props.handleSetCurrentUser} value={props.currentUser} placeholder="Choose Username" className="form-control"/>
                </div>
                <div className="form-group">
                    <input type="text" onChange={props.handleSetGameName} value={props.gameName} placeholder="Join / Create Game Name" className="form-control"/>
                </div>
                <input className="btn btn-primary" type="submit" value="Submit"/>
            </form>
        </div>
    );
};