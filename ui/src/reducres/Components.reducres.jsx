export const componentsReducer = (state = { components: [] }, action) => {
  switch (action.type) {
    case 'ADD_COMPONENTS':
      console.log('components');
      console.log(action);
      return {
        ...state,
        components: state.components.concat(action.payload),
      };
    default:
      return state;
  }
};

export const componentsReducerButtons = (state = { components_buttons: [] }, action) => {
  switch (action.type) {
    case 'ADD_COMPONENTS':
      console.log('buttons');
      console.log(action);
      return {
        ...state,
        components_buttons: state.components_buttons.concat(action.payload),
      };
    default:
      return state;
  }
};

export const componentsReducerCards = (state = { components_cards: [] }, action) => {
  switch (action.type) {
    case 'ADD_COMPONENTS':
      console.log("cards");
      console.log(action);
      return {
        ...state,
        components_cards: state.components_cards.concat(action.payload),
      };
    default:
      return state;
  }
};
