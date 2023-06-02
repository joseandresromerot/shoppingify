import { combineReducers } from "redux";
import messagesReducer from "./messagesReducer";
import itemsReducer from "./itemsReducer";

export default combineReducers({
  messagesData: messagesReducer,
  itemsData: itemsReducer
});