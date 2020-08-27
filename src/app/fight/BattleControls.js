import React, {useState} from 'react';
import ControlButton, {MOVE_NOT, MOVE_DOWN, MOVE_RIGHT, MOVE_LEFT, MOVE_JUMP} from "./ControlButton";

export const
    STANCE_DEFENCE = 0,
    STANCE_ATTACK = 1,
    STANCE_DISTANCE = 2,
    STANCE_ACTION = 3;

export const stanceSet = [
    {
        type: STANCE_DEFENCE,
        stance: 'defence',
        text: 'Защищаться'
    },
    {
        type: STANCE_ATTACK,
        stance: 'attack',
        text: 'Атаковать'
    },
    {
        type: STANCE_DISTANCE,
        stance: 'distance',
        text: 'Разорвать дистанцию'
    },
    {
        type: STANCE_ACTION,
        stance: 'action',
        text: 'Совершить действие'
    },
];

const  BattleControls = (props) => {

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

    const makeAStep = () => {
        props.step({
            movementDirection,
            stance: currentStance.type
        });
    }

    let stances = stanceSet.map((s) => {
        return (
            <div className="btn-wrapper" key={s.type}>
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
                <ControlButton action={MOVE_JUMP} change={changeMovementDirection} selected={movementDirection === MOVE_JUMP}/>
                <div className="btn-wrapper" />

                {/* middle row */}
                <ControlButton action={MOVE_LEFT} change={changeMovementDirection} selected={movementDirection === MOVE_LEFT}/>
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
                <ControlButton action={MOVE_RIGHT} change={changeMovementDirection} selected={movementDirection === MOVE_RIGHT}/>

                {/* bottom row */}
                <div className="btn-wrapper" />
                <ControlButton action={MOVE_DOWN} change={changeMovementDirection} selected={movementDirection === MOVE_DOWN}/>
                <div className="btn-wrapper" />

                <button className="end-turn" onClick={makeAStep}>
                    Завершить ход
                </button>

                {stanceSelectOpen && <div className="stance-set">{stances}</div>}
            </div>
        </>
    );
}

export default BattleControls;