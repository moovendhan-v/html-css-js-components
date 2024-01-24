// store.js
import { createStore, combineReducers } from 'redux';
import {userReducer} from './userSession.reducers';

const rootReducer = combineReducers({
  user: userReducer,
  // Add other reducers as needed
});

const store = createStore(rootReducer);

export default store;
