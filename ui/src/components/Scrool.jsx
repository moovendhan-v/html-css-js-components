import React from "react";

const ScrollAnimation = () => {
    const items = ["First", "Second", "Third", "Fourth", "Fifth", "First", "Second", "Third", "Fourth", "Fifth"];
    const duplicatedItems = items.map((item, index) => (
        <li className="btn" key={index}>
            {item}
            <span aria-hidden="true">{item}</span>
        </li>
    ));
    return (
        <>
            <div id="scroolcontainerLeft" className="text-center py-2" data-animated>
                <ul id="scrool_list" >{duplicatedItems}</ul>
            </div>
        </>
    );
};

const ScrollAnimationForImage = ({direction}) => {

    const imgs = "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
    const itemss = [imgs, imgs, imgs, imgs, imgs];
    const duplicatedItems = itemss.map((item, index) => (
        <div className="sliderImg">
            <li key={index}>
                <img className="img-fluid" src={item} alt="" />
            </li>
        </div>

    ));
    return (
        <>
            <div id={`scroolcontainer${direction}`} className="text-center py-2" data-animated>
                <ul id="scrool_list" >{duplicatedItems}</ul>
            </div>
        </>
    );
};


export default ScrollAnimation;
export { ScrollAnimationForImage };
