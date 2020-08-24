import React from 'react';

const  Bar = (props) => {
    return (
        <div className={'bar ' + (props.oposite ? ' oposite' : '')}>
            <div className="bar-name">{`${props.text} (${props.stat.current}/${props.stat.max})`}</div>
            <div className="bar-scale" title={props.stat.current + '/' + props.stat.max}>
                <div className={'bar-scale-bg ' + props.type} style={{width: props.stat.current * 100 / props.stat.max + '%'}}></div>
            </div>
        </div>
    );
}

export default Bar;