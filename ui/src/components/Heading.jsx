import react from "react";

const Heading = ()=>{
    return(
        <>
          <div className="d-flex justify-content-center align-items-center flex-column m-5">
            <div>
                <h3>Popular Posts</h3>
            </div>
            <div>
                <p className="text-primary"> Trending</p>
            </div>
          </div>
        </>
    )
}

export default Heading;