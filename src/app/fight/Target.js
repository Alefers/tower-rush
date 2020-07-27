import React from 'react';
import Bar from "../common/Bar";

const  Target = (props) => {
    return (
        <div className={'target' + (props.oposite ? ' oposite' : '')}>
            <div className="stats">
                <Bar type="health" max={props.maxH} current={props.currentH} text="Health" oposite={props.oposite}/>
                <Bar type="stamina" max={props.maxS} current={props.currentS} text="Stamina" oposite={props.oposite}/>
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