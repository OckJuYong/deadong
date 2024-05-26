import React from 'react';
import computer_logo from './img/computer_logo.png'
import { Link } from 'react-router-dom';

import './main.css';

const main = () => {

    const nextEvent = () => {
        console.log("클릭됨");
        window.location.href = "http://localhost:3000/main";
    }

    return (
    <div className="main_container" onClick={nextEvent}>
        <div className='main_logo_container'>
            <img src={computer_logo} alt="Computer Logo" className='main_logo'/>
        </div>
    </div>
    );
}

export default main