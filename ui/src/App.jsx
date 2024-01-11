import React from 'react';
import * as MUI from '@mui/material'; // Import all components from Material-UI
import './App.css';

function App() {
  return (
    <div>
      <MUI.AppBar position="static">
        <MUI.Toolbar>
          <MUI.Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My App
          </MUI.Typography>
          <MUI.Button color="inherit">Home</MUI.Button>
          <MUI.Button color="inherit">About</MUI.Button>
          <MUI.Button color="inherit">Contact</MUI.Button>
        </MUI.Toolbar>
      </MUI.AppBar>

      {/* Content of your app */}
      <div>
        <p>Lets make simple</p>
      </div>
    </div>
  );
}

export default App;
