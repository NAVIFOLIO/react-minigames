import React from "react";
import data from '@emoji-mart/data';
import {init} from 'emoji-mart';

init ({data});

const Timer = ({time}) => {
    return(
        <div className="timer">
            <em-emoji id="hourglass" size="2em"></em-emoji>
            <p
                style={{fontWeight: 'bold'}}
            >Your Time: {time.toFixed()}</p>
        </div>
    );
}

export default Timer;