export const Types = {
  SET_ITEMS: "items/SET_ITEMS",
  SET_ACTIVE_SHOPPING_LIST: "items/SET_ACTIVE_SHOPPING_LIST",
};

export const APP_MODES = {
  VIEW_SHOPPING_LIST: "app_mode/VIEW_SHOPPING_LIST",
  EDIT_SHOPPING_LIST: "app_mode/EDIT_SHOPPING_LIST",
  ADD_NEW_ITEM: "app_mode/ADD_NEW_ITEM",
  VIEW_ITEM: "app_mode/ADD_NEW_ITEM"
};

const initialState = {
  appMode: APP_MODES.VIEW_SHOPPING_LIST,
  items: [],
  activeShoppingList: null
};

const itemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SET_ITEMS:
      return {
        ...state,
        items: action.payload.items
      };
    case Types.SET_ACTIVE_SHOPPING_LIST:
      return {
        ...state,
        activeShoppingList: action.payload.activeShoppingList
      };

    default:
      return state;
  }
};

export default itemsReducer;