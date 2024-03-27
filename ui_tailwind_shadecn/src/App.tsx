import './App.css'
import '../app/globals.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Dashboard} from './screens/Home';
import Testing from './screens/Testing';
import {Components} from './screens/Components';


function App() {

  return (
    <>

<Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/testing" element={<Testing />} />
          <Route path="/components" element={<Components />} />

          {/* <Route path="/contributenew" element={<ContributeNewComp />} /> */}
          {/* components  */}
          {/* <Route path="/search" element={<Componenets catogreise={"search"} />} />
          <Route path="/all" element={<Componenets catogreise={"all"} />} />
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
          {/* <Route path="/edit" element={<Editor />} />
          <Route path="/profile" element={<Profile />} /> */}
          {/* Dynamic routing for viewing a ciomponent details  */}
          {/* <Route path="/:catogries/:title" element={<ViewComponent />} /> */}

        </Routes>
      </Router>


    </>
  )
}

export default App
