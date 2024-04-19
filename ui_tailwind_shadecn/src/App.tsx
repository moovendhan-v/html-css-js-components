import './App.css'
import '../app/globals.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Dashboard} from './screens/Home';
import Testing from './screens/Testing';
import {Components} from './screens/Components';
import { View } from '@/screens/View';
// import { Settings } from '@/screens/Settings';
import  SettingsProfilePage from '@/screens/settings/page'
import  SettingsAccountPage from '@/screens/settings/account/page'
import  SettingsNotificationsPage from '@/screens/settings/notifications/page'
import  SettingsAppearancePage from '@/screens/settings/appearance/page'
import  SettingsDisplayPage from '@/screens/settings/display/page'
import  SettingsLayout from '@/screens/settings/layout'
import AboutUs from '@/screens/AboutUs';
import { Login } from './screens/Login';

function App() {

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

          <Route path="/settings/:menu" element={<SettingsLayout children={<SettingsProfilePage  />} />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />




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
