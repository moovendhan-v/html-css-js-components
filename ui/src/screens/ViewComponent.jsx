
import { useEffect, useState } from 'react';
import CodeEditor from '../components/CodeEditor';
import Nav from '../components/Nav';
import Footer from '../components/Footer';


const ViewComponent = ()=>{

    const [componentDetails, setComponentDetails] = useState({});

    async function fetchComponentDetails(){
        try {
            const response = await fetch('http://localhost:4000/components/view?comp=moovendhan_amazing_tooltip4');
            if(!response.ok){
                throw new Error("Error Fetching data");
            }
            const data = await response.json();
            console.log(data);
            setComponentDetails(data.post_details);
            return data;
        } catch (error) {
            console.error(`Error Fetching Data ${error}`)
        }
    }

    // alert(JSON.stringify(componentDetails.html));

    useEffect(()=>{
        fetchComponentDetails();
    },[])

    return(
        <>
      <Nav />

        {/* //Validating and send props to components if data fetched */}
         {Object.keys(componentDetails).length > 0 && (
                <CodeEditor
                    html={componentDetails.html}
                    css={componentDetails.css}
                    js={componentDetails.js}
                />
            )}
      <Footer />

        </>
    )
}

export default ViewComponent;