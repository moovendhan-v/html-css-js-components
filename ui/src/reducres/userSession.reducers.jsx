// userProfile.reducers.js
import { UPDATE_USER_PROFILE } from '../actions/user.action';

const initialState = {
  userProfile: {},
};

export const userProfileReducer = (state = initialState, action) => {
    console.log(`user profile sections ${JSON.stringify(action)}`);
  switch (action.type) {
    case UPDATE_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };
    default:
      return state;
  }
};
