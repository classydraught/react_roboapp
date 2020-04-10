import * as actionTypes from "./ActionTypes";
export const Courses = (
  state = {
    isLoading: true,
    errMess: null,
    courses: []
  },
  action
) => {
  switch (action.type) {
    case actionTypes.ADD_COURSES:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        courses: action.payload
      };

    case actionTypes.COURSES_LOADING:
      return { ...state, isLoading: true, errMess: null, courses: [] };

    case actionTypes.COURSES_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        courses: []
      };
    case actionTypes.ADD_USER_COURSE:
      return {
        ...state,
        courses: state.courses.concat(action.payload)
      };

    default:
      return state;
  }
};
