import React from 'react';
import Target from "./Target";
import BattleControls from "./BattleControls";
import Chat from "../common/Chat";

const  Fight = (props) => {
    return (
        <>
            <div className="fight-room">
                <Target stats={props.player} />
                <BattleControls act={props.act}/>
                <Target oposite={true} stats={props.guard} />
            </div>
            <Chat messages={props.messages} />
        </>
    );
}

export default Fight;