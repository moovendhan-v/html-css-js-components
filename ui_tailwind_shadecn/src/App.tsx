import './App.css'
import '../app/globals.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './screens/Home';
import Testing from './screens/Testing';
import { Components } from './screens/Components';
import { View } from '@/screens/View';
// import { Settings } from '@/screens/Settings';
import SettingsProfilePage from '@/screens/settings/page'
import SettingsAccountPage from '@/screens/settings/account/page'
import SettingsNotificationsPage from '@/screens/settings/notifications/page'
import SettingsAppearancePage from '@/screens/settings/appearance/page'
import SettingsDisplayPage from '@/screens/settings/display/page'
import SettingsLayout from '@/screens/settings/layout'
import AboutUs from '@/screens/AboutUs';
import { Login } from '@/screens/Auth/Login';
import { useEffect } from 'react';
import { useLoginStore, useLoginUserInfo } from "@/store/Auth"
import { Profile } from './screens/Profile/Profile';

function App() {
   const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

  useEffect(() => {
    if(code){
      fetch('http://localhost:4000/auth/github-oauth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })
        .then(response => response.json())
        .then(data => {
          if(data.error == false){
            useLoginStore.setState({isLogin: true});
          }
          window.localStorage.setItem('githubOAuthState', data.response.user);
          window.localStorage.setItem('user', data.response.user.id);
          window.localStorage.setItem('token', data.response.token);
          useLoginStore.setState({isLogin: true});
          useLoginUserInfo.setState(data.response.user)
        })
        .catch(error => {
          console.error('GitHub authentication error:', error);
        });
    }
  }, [code])

  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/:catogries" element={<Components />} />
          <Route path="/:categorie/:title" element={<View />} />
          <Route path="/setting" element={<SettingsProfilePage />} />

          <Route path="/view" element={<View />} />
          <Route path="/settings/" element={<SettingsLayout children={<SettingsProfilePage />} />} />
          <Route path="/settings/profile" element={<SettingsLayout children={<SettingsProfilePage />} />} />
          <Route path="/settings/account" element={<SettingsLayout children={<SettingsAccountPage />} />} />
          <Route path="/settings/appearance" element={<SettingsLayout children={<SettingsAppearancePage />} />} />
          <Route path="/settings/notifications" element={<SettingsLayout children={<SettingsNotificationsPage />} />} />
          <Route path="/settings/display" element={<SettingsLayout children={<SettingsDisplayPage />} />} />

          <Route path="/settings/:menu" element={<SettingsLayout children={<SettingsProfilePage />} />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />

          {/* <Route path="/:catogries/:title" element={<ViewComponent />} /> */}

          {/* <Route path="/search" element={<Componenets catogreise={"search"} />} /> */}
          {/* <Route path="/all" element={<Componenets catogreise={"all"} />} />
          <Route path="/buttons" element={<Componenets catogreise={"buttons"} />} />
          <Route path="/cards" element={<Componenets catogreise={"cards"} />} />
          <Route path="/forms" element={<Componenets catogreise={"forms"} />} />
          <Route path="/checkbox" element={<Componenets catogreise={"checkbox"} />} />
          <Route path="/loader" element={<Componenets catogreise={"loader"} />} />
          <Route path="/input" element={<Componenets catogreise={"input"} />} />
          <Route path="/tooltip" element={<Componenets catogreise={"tooltip"} />} />
          <Route path="/navbar" element={<Componenets catogreise={"navbar"} />} />
          <Route path="/tabs" element={<Componenets catogreise={"tabs"} />} />
          <Route path="/toast" element={<Componenets catogreise={"toast"} />} /> */}
          {/* component routeing end  */}
          {/* <Route path="/edit" element={<Editor />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* Dynamic routing for viewing a ciomponent details  */}
          {/* <Route path="/:catogries/:title" element={<ViewComponent />} /> */}

        </Routes>
      </Router>


    </>
  )
}

export default App
