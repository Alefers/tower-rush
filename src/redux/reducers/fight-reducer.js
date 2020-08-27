import {STANCE_DEFENCE, STANCE_ATTACK, STANCE_DISTANCE, STANCE_ACTION, stanceSet} from "../../app/fight/BattleControls";
import trMath from "../../mixin/math";

const
    ATTACK_DODGED = 0,
    ATTACK_BLOCKED = 1,
    ATTACK_SUCCESS = 2;

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
    const rand = Math.random() * 100;
    const lastStance = battle.player.lastStance;
    if (lastStance === STANCE_ATTACK) {
        return (rand < 70) ? STANCE_DEFENCE : STANCE_ATTACK;
    }
    if (lastStance === STANCE_DEFENCE || lastStance === STANCE_DISTANCE) {
        return STANCE_ATTACK;
    }

    return (rand < 50) ? STANCE_DEFENCE : STANCE_ATTACK;
};

const isDodged = (attacker, victim) => {
    const rand = Math.random() * 100;
    const agiDif = victim.agi - attacker.agi
    const weaponSkillDif = attacker.skills[attacker.currentWeapon] - victim.skills[victim.currentWeapon];
    let chanceToDodge = 5 + (agiDif > 0 ?? agiDif * 0.75) - (weaponSkillDif > 0 ?? weaponSkillDif * 0.8);
    chanceToDodge = trMath.saveResultTruncation(5, 95, chanceToDodge);

    return rand < chanceToDodge;
}

const isBlocked = (attacker, victim, currentStep) => {
    const rand = Math.random() * 100;
    const weaponSkillDif = attacker.skills[attacker.currentWeapon] - victim.skills[victim.currentWeapon];
    let chanceToBlock = 10 + (currentStep.stance[victim.type] === STANCE_DEFENCE ?? 50) + ((currentStep.actFirst === attacker.type) ?? 5) - (weaponSkillDif > 0 ?? weaponSkillDif * 0.8);
    chanceToBlock = trMath.saveResultTruncation(5, 95, chanceToBlock);

    return rand < chanceToBlock;
}

const calcDamage = (attacker, victim, currentStep) => {

    return 3;
}

const calcAttackersStep = (attacker, victim, currentStep) => {

    // victim chance to dodge
    if (isDodged(attacker, victim)) {
        return {result: ATTACK_DODGED};
    } else {
        // victim chance to block
        if (isBlocked(attacker, victim, currentStep)) {
            return {result: ATTACK_BLOCKED};
        } else {
            // victim damage taken
            let result = ATTACK_SUCCESS;
            let damage = calcDamage(attacker, victim, currentStep);

            victim.essence.current -= damage;
            if (victim.essence.current < 0) {
                victim.essence.current = 0;
            }

            return {
                result,
                damage,
                essence: {
                    current: victim.essence.current,
                    max: victim.essence.max
                }
            }
        }
    }
}

const stepResultToMessages = (stepResult, currentStep) => {
    const messages = [];

    messages.push(`Действие`);
    messages.push(`Действие`);

    return messages;
}

const fightReducer = (state = initialState, action) => {

    let stateCopy = {...state};

    switch (action.type) {
        case STEP:
            const actFirst = getActFirst(stateCopy.player.agi, stateCopy.guard.agi);
            const actSecond = (actFirst === 'player' ? 'guard' : 'player');
            const currentStep = {
                actFirst,
                actSecond,
                stance: {
                    player: action.data.stance,
                    guard: calcGuardStance(stateCopy.guard, stateCopy.battle)
                }
            }
            const stepResult = {first: {}, second: {}, quick: {}};
            let oneIsDead = false;

            switch (currentStep.stance[actFirst]) {
                case STANCE_ATTACK:
                    stepResult.first = calcAttackersStep(stateCopy[actFirst], stateCopy[actSecond], currentStep);
                    oneIsDead = stateCopy[actSecond].essence.current === 0;
                    break;
                case STANCE_DEFENCE:


                    break;
                case STANCE_DISTANCE:


                    break;
                case STANCE_ACTION:


                    break;
                default:
            }

            if (!oneIsDead) {
                switch (currentStep.stance[actSecond]) {
                    case STANCE_ATTACK:
                        stepResult.second = calcAttackersStep(stateCopy[actSecond], stateCopy[actFirst], currentStep);
                        oneIsDead = stateCopy[actFirst].essence.current === 0;
                        break;
                    case STANCE_DEFENCE:


                        break;
                    case STANCE_DISTANCE:


                        break;
                    case STANCE_ACTION:


                        break;
                    default:
                }
            }
            console.log(actFirst + ': ' + JSON.stringify(stepResult.first));
            console.log(actSecond + ': ' + JSON.stringify(stepResult.second));
            stateCopy.messages.push(stepResultToMessages(currentStep, stepResult));

            if (!oneIsDead) {
                stateCopy.battle.step++;
                stateCopy.battle.player.lastStance = currentStep.stance.player;
                stateCopy.battle.guard.lastStance = currentStep.stance.guard;
            }

            return stateCopy;
        default:
            return state;
    }
}

export const stepCreator = (action) => ({type: STEP, data: action});

export default fightReducer;