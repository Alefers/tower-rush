const STEP = 'STEP';

let initialState = {
    room: [1,2,3,4]
};

const questReducer = (state = initialState, action) => {

    let stateCopy = {...state};

    switch (action.type) {
        case STEP:

            return stateCopy;
        default:
            return state;
    }
}

export const stepCreator = (action) => ({type: STEP, action: action});

export default questReducer;