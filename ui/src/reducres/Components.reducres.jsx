export const componentsReducer = (state = { 
  components_all: [],
  components_buttons: [],
  components_cards: [],
}, action) => {
  switch (action.type) {
    case 'ADD_COMPONENTS':
      console.log('components');
      console.log(action);

      // Determine the type of components being added
      const { componentType, components } = action.payload;

      // Update the corresponding slice of the state based on the componentType
      switch (componentType) {
        case 'all':
          return {
            ...state,
            components_all: [...state.components_all, ...components],
          };
        case 'buttons':
          return {
            ...state,
            components_buttons: [...state.components_buttons, ...components],
          };
        case 'cards':
          return {
            ...state,
            components_cards: [...state.components_cards, ...components],
          };
        default:
          // By default, assume they are regular components
          return {
            ...state,
            components_all: [...state.components_all, ...components],
          };
      }
    default:
      return state;
  }
};
