export const Types = {
  SHOW_MESSAGE: "messages/SHOW_MESSAGE",
  HIDE_MESSAGE: "messages/HIDE_MESSAGE",

  SHOW_LOADING: "messages/SHOW_LOADING",
};

const initialState = {
  visible: false,
  message: "",
  primaryButtonText: "",
  primaryButtonHandler: () => {},
  secondaryButtonText: "",
  secondaryButtonHandler: () => {}
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.SHOW_MESSAGE:
      return {
        ...state,
        visible: true,
        message: action.payload.message,
        primaryButtonText: action.payload.primaryButtonText,
        primaryButtonHandler: action.payload.primaryButtonHandler,
        secondaryButtonText: action.payload.secondaryButtonText,
        secondaryButtonHandler: action.payload.secondaryButtonHandler,
      };
    case Types.HIDE_MESSAGE:
      return {
        ...state,
        visible: false,
        message: "",
        primaryButtonText: "",
        primaryButtonHandler: () => {},
        secondaryButtonText: "",
        secondaryButtonHandler: () => {}
      };
    case Types.SHOW_LOADING:
      return {
        ...state,
        visible: true,
        message: "Loading...",
        primaryButtonText: "",
        primaryButtonHandler: () => {},
        secondaryButtonText: "",
        secondaryButtonHandler: () => {}
      };

    default:
      return state;
  }
};

export default messagesReducer;