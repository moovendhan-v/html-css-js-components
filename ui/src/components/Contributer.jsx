import React from "react";
import { Images } from '../konst/Images';

const ContributerCard = () => {
    return (
        <div className="col ">
            <div className="card m-2  radius-10 contributer">
                <div className="card-body contributes">
                    <div className="d-flex align-items-center">
                        <div className="brandlogos">
                            <img src={Images.LOGO} className="brandlogo m-2" alt="" />
                        </div>
                       <div>
                       <h3 className="h4">Moovendhan</h3>
                        <span className="h6 fw-light ">100 + contributes</span>
                       </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

const Contributer = () => {
    return (
        <div className="d-flex justify-content-center ">
            <div className="container row row-cols-1 row-cols-md-2 row-cols-xl-4 my-3">
                <ContributerCard />
                <ContributerCard />
                <ContributerCard />
                <ContributerCard />
                <ContributerCard />
                <ContributerCard />
                <ContributerCard />
                <ContributerCard />
                <ContributerCard />
                <ContributerCard />
            </div>
        </div>
    );
};


export default Contributer;

