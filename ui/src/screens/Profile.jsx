import Nav from '../components/Nav';
import Footer from '../components/Footer';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LeftSliders from '../components/LeftSLiders';
import { SvgIcons } from "../components/Button";
import { EditMyProfileModel } from '../components/Model';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../actions/user.action';

const Profile = () => {

  const dispatch = useDispatch();
  const userProfile = useSelector(state => state.userProfile);
  console.log(`=> user profile ${JSON.stringify(userProfile.userProfile.login)}`);

  useEffect(() => {
    const user_id = "65ab4cbe5120e974d9f5041b";
      fetch('http://localhost:4000/profile/getuserprofileinfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(JSON.stringify(data.response.user, null, 2));
          dispatch(updateUserProfile(data.response.user));
        })
  }, []);
  
  
  return (
    <>
      <Nav />
      <div className="container-fluid d-flex">
        <div className='left_div'>
          <div>
            <LeftSliders />
          </div>
        </div>
        <div className='right_div'>
          {/* profiles  */}
          <div>
            <div className='row d-flex bg-grey'>
              <div className="col-2 p-3 ">
                <img className='img-fluid' src={userProfile.userProfile.avatar_url} alt="" />
              </div>
              <div className="col-8 p-3">
                <div><h3 className='fw-bolder'>{userProfile.userProfile.name}</h3></div>
                <div><p className='text-info'>{userProfile.userProfile.bio}</p></div>
                <div><p>Organisations</p></div>
                <div className="d-flex">
                  <div className='pe-2'>
                    <a href="#">Github</a>
                  </div>
                  <div className='pe-2'>
                    <a href={userProfile.userProfile.blog}>Website</a>
                  </div>
                </div>
              </div>
              <div className='col-2'>
                <div className='m-3'>
                  <EditMyProfileModel />
                </div>
                <div className='btn w-80 bg-menuslider m-3 border border-primary'>
                  <div><h4 className='text-primary'>100K</h4></div>
                  <span>Total Posts</span>
                </div>
              </div>
            </div>
          </div>

          {/* infos */}
          <div className='d-flex bg-grey my-2 rounded-2 '>
            <div className='p-3'>
              <Link className='profile_text' to="/publicvarient">Public Varient</Link>
            </div>
            <div className='p-3'>
              <Link className='profile_text' to="/approvals">Waiting for Approvals</Link>
            </div>
            <div className='p-3'>
              <Link className='profile_text' to="/publicvarient">Drafts</Link>
            </div>
          </div>

          {/* details */}
          <div className='profile_tabs bg-grey'>

          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}

export default Profile;