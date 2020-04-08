import * as actionTypes from "./ActionTypes";

export const User = (
  state = {
    LoggedIn: false,
    UserData: [],
    errMess: null,
  },
  action
) => {
  switch (action.type) {
    default:
      return state;
  }
};
