export const componentsReducer = (state = {
  components_search: [],
  components_all: [],
  components_buttons: [],
  components_cards: [],
  components_forms: [],
  components_checkbox: [],
  components_loader: [],
  components_input: [],
  components_tooltip: [],
  components_navbar: [],
  components_tabs: [],
  components_toast: [],

}, action) => {
  switch (action.type) {
    case 'ADD_COMPONENTS':
      console.log('components');
      console.log(action);

      // Determine the type of components being added
      const { componentType, components } = action.payload;

      // Update the corresponding slice of the state based on the componentType
      switch (componentType) {
        case 'search':
          return {
            ...state,
            components_search: [...state.components_search, ...components],
          };
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
        case 'forms':
          return {
            ...state,
            components_forms: [...state.components_forms, ...components],
          };
        case 'checkbox':
          return {
            ...state,
            components_checkbox: [...state.components_checkbox, ...components],
          };
        case 'loader':
          return {
            ...state,
            components_loader: [...state.components_loader, ...components],
          };
        case 'input':
          return {
            ...state,
            components_input: [...state.components_input, ...components],
          };
        case 'tooltip':
          return {
            ...state,
            components_tooltip: [...state.components_tooltip, ...components],
          };
        case 'navbar':
          return {
            ...state,
            components_navbar: [...state.components_navbar, ...components],
          };
        case 'tabs':
          return {
            ...state,
            components_tabs: [...state.components_tabs, ...components],
          };
        case 'toast':
          return {
            ...state,
            components_toast: [...state.components_toast, ...components],
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
