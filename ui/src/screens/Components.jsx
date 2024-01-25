import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SliderNavbar from '../components/Componennts';
// import LoginButton from '../components/Login'
import GitHubLoginButton from '../components/Gitlogin';

const Components = ({catogreise})=>{
    return(
        <>
        <Nav />
        {/* <GitHubLoginButton /> */}
            <SliderNavbar catogreise={catogreise}/>
        <Footer />
        </>
    )
}

export default Components;