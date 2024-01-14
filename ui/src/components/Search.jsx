import react from "react";
import { SvgIcons } from "./Button";
const SeachBar = ()=>{
    return(
        <>
            <div className="input-group d-flex justify-content-center py-1">
            <div className="position-relative w-80">
            <input type="text" placeholder="Search What you need" className=" border border-0 rounded-pill hero_forms form-controle bg-dark" />
            <div>
            <span className="position-absolute top-50 end-0 translate-middle-y p-3 cursor-pointer hero_forms_button">  <span><SvgIcons icon={"search"} /></span>
</span>
            </div>
            </div>
            </div>
        </>
    )
}

export default SeachBar;