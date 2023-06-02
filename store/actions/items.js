import { Types } from "../reducers/itemsReducer";

export const setItems = (items) => {
  return {
    type: Types.SET_ITEMS,
    payload: {
      items
    }
  }
}