import Fight from "./Fight";
import {connect} from "react-redux";
import {stepCreator} from "../../redux/reducers/fight-reducer";

let mapStateToProps = (state) => {
    return {
        player: state.fightReducer.player,
        guard: state.fightReducer.guard,
        messages: state.fightReducer.messages
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        step: (action) => {
            dispatch(stepCreator(action));
        }
    }
}

const  FightContainer = connect(mapStateToProps, mapDispatchToProps)(Fight);

export default FightContainer;