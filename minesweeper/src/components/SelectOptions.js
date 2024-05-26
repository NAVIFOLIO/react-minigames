import React, { useContext } from "react";
import DifficultiesContext from "../contexts/difficulties-context";
import SelectOption from "./SelectOption";

const SelectOptions = ({}) => {
    const difficulties = useContext(DifficultiesContext);
    return(
        <div className="selectOptions">
            {
                Object.keys(difficulties).map((key) => (
                    <SelectOption
                        key={key}
                        difficulty={key}
                    />
                ))
            }
        </div>
    );
};

export default SelectOptions;