import React from 'react';
import Fight from "./Fight";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        player: state.played
    }
}
let mapDispatchToProps = (dispatch) => {
    return {

    }
}

const  FightContainer = connect(mapStateToProps, mapDispatchToProps)(Fight);

export default FightContainer;