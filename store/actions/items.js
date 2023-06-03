import { Types } from "../reducers/itemsReducer";

export const setItems = (items) => {
  return {
    type: Types.SET_ITEMS,
    payload: {
      items
    }
  }
}

export const setActiveShoppingList = (activeShoppingList) => {
  return {
    type: Types.SET_ACTIVE_SHOPPING_LIST,
    payload: {
      activeShoppingList
    }
  }
}

export const setAppMode = (appMode) => {
  return {
    type: Types.SET_APP_MODE,
    payload: {
      appMode
    }
  }
}