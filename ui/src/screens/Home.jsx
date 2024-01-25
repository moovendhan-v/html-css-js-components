import Hero from "../components/Hero";
import react from "react";
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const HomePage = ()=>{
    return(
        <>
        <script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="agristylesyt" data-color="#5F7FFF" data-emoji=""  data-font="Comic" data-text="Buy me a coffee" data-outline-color="#000000" data-font-color="#ffffff" data-coffee-color="#FFDD00" ></script>
        <Nav />
            <Hero />
        <Footer />
        </>
    )
}

export default HomePage;