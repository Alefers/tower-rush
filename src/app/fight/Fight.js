import React from 'react';
import Target from "./Target";
import BattleControls from "./BattleControls";
import Chat from "../common/Chat";

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
        <>
            <div className="fight-room">
                <Target stats={playerStats} />
                <BattleControls />
                <Target oposite={true} stats={guardStats} />
            </div>
            <Chat />
        </>
    );
}

export default Fight;