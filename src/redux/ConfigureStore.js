import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Courses } from "./courses";
import { Members } from "./members";
import { Promotions } from "./promotions";
import { Reviews } from "./reviews";

export const storeConfig = () => {
  const store = createStore(
    combineReducers({
      courses: Courses,
      members: Members,
      promotions: Promotions,
      reviews: Reviews,
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
