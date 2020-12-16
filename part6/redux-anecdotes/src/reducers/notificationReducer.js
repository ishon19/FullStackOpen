const initialState = null;
var timerId = null;

export const notificationAction = (message, timeout) => {
  return async (dispatch) => {
    dispatch({
      type: "INFO",
      message,
    });
    timerId = setTimeout(() => {
      dispatch(removeNotificationAction(timerId));
    }, timeout * 1000);
  };
};

export const removeNotificationAction = () => {
  clearTimeout(timerId);
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
