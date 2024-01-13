import react from "react";

const Heading = ({main, sub})=>{
    return(
        <>
          <div className="d-flex justify-content-center align-items-center flex-column m-5">
            <div>
                <h3>{main}</h3>
            </div>
            <div>
                <p className="text-primary"> {sub}</p>
            </div>
          </div>
        </>
    )
}

export default Heading;