import React, { useState } from "react";
import { SvgIcons } from "./Button";
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import { useDispatch, useSelector } from "react-redux";
import { addComponents } from '../actions/components.actions';


const SeachBar = (props) => {
    const [input, setInput] = useState('');

    function searchComponents(event) {
        setInput(event.target.value);
    }
    const dispatch = useDispatch();

    function fetchComponentsUsingSearch() {
        const searchApi = `http://localhost:4000/components/searchcomponents?search=${input}`;
        axios.get(searchApi)
            .then(datas => {
                console.log('Response data:', datas.data.response);
                if (Array.isArray(datas.data.response)) {
                    dispatch(addComponents({ components: datas.data.response, componentType: props.catogreise }));
                } else {
                    console.error("Invalid data structure from API");
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
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
                    <Link to={`/search?comps=${input}`} >
                        <span onClick={fetchComponentsUsingSearch} className="position-absolute top-50 end-0 translate-middle-y p-3 cursor-pointer hero_forms_button">
                            <span><SvgIcons icon={"search"} /></span>
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SeachBar;
