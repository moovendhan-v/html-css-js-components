import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComponents } from '../actions/components.actions';
import OutputsOfComponents from './OutputsOfComponents';
import Button from './Button';
import code from '../assets/myicons/code.svg'


const ComponentsCard = () => {
  const dispatch = useDispatch();
  const components = useSelector((state) => state.components);

  useEffect(() => {
    const fetchComponentsFromAPI = async () => {
      try {
        const response = await fetch("http://localhost:4000/components/latest?category=buttons");
        const data = await response.json();
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
      console.log(`+++ ${typeof (components.components.post_details)}`);
    }
  }, [components]);

  return (
    <>

   <div>
   <div className="p-3">
      <h3>Browse-All Ui-Components</h3>
    </div>
    <div className="px-3 py-1">
      <p>You Can Use all this ui element for your next projects</p>
    </div>
   </div>

      <div className="container-fluid">
        <div className="gallery_containers shadow_fade">

          {components.components.map((component, index) => (
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
      {/* <div className="align_button">
        <Button icon={"code"} text={"See All Posts"} />
      </div> */}
      {/* <div className="container row row-cols-1 row-cols-md-2 row-cols-xl-3 my-3">
      {components.components.map((component, index) => (
        <div key={index} className="col rounded-1">
          <div className="box m-1 p-1">
            <OutputsOfComponents
              html={component.post_details.html}
              css={component.post_details.css}
              js={component.post_details.js}
            />
          </div>
        </div>
      ))}
    </div> */}

    </>
  );
};

export default ComponentsCard;
