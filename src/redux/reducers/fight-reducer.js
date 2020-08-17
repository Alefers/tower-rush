import {STANCE_DEFENCE, STANCE_ATTACK, STANCE_DISTANCE} from "../../app/fight/BattleControls";

const STEP = 'STEP';

let initialState = {
    player: {
        maxEssence: 30,
        currentEssence: 25,
        str: 5,
        vit: 5,
        agi: 5,
        skills: {
            twoHandedSword: 1,
            twoHandedAxe: 1,
            twoHandedMace: 1,
            oneHandedSword: 1,
            oneHandedAxe: 1,
            oneHandedMace: 1,
            dualWield: 1,
            shield: 1,
            fist: 1
        }
    },
    guard: {
        maxEssence: 40,
        currentEssence: 37,
        str: 12,
        vit: 17,
        agi: 5
    },
    messages: [],
    battle: {
        step: 0,
        player: {
            lastStance: null,
        },
        guard: {
            lastStance: null,
            combo: {
                active: false,
                step: 0,
                name: null
            },
            state: {
                name: null,
                stepsLeft: 0
            }
        }
    }
};

// Математика пока на нуле, коэфициенты и формулы только для запуска основных просчётов.

const isReactFirst = (pAgi, gAgi) => {
    const border = 0.5 + (pAgi - gAgi) * 0.003;
    const rand = Math.random();

    return rand < border;
}

const calcGuardStance = (guard, battle) => {
    const rand = Math.random();
    const lastStance = battle.player.lastStance;
    if (lastStance === STANCE_ATTACK) {
        return (rand < 70) ? STANCE_DEFENCE : STANCE_ATTACK;
    }
    if (lastStance === STANCE_DEFENCE || lastStance === STANCE_DISTANCE) {
        return STANCE_ATTACK;
    }
    return (rand < 50) ? STANCE_DEFENCE : STANCE_ATTACK;
};

const fightReducer = (state = initialState, action) => {

    let stateCopy = {...state};

    switch (action.type) {
        case STEP:
            const playerFirst = isReactFirst(state.player.agi, state.guard.agi);
            if (playerFirst) {
                console.log(1);
            }
            return stateCopy;
        default:
            return state;
    }
}

export const stepCreator = (action) => ({type: STEP, action: action});

export default fightReducer;