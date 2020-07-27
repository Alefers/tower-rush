import React from 'react';
import './App.scss';
import Fight from './app/Fight';
import {BrowserRouter, Route} from 'react-router-app';

const App = () => {
    return (
        <BrowserRouter>
            <div className="app-wrapper">
                <Route path="/fight" component={Fight}/>
            </div>
        </BrowserRouter>
    );
}

export default App;
