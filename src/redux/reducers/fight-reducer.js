import {STANCE_DEFENCE, STANCE_ATTACK, STANCE_DISTANCE} from "../../app/fight/BattleControls";
import trMath from "../../mixin/math";

const
    ATTACK_DODGED = 0,
    ATTACK_BLOCKED = 1,
    ATTACK_SECCESS = 2,
    ATTACKER_DEAD = 3;

const STEP = 'STEP';

let initialState = {
    player: {
        type: 'player',
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
        type: 'guard',
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

const getActFirst = (playerAgi, guardAgi) => {
    const rand = Math.random() * 100;
    const border = 50 + (playerAgi - guardAgi) * 0.3;

    return rand < border ? 'player' : 'guard';
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

const isDodged = (attacker, victim, battle = {}) => {
    const rand = Math.random() * 100;
    const agiDif = victim.agi - attacker.agi
    const weaponSkillDif = attacker.skills[attacker.currentWeapon] - victim.skills[victim.currentWeapon];
    let chanceToDodge = 5 + (agiDif > 0 ?? agiDif * 0.75) - (weaponSkillDif > 0 ?? weaponSkillDif * 0.8);
    chanceToDodge = trMath.saveResultTruncation(5, 95, chanceToDodge);

    return rand < chanceToDodge;
}

const isBlocked = (attacker, actFirst, victim, victimStance, battle = {}) => {
    const rand = Math.random() * 100;
    const weaponSkillDif = attacker.skills[attacker.currentWeapon] - victim.skills[victim.currentWeapon];
    let chanceToBlock = 10 + (victimStance === STANCE_DEFENCE ?? 50) + ((actFirst === attacker.type) ?? 5) - (weaponSkillDif > 0 ?? weaponSkillDif * 0.8);
    chanceToBlock = trMath.saveResultTruncation(5, 95, chanceToBlock);

    return rand < chanceToBlock;
}

const calcDamage = (attacker, actFirst, victim, victimStance, battle = {}) => {

    return 3;
}

const isDead = (victim, damage) => {
    return victim.essence.current <= damage;
}

const calcAttackersStep = (attacker, actFirst, victim, victimStance) => {
    let stepResult = {
        attacker: attacker.type
    };

    // victim chance to dodge
    if (isDodged(attacker, victim)) {
        stepResult.type = ATTACK_DODGED;
    } else {
        // victim chance to block
        if (isBlocked(attacker, actFirst, victim, victimStance)) {
            stepResult.type = ATTACK_BLOCKED;
        } else {
            // victim damage taken
            stepResult.type = ATTACK_SECCESS;
            stepResult.value = calcDamage(attacker, actFirst, victim, victimStance);
        }
    }

    return stepResult;
}

const fightReducer = (state = initialState, action) => {

    let stateCopy = {...state};

    switch (action.type) {
        case STEP:
            const actFirst = getActFirst(state.player.agi, state.guard.agi);
            const playerStance = action.data.stance;
            const guardStance = calcGuardStance(state.guard, state.battle);
            const position = [playerStance, guardStance].join('');
            let stepResultList = {};

            switch (position) {
                case '11': // both attack stance
                    stepResultList.first = calcAttackersStep(state.player, actFirst, state.guard, guardStance);

                    if (stepResultList.first.type === ATTACK_SECCESS && isDead(state.guard, stepResultList.first.value)) {
                        break;
                    }

                    stepResultList.second = calcAttackersStep(state.guard, actFirst, state.player, playerStance);

                    // TODO: calc quickStrike

                    break;

                case '01':
                case '10':

                    stepResultList.first = calcAttackersStep(state.player, actFirst, state.guard, guardStance);

                    if (stepResultList.first.type === ATTACK_SECCESS && isDead(state.guard, stepResultList.first.value)) {
                        break;
                    }

                    stepResultList.second = calcAttackersStep(state.guard, actFirst, state.player, playerStance);

                    // TODO: calc quickStrike

                    break;
            }

            return stateCopy;
        default:
            return state;
    }
}

export const stepCreator = (action) => ({type: STEP, data: action});

export default fightReducer;