const initialState = null;

export const notificationAction = (message) => {
  return {
    type: "INFO",
    message,
  };
};

export const removeNotificationAction = () => {
  return {
    type: "HIDE_INFO",
  };
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INFO":
      state = action.message;
      return state;
    case "HIDE_INFO":
      return null;
    default:
      return state;
  }
};

export default notificationReducer;
