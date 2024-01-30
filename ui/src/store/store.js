import { createStore, combineReducers } from 'redux';
import {componentsReducer } from '../reducres/Components.reducres';
// import {userReducer} from '../reducres/userSession.reducers';

const rootReducer = combineReducers({
  components: componentsReducer,
  // components_buttons : componentsReducerButtons,
  // components_cards : componentsReducerCards,
  // user: userReducer,

  // Add other reducers as needed
});

const store = createStore(rootReducer);

export default store;
