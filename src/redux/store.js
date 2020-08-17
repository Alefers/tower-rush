import {combineReducers, createStore} from "redux";
import fightReducer from "./reducers/fight-reducer";
import questReducer from "./reducers/quest-reducer";


let reducers = combineReducers({
    fightReducer,
    questReducer
});

let store = createStore(reducers);

export default store;