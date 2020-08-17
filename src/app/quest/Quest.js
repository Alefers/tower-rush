import React from 'react';
import Chat from "../common/Chat";

const  Quest = (props) => {
    return (
        <>
            <div className="quest-room">
                {props.room}
            </div>
            <Chat messages={props.messages} />
        </>
    );
}

export default Quest;