import React, {useState} from 'react';

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

    let stances = stanceSet.map((s, idx) => {
        return (
            <button
                type="button"
                className={'select-stance-btn stance-' + s.stance}
                title={s.text}
                key={idx}
                onClick={() => changeStance(s)}
            >
                <i className={'tr-' + s.stance}/>
            </button>
        )
    });

    return (
        <div className="battle-controls">
            <div className="action-btn jump icon-rotate-270" title="Подпрыгнуть"><i className="tr-bordered-arrow" /></div>
            <div className="action-btn dash-to-right" title="Отскочить в право"><i className="tr-bordered-arrow" /></div>
            <div className="action-btn dash-to-left icon-rotate-180" title="Отскочить в лево"><i className="tr-bordered-arrow" /></div>
            <div className="action-btn lean-down icon-rotate-90" title="Пригнуться"><i className="tr-bordered-arrow" /></div>
            <div
                className="stance-btn"
                tabIndex="0"
                title={currentStance.text}
                onClick={() => toggleStanceSelectOpen()}
            ><i className={'tr-' + currentStance.stance} /></div>
            {stanceSelectOpen && <div className="stance-set">{stances}</div>}
        </div>
    );
}

export default BattleControls;