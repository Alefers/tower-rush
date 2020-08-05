import React, {useState} from 'react';


const
    MOVE_NOT = 0,
    MOVE_JUMP = 1,
    MOVE_LEFT = 2,
    MOVE_RIGHT = 3,
    MOVE_DOWN = 4;

const  BattleControls = (props) => {

    const stanceSet = [
        {
            stance: 'attack',
            text: 'Атаковать'
        },
        {
            stance: 'defence',
            text: 'Защищаться'
        },
        {
            stance: 'distance',
            text: 'Разорвать дистанцию'
        }
    ];
    const [stanceSelectOpen, setStanceSelectOpen] = useState(false);
    const toggleStanceSelectOpen = () => {
        setStanceSelectOpen(!stanceSelectOpen);
    }

    const [currentStance, setCurrentStance] = useState(stanceSet[0]);
    const changeStance = (stance) => {
        setCurrentStance(stance);
        toggleStanceSelectOpen();
    }

    const [movementDirection, setMovementDirection] = useState(MOVE_NOT);
    const changeMovementDirection = (direction) => {
        if (movementDirection === direction) {
            setMovementDirection(MOVE_NOT);
        } else {
            setMovementDirection(direction);
        }
    }

    let stances = stanceSet.map((s, idx) => {
        return (
            <div className="btn-wrapper" key={idx}>
                <button
                    type="button"
                    className={'action-btn stance ' + s.stance}
                    title={s.text}
                    onClick={() => changeStance(s)}
                >
                    <i className={'tr-' + s.stance}/>
                </button>
            </div>
        )
    });

    return (
        <>
            <div className="battle-controls">
                {/* top row */}
                <div className="btn-wrapper" />
                <div className="btn-wrapper">
                    <div
                        className={'action-btn movement jump icon-rotate-270 ' + (movementDirection === MOVE_JUMP ? 'selected' : '')}
                        title="Подпрыгнуть"
                        onClick={() => changeMovementDirection(MOVE_JUMP)}
                    >
                        <i className="tr-bordered-arrow"/>
                    </div>
                </div>
                <div className="btn-wrapper" />

                {/* middle row */}
                <div className="btn-wrapper">
                    <div
                        className={'action-btn movement dash-to-left icon-rotate-180 ' + (movementDirection === MOVE_LEFT ? 'selected' : '')}
                        title="Отскочить в лево"
                        onClick={() => changeMovementDirection(MOVE_LEFT)}
                    >
                        <i className="tr-bordered-arrow"/>
                    </div>
                </div>
                <div className="btn-wrapper">
                    <div
                        className={'action-btn stance ' + currentStance.stance}
                        tabIndex="0"
                        title={currentStance.text}
                        onClick={() => toggleStanceSelectOpen()}
                    >
                        <i className={'tr-' + currentStance.stance}/>
                    </div>
                </div>
                <div className="btn-wrapper">
                    <div
                        className={'action-btn movement dash-to-right ' + (movementDirection === MOVE_RIGHT ? 'selected' : '')}
                        title="Отскочить в право"
                        onClick={() => changeMovementDirection(MOVE_RIGHT)}
                    >
                        <i className="tr-bordered-arrow"/>
                    </div>
                </div>

                {/* bottom row */}
                <div className="btn-wrapper">
                    <div
                        className={'action-btn movement lean-down icon-rotate-90 ' + (movementDirection === MOVE_DOWN ? 'selected' : '')}
                        title="Пригнуться"
                        onClick={() => changeMovementDirection(MOVE_DOWN)}
                    >
                        <i className="tr-bordered-arrow"/>
                    </div>
                </div>

                <button className="end-turn">
                    Завершить ход
                </button>

                {stanceSelectOpen && <div className="stance-set">{stances}</div>}
            </div>
        </>
    );
}

export default BattleControls;