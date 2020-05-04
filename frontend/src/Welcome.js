import * as React from 'react';

export const Welcome = (props) => {
    return (
        <div>
            <form onSubmit={props.handleSubmitCurrentUser}>
                <div className="form-group">
                    <input type="text" onChange={props.handleSetCurrentUser} value={props.currentUser} />
                </div>
            </form>
        </div>
    );
};