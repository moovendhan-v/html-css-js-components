import axios from 'axios';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComponents } from '../actions/components.actions';
import { SvgIcons } from "./Button";
import OutputsOfComponents from './OutputsOfComponents';
import SeachBar from './Search';

const ComponentsCard = ({ catogreise, componentType, onlyCard = false }) => {

  const dispatch = useDispatch();
  const componentsPropertyName = `components_${catogreise}`;
  console.log(componentsPropertyName);
  const components = useSelector((state) => state.components[componentsPropertyName]);
  console.log(`components=> ${JSON.stringify(components)}`);
  // console.log(JSON.stringify(components, null, 2));

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('comps');

    function fetchComponentsUsingSearch(){
      if (catogreise === "search") {
        const searchApi = `http://localhost:4000/components/searchcomponents?search=${code}`;
        axios.get(searchApi)
          .then(datas => {
            console.log('Response data:', datas.data.response);
            if (Array.isArray(datas.data.response)) {
              dispatch(addComponents({ components: datas.data.response, componentType: catogreise }));
            } else {
              console.error("Invalid data structure from API");
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }
    }fetchComponentsUsingSearch();
   
  }, []); // Empty dependency array ensures the effect runs only once


  useEffect(() => {
    const fetchComponentsFromAPI = async () => {      
      try {
        // Check if components array is empty or null
        if (!components || components.length === 0) {
          const response = await fetch(`http://localhost:4000/components/latest?category=${catogreise}`);
          const data = await response.json();
          // Check if data.response is an array
          if (Array.isArray(data?.response)) {
            dispatch(addComponents({ components: data?.response, componentType: catogreise }));
          } else {
            console.error("Invalid data structure from API");
          }
        } else {
          console.log("Components already exist, skipping fetch");
        }
      } catch (error) {
        console.error("Error fetching components:", error);
      }
    };
    if (catogreise !== "search") {
      fetchComponentsFromAPI();
    }
  }, [dispatch, catogreise, components]); // Include components in the dependency array  

  if (onlyCard) {
    return (
      <>
        <div className="container-fluid">
          <div className="gallery_containers ">
            {components.map((component, index) => (

              <div className="box myBoxContainer">
                <div key={index} className="col d-flex rounded-1 position-relative comp-bg">
                  <div className='readCode d-flex  align-items-center'>
                    <div>
                      <SvgIcons icon={"code"} />
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
              </div>
            ))}

          </div>
        </div>
      </>
    );
  }
  if (componentType == "all") {
    return (
      <>
        <div>
          <div>
            {catogreise === 'search' ? (
                <SeachBar role="search" catogreise={catogreise} />
            ) :  
            <div className="p-3">
            <h3>Browse-{catogreise} Ui-Components</h3>
          </div>}
          </div>
          <div className="px-3 py-1">
            <p>You Can Use all this ui element for your next projects</p>
          </div>
        </div>
        <div className="container-fluid">
          <div className="gallery_containers ">
            {components.map((component, index) => (

              <div className="box myBoxContainer">
                <div key={index} className="col d-flex  rounded-1 position-relative comp-bg">
                  <div className='readCode d-flex  align-items-center'>
                    <div>
                      <SvgIcons icon={"code"} />
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
                <div className="d-flex justify-content-between mt-2">
                  <div >
                    <span>{component.post_details.admin.name}</span>
                  </div>
                  <div>
                    <span className='text-white-50 '>{component.post_details.admin.company}</span>
                  </div>
                </div>

              </div>
            ))}

          </div>
        </div>
      </>
    );
  }
  if (componentType == "scrool") {
    return (
      <>
        {components.map((component, index) => (
          <div className="box myBoxContainerScrool">
            <div key={index} className="col rounded-1 position-relative comp-bg">
              <div className='readCode d-flex  align-items-center'>
                <div>
                  <SvgIcons icon={"code"} />
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
          </div>
        ))}
      </>
    );
  }
};

export default ComponentsCard;
