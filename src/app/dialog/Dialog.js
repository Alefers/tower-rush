import React from 'react';
import {NavLink} from "react-router-dom";

const  Dialog = (props) => {
    return (
        <div className="dialog">
            <div className="link-to-story">
                <a href="https://docs.google.com/document/d/1IXZQoMaleEeaa8e2mwWELZjKkRVHRUf9e9eTleMM2Ks/edit?usp=sharing">
                    Тут лёгкое чтиво о сюжете и механике игры.
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