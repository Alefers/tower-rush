const ACT = 'ACT';

let initialState = {
    player: {
        level: 1,
        maxEssence: 30,
        currentEssence: 25,
        str: 5,
        vit: 5,
        dex: 5,
        freePoints: 10,
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
        level: 6,
        maxEssence: 40,
        currentEssence: 37,
        str: 12,
        vit: 17,
        dex: 5
    },
    messages: []
};

const fightReducer = (state = initialState, action) => {

    let stateCopy = {...state};

    switch (action.type) {
        case ACT:
            console.log(action.action);
            return stateCopy;
        default:
            return state;
    }
}

export const actCreator = (action) => ({type: ACT, action: action});

export default fightReducer;