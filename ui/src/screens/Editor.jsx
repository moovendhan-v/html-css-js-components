import React from "react";
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import CodeEditor from '../components/CodeEditor';


const Editor = ()=>{
    return(
        <>
        <Nav />
           <CodeEditor />
        <Footer />
        </>
    )
}

export default Editor;