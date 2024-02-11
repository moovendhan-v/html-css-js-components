import { createStore, combineReducers } from 'redux';
import {componentsReducer } from '../reducres/Components.reducres';
import {userProfileReducer} from '../reducres/userSession.reducers';

const rootReducer = combineReducers({
  components: componentsReducer,
  userProfile: userProfileReducer,
});

const store = createStore(rootReducer);

export default store;
