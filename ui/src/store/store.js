import { createStore, combineReducers } from 'redux';
import {componentsReducer, componentsReducerButtons, componentsReducerCards } from '../reducres/Components.reducres';  // Correct import path

const rootReducer = combineReducers({
  components: componentsReducer,
  components_buttons : componentsReducerButtons,
  components_cards : componentsReducerCards,
  // Add other reducers as needed
});

const store = createStore(rootReducer);

export default store;