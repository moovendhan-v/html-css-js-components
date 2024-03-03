// userProfile.reducers.js
import { UPDATE_USER_PROFILE } from '../actions/user.action';

const initialState = {
  userProfile: {},
  userComponents: {},
};

export const userProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_PROFILE:
      console.log(parseInt(state));
      // eslint-disable-next-line no-case-declarations
      const { userProfileInfo, saveTo } = action.payload;
      switch (saveTo) {
        case 'LOGOUT':
          return { initialState };
        case "profile":
          return {
            ...state,
            userProfile: userProfileInfo,
          };
        case "components":
          return {
            ...state,
            userComponents: userProfileInfo,
          };
        default:
          return state;
      }
  
    default:
      return state; // Add a default case to return the state unchanged if no action matches
  }
};


