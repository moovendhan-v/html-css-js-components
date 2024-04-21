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

import { LogtoProvider, LogtoConfig } from '@logto/react';
import { Callback } from './components/auth/Callback';

const config: LogtoConfig = {
  endpoint: 'http://localhost:3001/',
  appId: '78lfaky11od6o86y8b50f',
};

function App() {

  return (  
    <>
  <LogtoProvider config={config}>

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
          <Route path="/callback" element={<Callback />} />
          
        </Routes>
      </Router>

  </LogtoProvider>
  
    </>
  )
}

export default App
