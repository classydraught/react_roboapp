import * as actionTypes from "./ActionTypes";

export const User = (
  state = {
    LoggedIn: localStorage.getItem("RoboName") ? true : false,
    UserData: {
      username: localStorage.getItem("RoboName"),
      email: localStorage.getItem("RoboMail"),
      propic: localStorage.getItem("profilepic"),
      id: localStorage.getItem("id"),
      usercourses: localStorage.getItem("courses"),
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
      localStorage.removeItem("RoboName");
      localStorage.removeItem("RoboMail");
      localStorage.removeItem("RoboKey");
      localStorage.removeItem("id");
      localStorage.removeItem("courses");
      localStorage.removeItem("profilepic");

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
