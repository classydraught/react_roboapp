import React, { Component } from "react";
import Header from "./HeaderComponent";
import About from "./AboutComponent";
import Home from "./HomeComponent";
import Register from "./RegisterComponent";
import CourseDetail from "./CourseDetailComponent";
import Profile from "./ProfileComponent";
import AddCourse from "./AddingCourseComponent";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Course from "./CourseComponent";
import Contact from "./ContactComponent";
import Footer from "./FooterComponent";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { connect } from "react-redux";
import { actions } from "react-redux-form";

import {
  fetchCourses,
  fetchMembers,
  fetchPromotions,
  fetchReviews,
  postReview,
  postFeedback,
  loginUser,
  LogOutUser,
  addUserCourse
} from "../redux/ActionCreators";

const mapStateToProps = state => {
  return {
    courses: state.courses,
    members: state.members,
    reviews: state.reviews,
    promotions: state.promotions,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCourses: () => {
    dispatch(fetchCourses());
  },
  fetchPromotions: () => {
    dispatch(fetchPromotions());
  },
  fetchMembers: () => {
    dispatch(fetchMembers());
  },
  fetchReviews: () => {
    dispatch(fetchReviews());
  },
  addUserCourse: course => {
    dispatch(addUserCourse(course));
  },
  postReview: (courseID, value, author, comment) =>
    dispatch(postReview(courseID, value, author, comment)),
  postFeedback: (
    firstname,
    lastname,
    phone,
    email,
    agree,
    contactType,
    message
  ) =>
    dispatch(
      postFeedback(
        firstname,
        lastname,
        phone,
        email,
        agree,
        contactType,
        message
      )
    ),
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },

  resetUserDetails: () => {
    dispatch(actions.reset("register"));
  },
  loginUser: (email, password) => {
    dispatch(loginUser(email, password));
  },
  LogOutUser: () => {
    dispatch(LogOutUser());
  }
});

class Main extends Component {
  constructor(props) {
    super(props);
    this.CourseCatalog = this.CourseCatalog.bind(this);
  }

  componentDidMount() {
    this.props.fetchCourses();
    this.props.fetchMembers();
    this.props.fetchPromotions();
    this.props.fetchReviews();
  }
  CourseCatalog() {
    if (this.props.user.LoggedIn) {
      const UserCourses = [];
      for (let id of this.props.user.UserData.usercourses) {
        for (let course of this.props.courses.courses) {
          if (course._id === id) {
            UserCourses.push(course);
          }
        }
      }
      return UserCourses;
    } else {
      return;
    }
  }
  render() {
    const HomePage = () => {
      return (
        <Home
          course={
            this.props.courses.courses.filter(course => course.featured)[0]
          }
          courseLoading={this.props.courses.isLoading}
          courseErrorMsg={this.props.courses.errMess}
          promotion={
            this.props.promotions.promotions.filter(promo => promo.featured)[0]
          }
          promosLoading={this.props.promotions.isLoading}
          promosErrorMsg={this.props.promotions.errMess}
          member={
            this.props.members.members.filter(member => member.featured)[0]
          }
          memberLoading={this.props.members.isLoading}
          memberErrorMsg={this.props.members.errMess}
        />
      );
    };
    const CourseDetailId = ({ match }) => {
      return (
        <CourseDetail
          course={
            this.props.courses.courses.filter(
              course => course._id === match.params.courseId
            )[0]
          }
          isLoading={this.props.courses.isLoading}
          errMess={this.props.courses.errMess}
          reviews={this.props.reviews.reviews.filter(
            review => review.courseId === match.params.courseId
          )}
          reviewserrMess={this.props.reviews.errMess}
          postReview={this.props.postReview}
        />
      );
    };
    return (
      <div>
        <Header
          loginUser={this.props.loginUser}
          LogOutUser={this.props.LogOutUser}
          user={this.props.user}
        />
        <TransitionGroup>
          <CSSTransition
            key={this.props.location.key}
            classNames="page"
            timeout={300}
          >
            <Switch location={this.props.location}>
              <Route exact path="/home" component={HomePage} />
              <Route
                exact
                path="/aboutus"
                component={() => <About members={this.props.members} />}
              />
              <Route
                exact
                path="/courses"
                component={() => <Course courses={this.props.courses} />}
              />
              <Route path="/courses/:courseId" component={CourseDetailId} />
              <Route
                exact
                path="/profile"
                component={() => (
                  <Profile
                    user={this.props.user}
                    courses={this.CourseCatalog()}
                  />
                )}
              />
              <Route
                exacr
                path="/addcourse"
                component={() => (
                  <AddCourse
                    user={this.props.user}
                    addUserCourse={this.props.addUserCourse}
                  />
                )}
              />
              <Route
                exact
                path="/contactus"
                component={() => (
                  <Contact
                    resetFeedbackForm={this.props.resetFeedbackForm}
                    postFeedback={this.props.postFeedback}
                  />
                )}
              />
              <Route
                exact
                path="/register"
                component={() => (
                  <Register resetUserDetails={this.props.resetUserDetails} />
                )}
              />

              <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
