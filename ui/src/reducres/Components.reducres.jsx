// Components.reducres.js
const initialState = {
  components: [],
  components_buttons: [],
  components_cards: [],
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
      console.log('buttons');
      console.log(action);
      return {
        ...state,
        components_buttons: [...state.components_buttons, ...action.payload],
      };
    default:
      return state;
  }
};

export const componentsReducerCards = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_COMPONENTS':
      console.log("cards");
      console.log(action);
      return {
        ...state,
        components_cards: [...state.components_cards, ...action.payload],
      };
    default:
      return state;
  }
};