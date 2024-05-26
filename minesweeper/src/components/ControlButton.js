import React, { useContext } from 'react';
import SettingsContext from '../contexts/settings-context';
import data from '@emoji-mart/data';
import {init} from 'emoji-mart';

init ({data});

const btnProperty= {
    'beforeStart': { message: 'Click to start', emoji: 'hourglass'},
    'inProcess': { message: 'Reset board', emoji: 'hourglass'},
    'completed': { message: 'Start new game', emoji: 'hourglass'},
    'gameOver': { message: 'Redo', emoji: 'hourglass'}    
};

const ControlButton = ({handleClick}) => {
    const { settings } = useContext(SettingsContext);
    
    return(
        <div className='control-button'>
            <button className='control-button__button'
                onClick={handleClick} 
            >{btnProperty[settings.gameStatus].message}
            </button>
        </div>
    );  
};

export default ControlButton;