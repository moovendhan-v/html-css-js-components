// // userSession.reducers.js
// const initialState = {
//     name: '',
//     avatar: '',
//     bio: '',
//     isLoggedIn: false,
// };

// export const userReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case LOGIN:
//         return {
//           ...state,
//           isLoggedIn: true,
//           user: action.payload,
//         };
//       case LOGOUT:
//         return {
//           ...state,
//           isLoggedIn: false,
//           user: null,
//         };
//       default:
//         return state;
//     }
// };
