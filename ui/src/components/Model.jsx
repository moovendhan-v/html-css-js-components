import react from "react";
import { SvgIcons } from "./Button";

import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../actions/user.action';

const Models = () => {
    return (
        <>
            <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content bg-theme min-height-400">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Create Account with Github</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <ul className="nav nav-pills mb-3 d-flex justify-content-around" id="pills-tab" role="tablist">
                                <li className="nav-item nav-tabss" role="presentation">
                                    <button className="btn active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Home</button>
                                </li>
                                <li className="nav-item nav-tabss" role="presentation">
                                    <button className="btn" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</button>
                                </li>
                            </ul>
                            <div className="tab-content d-flex  justify-content-center p-5 mt-5" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0">
                                    <form className="text-center">
                                        <div className="mb-3 form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                            <label className="form-check-label" for="exampleCheck1">Your can only create an account with </label>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Create Account With Github</button>
                                    </form>
                                </div>
                                <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0">
                                    <form className="text-center">
                                        <button type="submit" className="btn btn-primary">Login With Github Account</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className="btn btn-primary" data-bs-target="#exampleModalToggle" data-bs-toggle="modal">Login</button>
        </>
    )
}

const EditMyProfileModel = () => {

    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.userProfile);

    return (
        <>
            <div>
                <button
                    className="btn btn-primary w-100 "
                    data-bs-target="#staticBackdrop"
                    data-bs-toggle="modal"
                    type="button"
                >
                    <div className="w-100 d-flex "><SvgIcons icon={"edit"} /> <div><span>Profile</span></div> </div>
                </button>
                <div
                    aria-hidden="true"
                    aria-labelledby="staticBackdropLabel"
                    className="modal fade"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    id="staticBackdrop"
                    tabIndex="-1"
                >
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content bg-modal ">

                            <div className="modal-header">
                                <div className="d-flex justify-content-center  align-items-center ">
                                    <div><SvgIcons icon={"edit"} /></div> <div><h3 className="h4"> Edit Your Profile</h3></div>
                                </div>
                                <button
                                    aria-label="Close"
                                    className="btn-close text-danger bg-danger"
                                    data-bs-dismiss="modal"
                                    type="button"
                                />
                            </div>
                            <div className="modal-header py-1 ">
                                <div>
                                    <span className="text-warning">Please provide your genuine information as it aids others in understanding your skills and qualifications, potentially leading to employment opportunities or collaboration:</span>
                                </div>
                            </div>

                            <div className="modal-body">

                                <div className="d-flex row p-2">
                                    <div className="p-2 col-6">
                                        <div>
                                            <span>Name</span>
                                        </div>
                                        <div>
                                            <input value={userProfile.userProfile.name} class="mt-2 form-control form-control-lg bg-dark text-light " type="text" placeholder="Name" aria-label=".form-control-lg example" />
                                        </div>
                                    </div>
                                    <div className="p-2 col-6">
                                        <div>
                                            <span>Location</span>
                                        </div>
                                        <div>
                                            <input class="mt-2 form-control form-control-lg bg-dark text-light " type="text" placeholder="Location" aria-label=".form-control-lg example" />
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex row p-2">

                                    <div className="p-2 col-6">
                                        <div>
                                            <span>Company</span>
                                        </div>
                                        <div>
                                            <input class="mt-2 form-control form-control-lg bg-dark text-light " type="text" placeholder="Company" aria-label=".form-control-lg example" />
                                        </div>
                                    </div>
                                    <div className="p-2 col-6">
                                        <div>
                                            <span>Wesite</span>
                                        </div>
                                        <div>
                                            <input class="mt-2 form-control form-control-lg bg-dark text-light " type="text" placeholder="Website" aria-label=".form-control-lg example" />
                                        </div>
                                    </div>
                                </div>

                                <div className="p-1">
                                    <div>
                                        <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top">Discord Webhook uri <a className="text-primary" href="#">Learn More</a> </span>
                                        <span className="p"></span>
                                    </div>
                                    <div>
                                        <input class="mt-2 form-control form-control-lg bg-dark text-light " type="text" placeholder="To send status update to your discord channel...!" aria-label=".form-control-lg example" />
                                    </div>
                                </div>
                                <div className="p-1">
                                    <div>
                                        <span>About Yours</span>
                                    </div>
                                    <div>
                                        <textarea class="form-control bg-dark text-light " placeholder="Edit Bio" rows="3"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    type="button"
                                >
                                    Close
                                </button>
                                <button
                                    className="btn btn-primary"
                                    type="button"
                                >
                                    Update My Staus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Models;
export { EditMyProfileModel }