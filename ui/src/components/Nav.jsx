import React from "react";
import { Link } from 'react-router-dom';
import GitHubLoginButton from '../components/Gitlogin';
import Model from '../components/Model'
import LeftSliders from '../components/LeftSLiders';
import { SvgIcons } from "./Button";
import { useSelector } from 'react-redux';


function Nav() {
  const userProfile = useSelector(state => state.userProfile);
  return (
    <>
      <section>
        <nav className="text-light navbar navbar-expand-lg bg-body-tertiary py-3">
          <div className="container-fluid">

            <SvgIcons icon={"logo"} />

            <a className="navbar-brand fw-bold text-light" href="#">Ui-Comp</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-between " id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active fw-semibold text-light" aria-current="page" ><Link className="text-light" to="/">Home</Link></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active fw-semibold text-light" aria-current="page"><Link className="text-light" to="/all">Components</Link></a>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    More
                  </a>
                  {/* <ul className="dropdown-menu bg-theme">
                    <li><a className="dropdown-item" href="#">Action</a></li>
                    <li><a className="dropdown-item" href="#">Another action</a></li>
                    <li><a className="dropdown-item" href="#">Something else here</a></li>
                  </ul> */}
                  <div className="dropdown-menu bg-theme">
                    <div className="d-flex dropdown_menus">
                      <div className="bg-theme p-3">
                        <div className="menu-nav-container">
                          <LeftSliders role="navbar" />
                        </div>
                      </div>
                      <div className="bg-theme p-3">
                        <div className="menu-nav-container">
                          <GitHubLoginButton />
                        </div>
                        <div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="nav-item"></li>
                {/* <Model /> */}
              </ul>
              {/* TODO update the below code while managing the user state (set logout ? user logedin : Login witt github ) */}
              <div className="d-flex align-items-center profile">

                <div className="bg-light rounded mx-4 " >
                  <Link className="text-light " to="/profile">
                    <img className="brandlogo img-fluid float-end rounded-circle " src={userProfile.userProfile.avatar_url} alt="logo" />
                  </Link>
                </div>
                <div className="bg-grey nav-pills p-2 px-4 rounded-5 cursor-pointer">
                  <span>{userProfile.userProfile.name}</span>
                </div>
                <div>
                  {/* <GitHubLoginButton /> */}
                </div>
              </div>
            </div>

          </div>
        </nav>
      </section>
    </>
  );
}

export default Nav;





