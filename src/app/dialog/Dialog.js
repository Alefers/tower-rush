import React from 'react';
import {NavLink} from "react-router-dom";

const  Dialog = (props) => {
    return (
        <div className="dialog">
            <div className="link-to-story">
                <a href="https://drive.google.com/drive/folders/1pR7xi9mvd5GRldRMAivg7SlB-sWpTD_6?usp=sharing">
                    Всё описание игры.
                </a>
            </div>
            <div className="link-to-fight">
                <NavLink to="/fight">
                    А тут можно покликать на кнопки и кого нить случайно убить.
                </NavLink>
            </div>
        </div>
    );
}

export default Dialog;