// userProfile.reducers.js
import { UPDATE_USER_PROFILE, LOGOUT } from '../actions/user.action';

const initialState = {
  userProfile: {},
  userComponents: {},
};

export const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_PROFILE:
      const { userProfileInfo, saveTo } = action.payload;
      switch (saveTo) {
        case 'profile':
          return {
            ...state,
            userProfile: userProfileInfo,
          };
        case 'components':
          return {
            ...state,
            userComponents: userProfileInfo,
          };
        default:
          return state;
      }
    case LOGOUT:
      return initialState; // Return the initial state upon logout
    default:
      return state;
  }
};
