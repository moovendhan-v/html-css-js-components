// Components.reducres.js
const initialState = {
  components: [],
};

const componentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_COMPONENTS':
    console.log('Previous State:', state);
    console.log('Action:', action);
      return {
        ...state,
        components: [...state.components, ...action.payload],
      };
    default:
      return state;
  }
};

export default componentsReducer;
