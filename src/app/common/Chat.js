import React from 'react';

const  Chat = ({ messages }) => {
    return (
        <div className="chat">
            {messages.map(m => {
                if (Array.isArray(m)) {
                    return (
                        <div>{m.map(s => <div>{s}</div>)}</div>
                    )
                }
                return <div>{m}</div>
            })}
        </div>
    );
}

export default Chat;