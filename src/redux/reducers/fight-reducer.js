let initialState = {
    player: {
        maxHealth: 10,
        currentHealth: 10,
        maxStamina: 100,
        currentStamina: 100,
        str: 1,
        vit: 1,
        dex: 1,
        freePoints: 10
    }
};

const fightReducer = (state = initialState, action) => {
    return state;
}

export default fightReducer;