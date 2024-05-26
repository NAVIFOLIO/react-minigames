import React, { useContext } from "react";
import SettingsContext from "../contexts/settings-context";

const SelectOption = ({difficulty}) => {
    const { settings, dispatch } = useContext(SettingsContext);
    return(
        <div className="option">
            <label 
                className="option__label"
                style={{
                    fontWeight: 'bold'
                }}
            >
                <input className="option__input visually-hidden"
                    type = "radio"
                    checked = {settings.difficulty === difficulty}
                    onChange={() => dispatch({
                        type: 'CHANGE_DIFFICULTY',
                        difficulty: difficulty
                    })}
                />
                {difficulty}
            </label>
        </div>
    );
}

export default SelectOption;