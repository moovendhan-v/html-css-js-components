import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { store, persistor } from './store/store.js'; // Import store and persistor
import App from './App.jsx';
import './index.css';
import './App.css';


const root = createRoot(document.getElementById('root'));

const GitHubAuth = () => {

  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
};

root.render(<GitHubAuth />, document.getElementById('root'));
