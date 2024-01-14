import React from "react";
import { Link } from 'react-router-dom';

function Nav() {

  return (
    <>
      <section>
        <nav class="navbar navbar-expand-lg bg-body-tertiary py-3">
          <div class="container-fluid">
            <a class="navbar-brand fw-bold text-light" href="#">Ui-Comp</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between " id="navbarNavDropdown">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link active fw-semibold text-light" aria-current="page" ><Link to="/">Home</Link></a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active fw-semibold text-light" aria-current="page"><Link to="/components">Components</Link></a>
                </li>
                
                {/* <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle text-light" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdown link
                  </a>
                  <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                  </ul>
                </li> */}


              </ul>

              <div className="d-flex align-items-center">
                  <div>
                        <span>Moovendhan v</span>
                  </div>
                  <div className="bg-light rounded mx-4" >
                  <img className="brandlogo img-fluid float-end rounded-circle " src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjFz1aoq0RnlkDHO6OqApeAWXICc9xFcyqUZndGSfTyzPPDPksfhsYK7s4vEoYZ_Xc2Imeh9yEXbg09WAwEpH41KXANe8wbLqaQFyhMqkVH9_KDvhZ-VkUxzB5ppvwyOh_vEUDkLbPBwrYOgyMC7x9-aN5kF-Q1HB3cOugW5PBtrjXfHQIN15w5cz09LPt6/s16000/T-G%20logos%20only.png" alt="logo" />
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





