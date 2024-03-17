import react from "react";
import CodeEditor from '../components/CodeEditor';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

const ContributeNewComp = ()=>{
    return(
        <>
      <Nav />
           <CodeEditor
           html = {"testing"}
           css = {"css"}
           js = {"js"}
           />
       <Footer /> 
        </>
    )
}

export default ContributeNewComp;