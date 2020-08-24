import React from 'react';
import Bar from "../common/Bar";

const  Target = (props) => {
    return (
        <div className={'target' + (props.oposite ? ' oposite' : '')}>
            <div className="stats">
                <Bar type="essence" stat={props.stats.essence} oposite={props.oposite} text="Эссенция" />
                <Bar type="stamina" stat={props.stats.stamina} oposite={props.oposite} text="Усталость"/>
            </div>
            <div className="equipment">
                <img src="/img/target.png" alt="Equipment"/>
                <div className="head"/>
                <div className="shoulders"/>
                <div className="chest"/>
                <div className="left-hand"/>
                <div className="right-hand"/>
                <div className="sash"/>
                <div className="legs"/>
                <div className="foot"/>
            </div>
        </div>
    );
}

export default Target;