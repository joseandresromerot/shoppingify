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

export const setShoppingListDirty = (shoppingListDirty) => {
  return {
    type: Types.SET_SHOPPING_LIST_DIRTY,
    payload: {
      shoppingListDirty
    }
  }
}

export const setItemId = (itemId) => {
  return {
    type: Types.SET_ITEM_ID,
    payload: {
      itemId
    }
  }
}

export const setCategories = (categories) => {
  return {
    type: Types.SET_CATEGORIES,
    payload: {
      categories
    }
  }
}

export const setHistory = (history) => {
  return {
    type: Types.SET_HISTORY,
    payload: {
      history
    }
  }
}

export const setSidebarVisible = (sidebarVisible) => {
  return {
    type: Types.SET_SIDEBAR_VISIBLE,
    payload: {
      sidebarVisible
    }
  }
}