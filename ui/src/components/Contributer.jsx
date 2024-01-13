import React from "react";
import { Images } from '../konst/Images';

const ContributerCard = () => {
    return (
        <div class="col">
            <div class="card m-2  radius-10 contributer">
                <div class="card-body">
                    <div class="d-flex align-items-center">
                        <div>
                            <img src={Images.LOGO} className="brandlogo m-2" alt="" />
                        </div>
                       <div>
                       <h3>Moovendhan</h3>
                        <span>100 + contributes</span>
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
            <div class="container row row-cols-1 row-cols-md-2 row-cols-xl-4 my-3">
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

