import React, { useContext } from 'react';
import SettingsContext from '../contexts/settings-context';
import data from '@emoji-mart/data';
import {init} from 'emoji-mart';

init({data});

const Cell = ({value, isRevealed, handleClick}) => {
    const { settings } = useContext(SettingsContext);
   
    console.log(settings.difficulty);
    return(
        <button
            className = {
                "cell " + 
                ( (settings.difficulty === 'easy' ? "cell--big " : " ")) +
                ( (settings.difficulty === 'medium' ? "cell--medium " : " ")) +
                ( (settings.difficulty === 'hard') || (settings.difficulty === 'exhaustive')  ? "cell--small " : " ") +
                ( !isRevealed && (settings.gameStatus === "beforeStart") ? "cell--notready " : " ") + 
                ( isRevealed && (value === 0) ? "cell--safe " : " " ) +
                ( isRevealed && (value === -1) ? "cell--bomb " : " " ) + 
                ( isRevealed && (value > 0) ? "cell--common " : " " )
            }
            onClick={handleClick}
            disabled={isRevealed || (settings.gameStatus === 'beforeStart')}
        >{
            isRevealed && (
                value > 0 ? value :
                ( value === -1 ? <em-emoji id="firecracker" size="1em"></em-emoji> : "" )
            )
        }</button>
    );
};

export default Cell;