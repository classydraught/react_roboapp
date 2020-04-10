import * as actionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const fetchCourses = () => dispatch => {
  dispatch(coursesLoading(true));

  return fetch(baseUrl + "courses")
    .then(
      response => {
        console.log(response);
        if (response.ok) {
          return response;
        } else {
          let error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        let errormsg = new Error(error.message);
        throw errormsg;
      }
    )
    .then(response => response.json())
    .then(courses => dispatch(addCourses(courses)))
    .catch(error => dispatch(coursesFailed(error.message)));
};
export const addCourses = courses => ({
  type: actionTypes.ADD_COURSES,
  payload: courses
});

export const coursesLoading = () => ({
  type: actionTypes.COURSES_LOADING
});

export const coursesFailed = errormsg => ({
  type: actionTypes.COURSES_FAILED,
  payload: errormsg
});

// Leaders part

export const fetchMembers = () => dispatch => {
  dispatch(membersLoading(true));

  return fetch(baseUrl + "members")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          let error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        let errormsg = new Error(error.message);
        throw errormsg;
      }
    )
    .then(response => response.json())
    .then(members => dispatch(addMembers(members)))
    .catch(error => dispatch(membersFailed(error.message)));
};
export const addMembers = members => ({
  type: actionTypes.ADD_MEMBERS,
  payload: members
});

export const membersLoading = () => ({
  type: actionTypes.MEMBERS_LOADING
});

export const membersFailed = errormsg => ({
  type: actionTypes.MEMBERS_FAILED,
  payload: errormsg
});

// reviews section

export const fetchReviews = () => dispatch => {
  return fetch(baseUrl + "reviews")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          let error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        let errormsg = new Error(error.message);
        throw errormsg;
      }
    )
    .then(response => response.json())
    .then(reviews => dispatch(addReviews(reviews)))
    .catch(error => dispatch(reviewsFailed(error.message)));
};

export const reviewsFailed = errormsg => ({
  type: actionTypes.REVIEWS_FAILED,
  payload: errormsg
});

export const addReviews = reviews => ({
  type: actionTypes.ADD_REVIEWS,
  payload: reviews
});

// promotions loading

export const fetchPromotions = () => dispatch => {
  dispatch(promosLoading(true));

  return fetch(baseUrl + "promotions")
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          let error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        let errormsg = new Error(error.message);
        throw errormsg;
      }
    )
    .then(response => response.json())
    .then(promotions => dispatch(addPromos(promotions)))
    .catch(error => dispatch(promosFailed(error.message)));
};
export const addPromos = promotions => ({
  type: actionTypes.ADD_PROMOS,
  payload: promotions
});

export const promosLoading = () => ({
  type: actionTypes.PROMOS_LOADING
});

export const promosFailed = errormsg => ({
  type: actionTypes.PROMOS_FAILED,
  payload: errormsg
});

export const addReview = review => ({
  type: actionTypes.ADD_REVIEW,
  payload: review
});

export const postReview = (courseId, value, author, comment) => dispatch => {
  const newRating = {
    courseId: courseId,
    value: value,
    author: author,
    comment: comment
  };
  newRating.date = new Date().toISOString();

  return fetch(baseUrl + "reviews", {
    method: "POST",
    body: JSON.stringify(newRating),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("RoboKey")
    },
    credentials: "same-origin"
  })
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          let error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        let errormsg = new Error(error.message);
        throw errormsg;
      }
    )
    .then(response => response.json())
    .then(response => {
      dispatch(addReview(newRating));
      console.log(response);
    })
    .catch(error => {
      console.log("Post comments ", error.message);
      alert("Your comment could not be posted \n" + error.message);
    });
};
export const postFeedback = (
  firstname,
  lastname,
  phone,
  email,
  agree,
  contactType,
  message
) => dispatch => {
  const newFeeback = {
    firstname: firstname,
    lastname: lastname,
    phone: phone,
    email: email,
    agree: agree,
    contactType: contactType,
    message: message
  };
  newFeeback.date = new Date().toISOString();

  return fetch(baseUrl + "enquiry", {
    method: "POST",
    body: JSON.stringify(newFeeback),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        throw error;
      }
    )
    .then(response => response.json())
    .then(response =>
      alert("Thank you for your Intrest!\n" + JSON.stringify(response))
    )
    .catch(error => {
      console.log("Your feedback/enquiry haven't posted");
      alert(
        "Your feedback/enquiry could not be posted\nError: " + error.message
      );
    });
};

export const loginUser = (email, password) => dispatch => {
  const loginUser = {
    email: email,
    password: password
  };
  return fetch(baseUrl + "user/login", {
    method: "POST",
    body: JSON.stringify(loginUser),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
    .then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      error => {
        throw error;
      }
    )
    .then(response => response.json())
    .then(response => {
      localStorage.setItem("RoboKey", response.token);
      localStorage.setItem("RoboName", response.name);
      localStorage.setItem("RoboMail", response.email);
      localStorage.setItem("profilepic", response.image);
      localStorage.setItem("courses", response.courses);
      localStorage.setItem("id", response.id);
      dispatch(
        loggedinUser(
          response.email,
          response.name,
          response.id,
          response.image,
          response.courses
        )
      );
      window.location = "/profile";
    })
    .catch(error => {
      console.log(error);
      alert("Wrong Credentials/ Kindly check email or password");
    });
};

export const LogOutUser = () => dispatch => {
  dispatch(loggedOutUser());
};
export const loggedinUser = (email, username, id, image, usercourses) => ({
  type: actionTypes.LOGIN_USER,
  payload: {
    email: email,
    username: username,
    id: id,
    profilepic: image,
    courses: usercourses
  }
});
export const loggedOutUser = () => ({
  type: actionTypes.LOGOUT_USER,
  payload: {}
});

export const addUserCourse = course => dispatch => {
  dispatch(addCoursetoCourses(course));
};
export const addCoursetoCourses = course => ({
  type: actionTypes.ADD_USER_COURSE,
  payload: course
});
