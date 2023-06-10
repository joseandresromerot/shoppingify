export const Types = {
  SET_ITEMS: "items/SET_ITEMS",
  SET_ACTIVE_SHOPPING_LIST: "items/SET_ACTIVE_SHOPPING_LIST",
  SET_APP_MODE: "items/SET_APP_MODE",
  SET_SHOPPING_LIST_DIRTY: "items/SET_SHOPPING_LIST_DIRTY",
  SET_ITEM_ID: "items/SET_ITEM_ID",
  SET_CATEGORIES: "items/SET_CATEGORIES",
  SET_HISTORY: "items/SET_HISTORY",
};

export const APP_MODES = {
  VIEW_SHOPPING_LIST: "app_mode/VIEW_SHOPPING_LIST",
  EDIT_SHOPPING_LIST: "app_mode/EDIT_SHOPPING_LIST",
  ADD_NEW_ITEM: "app_mode/ADD_NEW_ITEM",
  VIEW_ITEM: "app_mode/VIEW_ITEM"
};

export const SHOPPING_LIST_STATES = {
  ACTIVE: "active",
  COMPLETED: "completed",
  CANCELLED: "cancelled"
};

const initialState = {
  appMode: APP_MODES.EDIT_SHOPPING_LIST,
  items: [],
  activeShoppingList: null,
  shoppingListDirty: false,
  itemId: null,
  categories: [],
  history: []
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
    case Types.SET_ITEM_ID:
      return {
        ...state,
        itemId: action.payload.itemId
      };
    case Types.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload.categories
      };
    case Types.SET_HISTORY:
      return {
        ...state,
        history: action.payload.history
      };

    default:
      return state;
  }
};

export default itemsReducer;