export const Types = {
  SET_ITEMS: "items/SET_ITEMS",
};

const initialState = {
  items: []
};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_ITEMS:
      return {
        ...state,
        items: action.payload.items
      };

    default:
      return state;
  }
};

export default itemsReducer;