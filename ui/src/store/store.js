import { combineReducers } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
// import thunk from 'redux-thunk';f

import {componentsReducer } from '../reducres/Components.reducres';
import {userProfileReducer} from '../reducres/userSession.reducers';

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, userProfileReducer);

const rootReducer = combineReducers({
  components: componentsReducer,
  userProfile: persistedReducer,
});

const store = configureStore({
  reducer: rootReducer,
  // middleware: [thunk], // Add any middleware if needed
});

const persistor = persistStore(store);

export { store, persistor };
