import React from "react";
import Button from "./Button";
import Community from './Community';
import Contributer from './Contributer';
import Heading from './Heading';
// import PopularPosts from './PopularPosts';
import ScroolAnimation, { ScrollAnimationForImage } from './Scrool';
import SeachBar from './Search';
import TypingTextEffect from './TypingText';

function Hero(){
    return(
        <>
        <section>
            <div className="hero_section text-center">
                <h3 className="fw-bold lh-base">Open Source Awesome Ui-Componenets <br /> for your next projects</h3>
            </div>
            <div className="hero_info text-center my-3 fw-bolder ">
                {/* <p>Save and share your creative designes to open source</p> */}
                <TypingTextEffect  text="Save and share your creative designes to open source" delay={100}  />
            </div>
            <div className="hero_search">
                <SeachBar />
                <ScroolAnimation />
                <ScrollAnimationForImage direction={"Right"} />
                <div className="shadow_fade">
                <ScrollAnimationForImage direction={"Left"} />
                </div>
                <div className="align_button mt-2 ">
                        <Button icon={"logo"} text={"Explore More Componenets"} />
                </div>
            </div>
        </section>

        <section>
            <Heading main={"Popular Components"}  sub={"trending"}/>
        </section>
        <section>
            {/* <PopularPosts /> */}
            {/* <PostContent /> */}
        </section>
        <section>
            <Heading main={"Our Polular Contributer"}  sub={"Signup to contribute"}/>
        </section>
        <section>
            <Contributer />
        </section>
        <section>
            <Community />
        </section>
        </>
    )
}

export default Hero;