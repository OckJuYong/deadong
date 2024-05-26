import React, { useEffect, useState } from 'react';
import npc from './img/npc.png';
import computer_logo from './img/computer_logo.png';
import message from './img/message.png';

import './main.css';
import './realmain.css';

const TypingText = ({ text, delay = 0 }) => {
    const [lines, setLines] = useState([]);
    const [currentLine, setCurrentLine] = useState(0);
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        setLines(text.split('\n'));
    }, [text]);

    useEffect(() => {
        if (currentLine < lines.length) {
            let index = 0;

            const startTyping = () => {
                const interval = setInterval(() => {
                    setDisplayText(lines[currentLine].substring(0, index));
                    index++;

                    if (index > lines[currentLine].length) {
                        clearInterval(interval);
                        setCurrentLine(currentLine + 1);
                    }
                }, 100);
            };

            const timeout = setTimeout(startTyping, delay);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [currentLine, lines, delay]);

    return (
        <p className="typing-text">
            {displayText}
        </p>
    );
};

const npcChoice = () => {
    window.location.href = "http://localhost:3000/userchoice";
}

const npcWait = () => {
    window.location.href = "http://localhost:3000/userinfo";
}

const RealMain = () => {
    return (
        <div className="realmain_container">
            <img src={computer_logo} className="main_logo_left" />
            <img src={npc} className="npc_img" />

            <div className='test'>
                <div className='box1'>
                    <TypingText text="다른 주민을 초대해보겠구리?" delay={1000} />
                </div>
                <div className='box2'>
                    <TypingText text="직접 찾아볼 수도 있구리" delay={3500} />
                </div>
                <div className='top_container'>
                    <div className='name'> ECLIPSE</div>
                    <div className='answer'>
                        <div className='find' onClick={npcChoice}>주민찾기</div>
                        <div className='wait' onClick={npcWait}>주민 기다리기</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RealMain;
