import React from "react";
import ComponentsCard from './ComponentsCard';

const ScrollAnimation = () => {
    const items = ["All", "Buttons", "Cards", "Forms", "Checkbox", "Loader", "Input", "tooltip", "navbar", "tabs", "toast"];
    const duplicatedItems = items.map((item, index) => (
        <li className="btn" key={index} aria-hidden="true">
            <span aria-hidden="true">{item}</span>
        </li>
    ));
    return (
        <>
            <div id="scroolcontainerLeft" className="mt-2 text-center py-2" data-animated>
                <ul id="scrool_list" data-animated="true" >{duplicatedItems}</ul>
            </div>
        </>
    );
};

const ScrollAnimationForImage = ({direction}) => {
    return (
        <>
            <div id={`scroolcontainer${direction}`} className="text-center py-2" data-animated>
                 <ul className="d-flex " data-animated="true" id="scrool_list" >
                        <ComponentsCard catogreise="buttons" componentType="scrool" />
                 </ul>
             </div>
        </>
    );
};


export default ScrollAnimation;
export { ScrollAnimationForImage };
