// actions.js
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
export const LOGOUT = 'LOGOUT';

// Action creator for updating user profile
export const updateUserProfile = (profileData) => ({
  type: UPDATE_USER_PROFILE,
  payload: profileData,
});

// Action creator for logging out
export const logout = () => ({
  type: LOGOUT
});
