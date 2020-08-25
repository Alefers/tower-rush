import {STANCE_DEFENCE, STANCE_ATTACK, STANCE_DISTANCE} from "../../app/fight/BattleControls";
import {Gauss} from "../../mixin/math";

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

const gauss0 = new Gauss();

const saveResultTruncation = (min, max, value) => {
    if (min > max || value > max) {
        return max;
    }
    if (value < min) {
        return min;
    }
    return value;
}

const isReactFirst = (pAgi, gAgi) => {
    const rand = Math.random() * 100;
    const border = 50 + (pAgi - gAgi) * 0.3;

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
    const rand = Math.random() * 100;
    const agiDif = victim.agi - attacker.agi
    const weaponSkillDif = attacker.skills[attacker.currentWeapon] - victim.skills[victim.currentWeapon];
    let chanceToDodge = 5 + (agiDif > 0 ?? agiDif * 0.75) - (weaponSkillDif > 0 ?? weaponSkillDif * 0.8);
    chanceToDodge = saveResultTruncation(5, 95, chanceToDodge);

    return rand < chanceToDodge;
}

const isBlocked = (attacker, attackerFirst, victim, victimStance, battle) => {
    const rand = Math.random() * 100;
    const weaponSkillDif = attacker.skills[attacker.currentWeapon] - victim.skills[victim.currentWeapon];
    let chanceToBlock = 10 + (victimStance === STANCE_DEFENCE ?? 50) + (attackerFirst ?? 5) - (weaponSkillDif > 0 ?? weaponSkillDif * 0.8);
    chanceToBlock = saveResultTruncation(5, 95, chanceToBlock);

    return rand < chanceToBlock;
}

const calcDamage = (attacker, attackerFirst, victim, victimStance, battle) => {

    return 3;
}

const fightReducer = (state = initialState, action) => {

    let stateCopy = {...state};

    switch (action.type) {
        case STEP:
            const playerFirst = isReactFirst(state.player.agi, state.guard.agi);
            const playerStance = action.data.stance;
            const guardStance = calcGuardStance(state.guard, state.battle);
            const position = [playerStance, guardStance].join('');
            for (let i = 0; i < 10; i++) {
                console.log(gauss0.next());
            }
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