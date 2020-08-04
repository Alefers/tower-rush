import React from 'react';
import Bar from "../common/Bar";

const  Target = (props) => {
    return (
        <div className={'target' + (props.oposite ? ' oposite' : '')}>
            <div className="stats">
                <Bar type="essence" max={props.stats.maxE} current={props.stats.currentE} text="Сущность" oposite={props.oposite}/>
                <Bar type="stamina" max={props.stats.maxS} current={props.stats.currentS} text="Выносливость" oposite={props.oposite}/>
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