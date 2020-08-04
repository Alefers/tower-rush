import React from 'react';
import Target from "./Target";
import BattleControls from "./BattleControls";

let playerStats = {
    maxE: 20,
    currentE: 17,
    maxS: 100,
    currentS: 82
}

let guardStats = {
    maxE: 10,
    currentE: 7,
    maxS: 100,
    currentS: 60
}

const  Fight = (props) => {
    return (
        <div className="fight-room">
            <Target stats={playerStats}/>
            <BattleControls/>
            <Target oposite={true} stats={guardStats}/>
        </div>
    );
}

export default Fight;