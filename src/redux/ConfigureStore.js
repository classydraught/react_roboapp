import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { Courses } from "./courses";
import { Members } from "./members";
import { Promotions } from "./promotions";
import { Reviews } from "./reviews";
import { createForms } from "react-redux-form";
import { InitialFeedback } from "./forms";
export const storeConfig = () => {
  const store = createStore(
    combineReducers({
      courses: Courses,
      members: Members,
      promotions: Promotions,
      reviews: Reviews,
      ...createForms({ feedback: InitialFeedback }),
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
