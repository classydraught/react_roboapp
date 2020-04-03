import * as actionTypes from "./ActionTypes";

export const Members = (
  state = {
    isLoading: true,
    errormsg: null,
    members: [],
  },
  action
) => {
  switch (action.type) {
    case actionTypes.ADD_MEMBERS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        members: action.payload,
      };

    case actionTypes.MEMBERS_LOADING:
      return { ...state, isLoading: true, errMess: null, members: [] };

    case actionTypes.MEMBERS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        members: [],
      };

    default:
      return state;
  }
};
