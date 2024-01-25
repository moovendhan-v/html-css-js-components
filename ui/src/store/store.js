import { createStore, combineReducers } from 'redux';
import {componentsReducer, componentsReducerButtons } from '../reducres/Components.reducres';  // Correct import path

const rootReducer = combineReducers({
  components: componentsReducer,
  components_buttons : componentsReducerButtons,
  // Add other reducers as needed
});

const store = createStore(rootReducer);

export default store;