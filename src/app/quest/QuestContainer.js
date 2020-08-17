import Quest from "./Quest";
import {connect} from "react-redux";
import {stepCreator} from "../../redux/reducers/quest-reducer";

let mapStateToProps = (state) => {
    return {
        room: state.questReducer.room,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        step: (action) => {
            dispatch(stepCreator(action));
        }
    }
}

const  QuestContainer = connect(mapStateToProps, mapDispatchToProps)(Quest);

export default QuestContainer;