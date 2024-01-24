import React from "react";
import { Link } from 'react-router-dom';
import GitHubLoginButton from '../components/Gitlogin';
import Model from '../components/Model'

function Nav() {

  return (
    <>
      <section>
        <nav className="navbar navbar-expand-lg bg-body-tertiary py-3">
          <div className="container-fluid">
            <a className="navbar-brand fw-bold text-light" href="#">Ui-Comp</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-between " id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active fw-semibold text-light" aria-current="page" ><Link to="/">Home</Link></a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active fw-semibold text-light" aria-current="page"><Link to="/components">Components</Link></a>
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
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                      </div>
                      <div className="bg-theme p-3">
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
              <div className="d-flex align-items-center">
                <div>
                  <span>Moovendhan v</span>
                </div>
                <div className="bg-light rounded mx-4" >
                  <img className="brandlogo img-fluid float-end rounded-circle " src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjFz1aoq0RnlkDHO6OqApeAWXICc9xFcyqUZndGSfTyzPPDPksfhsYK7s4vEoYZ_Xc2Imeh9yEXbg09WAwEpH41KXANe8wbLqaQFyhMqkVH9_KDvhZ-VkUxzB5ppvwyOh_vEUDkLbPBwrYOgyMC7x9-aN5kF-Q1HB3cOugW5PBtrjXfHQIN15w5cz09LPt6/s16000/T-G%20logos%20only.png" alt="logo" />
                </div>
                <div>
                <GitHubLoginButton />
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





