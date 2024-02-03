// actions.js
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';

export const updateUserProfile = (profileData) => ({
  type: UPDATE_USER_PROFILE,
  payload: profileData,
});
