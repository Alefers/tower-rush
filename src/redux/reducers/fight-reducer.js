import {STANCE_DEFENCE, STANCE_ATTACK, STANCE_DISTANCE} from "../../app/fight/BattleControls";

const STEP = 'STEP';

let initialState = {
    player: {
        essence: {
            max: 30,
            current: 30
        },
        stamina: {
            max: 50,
            current: 50
        },
        str: 5,
        vit: 5,
        agi: 5,
        damage: {
            min: 5,
            max: 8
        },
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
        essence: {
            max: 30,
            current: 30
        },
        stamina: {
            max: 50,
            current: 50
        },
        str: 12,
        vit: 17,
        agi: 5,
        damage: {
            min: 5,
            max: 8
        },
        currentWeapon: 'twoHandedSword',
        skills: {
            twoHandedSword: 1,
        }
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

const isDodged = (attacker, victim, battle) => {
    const rand = Math.random();
    const agiDif = victim.agi - attacker.agi
    const weaponSkillDif = attacker.skills[attacker.currentWeapon] - victim.skills[victim.currentWeapon];
    let chanceToDodge = 0.05 + (agiDif > 0 ? agiDif * 0.0075 : 0) - (weaponSkillDif > 0 ? weaponSkillDif * 0.008 : 0);
    if (chanceToDodge > 0.95) {
        chanceToDodge = 0.95;
    }
    if (chanceToDodge < 0.05) {
        chanceToDodge = 0.05;
    }
    return rand < chanceToDodge;
}

const isBlocked = (attacker, victim, battle) => {
    const rand = Math.random();
}

const fightReducer = (state = initialState, action) => {

    let stateCopy = {...state};

    switch (action.type) {
        case STEP:
            const playerFirst = isReactFirst(state.player.agi, state.guard.agi);
            const guardStance = calcGuardStance(state.guard, state.battle);
            const position = [action.data.stance, guardStance].join('');
            if (playerFirst) {
                switch (position) {
                    case '00':
                        break;

                }
            } else {

            }
            return stateCopy;
        default:
            return state;
    }
}

export const stepCreator = (action) => ({type: STEP, data: action});

export default fightReducer;