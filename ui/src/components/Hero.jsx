import React from "react";
import TypingTextEffect from './TypingText';
import SeachBar from './Search';
import ScroolAnimation from './Scrool';
import { ScrollAnimationForImage } from "./Scrool";
import Button from "./Button";
import Heading from './Heading';
import PopularPosts from './PopularPosts';
// import IframeCard from './iframe';
import PostContent from './Shadow_content';

function Hero(){
    return(
        <>
        <section>
            <div className="hero_section text-center">
                <h3 className="fw-bold lh-base">Open Source Ui-Componenets <br /> for your next projects</h3>
            </div>
            <div className="hero_info text-center my-3 fw-bolder ">
                {/* <p>Save and share your creative designes to open source</p> */}
                <TypingTextEffect  text="Save and share your creative designes to open source" delay={100}  />
            </div>
            <div className="hero_search">
                <SeachBar />
                <ScroolAnimation />
                <ScrollAnimationForImage direction={"Right"} />
                <ScrollAnimationForImage direction={"Left"} />
                <Button />
            </div>
        </section>

        <section>
            <Heading />
        </section>
        <section>
            <PopularPosts />
            {/* <PostContent /> */}
        </section>
        </>
    )
}

export default Hero;