// actions.js
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const LOGOUT = 'LOGOUT';

export const userProfileReducer = (profileData) => ({
  type: UPDATE_USER_PROFILE,
  payload: profileData,
});

export const logout = () => ({
  type: LOGOUT
});
