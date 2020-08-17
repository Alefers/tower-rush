import React from 'react';
import './scss/app.scss';
import FightContainer from './app/fight/FightContainer';
import {Route, Switch} from 'react-router-dom';
import Header from "./app/header/Header";
import Footer from "./app/footer/Footer";
import DialogContainer from "./app/dialog/DialogContainer";
import QuestContainer from "./app/quest/QuestContainer";

const App = () => {
    return (
        <div className="app-wrapper">
            <Header />
            <div className="content">
                <Switch>
                    <Route path="/fight" component={FightContainer}/>
                    <Route path="/quest" component={QuestContainer}/>
                    <Route path="/" component={DialogContainer}/>
                </Switch>
            </div>
            <Footer />
        </div>
    );
}

export default App;
