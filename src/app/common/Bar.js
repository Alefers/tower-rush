import React from 'react';

const  Bar = (props) => {
    return (
        <div className={'bar ' + (props.oposite ? ' oposite' : '')}>
            <div className="bar-name">{`${props.text} (${props.current}/${props.max})`}</div>
            <div className="bar-scale" title={props.current + '/' + props.max}>
                <div className={'bar-scale-bg ' + props.type} style={{width: props.current * 100 / props.max + '%'}}></div>
            </div>
        </div>
    );
}

export default Bar;