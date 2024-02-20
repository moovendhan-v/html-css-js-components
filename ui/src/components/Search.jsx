import React, { useState } from "react";
import { SvgIcons } from "./Button";

const SeachBar = (props) => {
    const [input, setInput] = useState('');

    function searchComponents(event) {
        setInput(event.target.value);
    }

    return (
        <div className="input-group d-flex justify-content-center py-1">
            <div className={`position-relative ${props.role === "search" ? "w-100" : "w-80"}`}>
                <input 
                    type="text" 
                    value={input} 
                    onChange={searchComponents} 
                    placeholder="Search What you need" 
                    className="border border-0 rounded-pill hero_forms form-controle bg-dark" 
                />
                <div>
                    <a href={`/search?comps=${input}`}>
                        <span className="position-absolute top-50 end-0 translate-middle-y p-3 cursor-pointer hero_forms_button"> 
                            <span><SvgIcons icon={"search"} /></span>
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default SeachBar;
