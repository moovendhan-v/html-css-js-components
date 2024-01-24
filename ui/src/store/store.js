import { createStore, combineReducers } from 'redux';
import componentsReducer from '../reducres/Components.reducres';  // Correct import path

const rootReducer = combineReducers({
  components: componentsReducer,
  // Add other reducers as needed
});

const store = createStore(rootReducer);

export default store;