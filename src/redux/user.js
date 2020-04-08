import * as actionTypes from "./ActionTypes";

export const User = (
  state = {
    LoggedIn: sessionStorage.getItem("RoboName") ? true : false,
    UserData: {
      username: sessionStorage.getItem("RoboName"),
      email: sessionStorage.getItem("RoboMail"),
    },
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        LoggedIn: true,
        errMess: null,
        UserData: action.payload,
      };
    case actionTypes.LOGOUT_USER:
      sessionStorage.removeItem("RoboName");
      sessionStorage.removeItem("RoboMail");
      sessionStorage.removeItem("RoboKey");
      return {
        ...state,
        LoggedIn: false,
        errMess: null,
        UserData: action.payload,
      };
    default:
      return state;
  }
};
