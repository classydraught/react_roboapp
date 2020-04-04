import * as actionTypes from "./ActionTypes";
export const Reviews = (
  state = {
    errMess: null,
    reviews: [],
  },
  action
) => {
  switch (action.type) {
    case actionTypes.ADD_REVIEW:
      let review = action.payload;
      return { ...state, reviews: state.reviews.concat(review) };

    case actionTypes.ADD_REVIEWS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        reviews: action.payload,
      };
    case actionTypes.REVIEWS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        reviews: [],
      };

    default:
      return state;
  }
};
