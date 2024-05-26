import React from "react";
import { useState, useEffect, useReducer, useRef } from "react";
import settingsReducer from "../reducers/settings";
import SettingsContext from "../contexts/settings-context";
import DifficultiesContext from "../contexts/difficulties-context";
import GamingHeader from "./GamingHeader";
import Board from "./Board";
import SelectOptions from "./SelectOptions";
import StatusMessage from "./StatusMessage";
import ControlButton from "./ControlButton";
import Timer from "./Timer";

const difficulties = { 
    easy:{ height: 8, width: 8, mines: 10 },
    medium:{ height: 16, width: 16, mines: 40 },
    hard:{ height: 30, width: 30, mines: 150 },
    exhaustive:{ height:100, width:100, mines:2000 }
};

const Minesweeper = () => {
    const [settings, dispatch] = useReducer(settingsReducer, { 
        difficulty: 'easy',
        gameStatus: 'beforeStart',
        gameId: 0
    });

    const [startTime, setStartTime] = useState(null);
    const [now, setNow] = useState(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        if(settings.gameStatus !== 'inProcess'){
            handleTimerStop();
        } 
    },[settings.gameStatus]);

    function handleControlClick(){
        if (settings.gameStatus === 'beforeStart'){
            handleTimerStart();
            dispatch({
                type: 'CHANGE_GAMESTATE',
                gameStatus: 'inProcess'
            })
        }else{
            dispatch({
                type: 'START_NEW_GAME'
            })
        }
    }

    function handleTimerStart(){
        setStartTime(Date.now());
        setNow(Date.now());
        
        intervalRef.current = setInterval(() => {
            setNow(Date.now());
        }, 1000);
    }
    
    function handleTimerStop(){
        clearInterval(intervalRef.current);
    }

    let elapsedTime = 0;
    if (startTime != null && now != null){
        elapsedTime = (now - startTime) / 1000; 
    }

    return(
        <SettingsContext.Provider value={{settings, dispatch}}>
            <DifficultiesContext.Provider value={difficulties}>
                <GamingHeader />
                <div className="minesweeper">
                    <Timer time={elapsedTime} />
                    <ControlButton
                        handleClick={handleControlClick}
                    />
                    <SelectOptions />
                    <Board key={settings.gameId} />
                    <StatusMessage />
                </div>
            </DifficultiesContext.Provider>
        </SettingsContext.Provider>
    );
};

export default Minesweeper;