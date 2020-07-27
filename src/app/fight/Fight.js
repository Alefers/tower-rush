import React from 'react';
import Target from "./Target";

const  Fight = () => {
    return (
        <div className="fight-room">
            <Target type="player"/>
            <Target type="guarg"/>
        </div>
    );
}

export default Fight;