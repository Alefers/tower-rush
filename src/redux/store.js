import {combineReducers, createStore} from "redux";
import fightReducer from "./reducers/fight-reducer";


let reducers = combineReducers({
    fightReducer
});

let store = createStore(reducers);

export default store;