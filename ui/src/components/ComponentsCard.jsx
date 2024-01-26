import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComponents } from '../actions/components.actions';
import code from '../assets/myicons/code.svg';
import OutputsOfComponents from './OutputsOfComponents';

const ComponentsCard = ({catogreise}) => {
  const dispatch = useDispatch();
  const componentsPropertyName = `components_${catogreise}`;
  console.log(componentsPropertyName);
  const components = useSelector((state) => state[componentsPropertyName]);

  console.log(`components ${components}`);

  useEffect(() => {
    const fetchComponentsFromAPI = async () => {
      try {
        const response = await fetch(`http://localhost:4000/components/latest?category=${catogreise}`);
        const data = await response.json();
        console.log(data.response);
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

  return (
    <>

   <div>
   <div className="p-3">
      <h3>Browse-{catogreise} Ui-Components</h3>
    </div>
    <div className="px-3 py-1">
      <p>You Can Use all this ui element for your next projects</p>
    </div>
   </div>

      <div className="container-fluid">
        <div className="gallery_containers shadow_fade">

        {components[componentsPropertyName].map((component, index) => (
            
            <div className="box myBoxContainer">
              <div key={index} className="col rounded-1 position-relative ">
                  <div className='readCode d-flex  align-items-center'>
                    <div>
                      <img className='svg' src={code} alt="" />
                    </div>
                    <div>  Edit code</div>
                  </div>
                <div className="box m-1 p-1">
                  <OutputsOfComponents
                    html={component.post_details.html}
                    css={component.post_details.css}
                    js={component.post_details.js}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between mt-4">
                <div >
                  <span>Moovendhan</span>
                </div>
                <div>
                  <span>100Views</span>
                </div>
              </div>
              
            </div>
          ))}

        </div>
      </div>
    </>
  );
};

export default ComponentsCard;
