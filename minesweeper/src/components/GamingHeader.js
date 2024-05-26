import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faBomb } from "@fortawesome/free-solid-svg-icons";

const elem = <FontAwesomeIcon
icon={faBomb} />;
const GamingHeader = () => {
    return(
        <div className="gaming-header">
            <FontAwesomeIcon
                icon={faGamepad}
                className={"gaming-header__icon"}
            />
            <h1 className="gaming-header__titleh1">React Minigames</h1> 
            <p className="gameing-header__vertical-line">|</p>
            <FontAwesomeIcon
                icon={faBomb}
                className={"gaming-header__icon"}
            />
            <h2 className="gaming-header__titleh2">Minesweeper</h2> 
        </div>
    )
};

export default GamingHeader;