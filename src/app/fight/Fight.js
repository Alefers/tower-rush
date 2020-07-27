import React from 'react';
import Target from "./Target";

let playerStats = {
    maxH: 20,
    currentH: 17,
    maxS: 100,
    currentS: 82
}

let guardStats = {
    maxH: 10,
    currentH: 7,
    maxS: 100,
    currentS: 60
}

const  Fight = (props) => {
    return (
        <div className="fight-room">
            <Target stats={playerStats}/>
            <Target oposite={true} stats={guardStats}/>
        </div>
    );
}

export default Fight;