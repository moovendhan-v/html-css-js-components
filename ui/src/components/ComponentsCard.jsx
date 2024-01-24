import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComponents } from '../actions/components.actions';  
import OutputsOfComponents from './OutputsOfComponents'; 

const ComponentsCard = () => {
  const dispatch = useDispatch();
  const components = useSelector((state) => state.components);
//   const parsed = JSON.parse(JSON.stringify(components));

  useEffect(() => {
    const fetchComponentsFromAPI = async () => {
      try {
        const response = await fetch("http://localhost:4000/components/latest?category=buttons");
        const data = await response.json();
  
        console.log("Data from API:", data);
        
        // Check if data.response is an array
        if (Array.isArray(data?.response)) {
          dispatch(addComponents(data?.response));
        } else {
          console.error("Invalid data structure from API");
        }
      } catch (error) {
        console.error("Error fetching components:", error);
      }
    };
  
    fetchComponentsFromAPI();
  }, [dispatch]);  

  useEffect(() => {
    console.log("Original components:", components);
    for (const key in components) {
        // console.log(`+++ ${components.components[0].post_details}`);
    }
  }, [components]);

  return (
    <>
    
    <div className="container row row-cols-1 row-cols-md-2 row-cols-xl-4 my-3">
      {components.components.map((component, index) => (
        <div key={index} className="col rounded-1">
          <div className="box m-1 p-1">
            <OutputsOfComponents
              html={component}
              css={component}
              js={component}
            />
          </div>
        </div>
      ))}
    </div>

    </>
  );
};

export default ComponentsCard;
