export const Types = {
  SET_ITEMS: "items/SET_ITEMS",
  SET_ACTIVE_SHOPPING_LIST: "items/SET_ACTIVE_SHOPPING_LIST",
  SET_APP_MODE: "items/SET_APP_MODE",
  SET_SHOPPING_LIST_DIRTY: "items/SET_SHOPPING_LIST_DIRTY",
};

export const APP_MODES = {
  VIEW_SHOPPING_LIST: "app_mode/VIEW_SHOPPING_LIST",
  EDIT_SHOPPING_LIST: "app_mode/EDIT_SHOPPING_LIST",
  ADD_NEW_ITEM: "app_mode/ADD_NEW_ITEM",
  VIEW_ITEM: "app_mode/ADD_NEW_ITEM"
};

export const SHOPPING_LIST_STATES = {
  ACTIVE: "active",
  COMPLETED: "completed",
  CANCELLED: "cancelled"
};

const initialState = {
  appMode: APP_MODES.VIEW_SHOPPING_LIST,
  items: [],
  activeShoppingList: null,
  shoppingListDirty: false
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
    case Types.SET_APP_MODE:
      return {
        ...state,
        appMode: action.payload.appMode
      };
    case Types.SET_SHOPPING_LIST_DIRTY:
      return {
        ...state,
        shoppingListDirty: action.payload.shoppingListDirty
      };

    default:
      return state;
  }
};

export default itemsReducer;