import React from 'react';

const  Bar = (props) => {
    return (
        <div className={'bar type-' + props.type + (props.oposite ? ' oposite' : '')}>
            <div className="bar-name">{props.text}</div>
            <div className="bar-scale">
                <div className="bar-scale-bg" style={{width: props.current * 100 / props.max}}></div>
            </div>
        </div>
    );
}

export default Bar;