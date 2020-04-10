import * as actionTypes from "./ActionTypes";

export const User = (
  state = {
    LoggedIn: localStorage.getItem("RoboName") ? true : false,
    UserData: {
      username: localStorage.getItem("RoboName"),
      email: localStorage.getItem("RoboMail"),
      propic: localStorage.getItem("profilepic"),
      id: localStorage.getItem("id"),
      usercourses: localStorage.getItem("RoboName")
        ? localStorage.getItem("courses").split(",")
        : null
    },
    errMess: null
  },
  action
) => {
  switch (action.type) {
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        LoggedIn: true,
        errMess: null,
        UserData: action.payload
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
        UserData: action.payload
      };
    case actionTypes.ADD_PUR_COURSE:
      localStorage.setItem(
        "courses",
        localStorage.getItem("courses") + "," + action.payload
      );
      console.log(action.payload);
      const nextState = {};
      nextState.LoggedIn = state.LoggedIn;
      nextState.errMess = state.errMess;
      let tempData = {
        username: localStorage.getItem("RoboName"),
        email: localStorage.getItem("RoboMail"),
        propic: localStorage.getItem("profilepic"),
        id: localStorage.getItem("id"),
        usercourses: state.UserData.usercourses.concat(action.payload)
      };
      nextState.UserData = tempData;
      return nextState;

    default:
      return state;
  }
};
