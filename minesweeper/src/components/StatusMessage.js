import React, { useContext } from "react";
import SettingsContext from "../contexts/settings-context";
import data from '@emoji-mart/data';
import {init} from 'emoji-mart';

init({data});

const designSettings = {
    'beforeStart': { message: "Let's Play!", emoji: "sparkles"},
    'inProcess': { message: "in progress", emoji: "thinking_face"},
    'completed': { message: "Congraturations!", emoji: "tada"},
    'gameOver': { message: "Oh...", emoji: "dizzy_face"}
}

const StatusMessage = () => {
    const { settings } = useContext(SettingsContext); 
    return(
        <div className="status-message">
            <em-emoji id={designSettings[settings.gameStatus].emoji} size="1em"></em-emoji>
            <p className="status-message__message">{designSettings[settings.gameStatus].message}</p>
        </div>
    );
};

export default StatusMessage;
