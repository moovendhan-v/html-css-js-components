import react from "react";

const SeachBar = ()=>{
    return(
        <>
            <div className="input-group d-flex justify-content-center py-1">
            <div className="position-relative">
            <input type="text" placeholder="Search What you need" className="rounded-pill hero_forms form-controle bg-dark" />
            <span className="position-absolute top-50 end-0 translate-middle-y p-3 cursor-pointer">🔍</span>
            </div>
            </div>
        </>
    )
}

export default SeachBar;