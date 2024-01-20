import react from "react";

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

export default Models;