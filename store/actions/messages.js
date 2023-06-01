import { Types } from "../reducers/messagesReducer";

export const showMessage = (message, primaryButtonText, primaryButtonHandler, secondaryButtonText, secondaryButtonHandler) => {
  return {
    type: Types.SHOW_MESSAGE,
    payload: {
      message,
      primaryButtonText,
      primaryButtonHandler,
      secondaryButtonText,
      secondaryButtonHandler
    }
  }
}

export const hideMessage = () => {
  return {
    type: Types.HIDE_MESSAGE
  }
}

export const showLoading = () => {
  return {
    type: Types.SHOW_LOADING
  }
}