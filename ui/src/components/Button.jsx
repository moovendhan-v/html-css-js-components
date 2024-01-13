import react from "react";
import boxIcon from '../styles/icons'

const Button = ()=>{
    return(
        <>
          <div className="d-flex justify-content-center ">
          <button type="button" class="btn btn-primary"> <span>{boxIcon()}</span> Explore More UI-Components</button>
          </div>
        </>
    )
}

export default Button;