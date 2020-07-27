import React from 'react';
import './App.scss';
import FightContainer from './app/fight/FightContainer';
import {Route} from 'react-router-dom';

const App = () => {
    return (
        <div className="app-wrapper">
            <Route path="/fight" component={FightContainer}/>
        </div>
    );
}

export default App;
