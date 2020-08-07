import Fight from "./Fight";
import {connect} from "react-redux";
import {actCreator} from "../../redux/reducers/fight-reducer";

let mapStateToProps = (state) => {
    return {
        player: state.fightReducer.player,
        guard: state.fightReducer.guard,
        messages: state.fightReducer.messages
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        act: (action) => {
            dispatch(actCreator(action));
        }
    }
}

const  FightContainer = connect(mapStateToProps, mapDispatchToProps)(Fight);

export default FightContainer;