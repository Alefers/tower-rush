import React from 'react';

export const
    MOVE_NOT = 0,
    MOVE_JUMP = 1,
    MOVE_LEFT = 2,
    MOVE_RIGHT = 3,
    MOVE_DOWN = 4;

const movements = {
    [MOVE_JUMP]: {
        action: 'jump',
        text: 'Подпрыгнуть',
        angle: 270
    },
    [MOVE_LEFT]: {
        action: 'dash-to-left',
        text: 'Отскочить в лево',
        angle: 180
    },
    [MOVE_RIGHT]: {
        action: 'dash-to-right',
        text: 'Отскочить в право',
        angle: 0
    },
    [MOVE_DOWN]: {
        action: 'lean-down',
        text: 'Пригнуться',
        angle: 90
    }
}

const  ControlButton = (props) => {
    let c = 'action-btn movement ' + movements[props.action].action;
    if (props.selected) {
        c+= ' selected';
    }

    return (
        <div className="btn-wrapper">
            <div
                className={c}
                title={movements[props.action].text}
                onClick={() => props.change(props.action)}
            >
                <i className="tr-bordered-arrow" style={{transform: 'rotate(' + movements[props.action].angle +  'deg)'}}/>
            </div>
        </div>
    );
}

export default ControlButton;