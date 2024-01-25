// Components.reducres.js
const initialState = {
  components: [],
  components_buttons: [],
};

export const componentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_COMPONENTS':
      return {
        ...state,
        components: [...state.components, ...action.payload],
      };
    default:
      return state;
  }
};

export const componentsReducerButtons = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_COMPONENTS':
      console.log(state);
      console.log(action);
      return {
        ...state,
        components_buttons: [...state.components_buttons, ...action.payload],
      };
    default:
      return state;
  }
};
