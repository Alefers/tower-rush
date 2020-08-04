import React from 'react';
import './scss/app.scss';
import FightContainer from './app/fight/FightContainer';
import {Route} from 'react-router-dom';
import Header from "./app/header/Header";
import Footer from "./app/footer/Footer";

const App = () => {
    return (
        <div className="app-wrapper">
            <Header />
            <div className="content">
                <Route path="/fight" component={FightContainer}/>
            </div>
            <Footer />
        </div>
    );
}

export default App;
