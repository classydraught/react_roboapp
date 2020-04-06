import React, { Component } from "react";
import Header from "./HeaderComponent";
import About from "./AboutComponent";
import Home from "./HomeComponent";
import CourseDetail from "./CourseDetailComponent";
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
} from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    courses: state.courses,
    members: state.members,
    reviews: state.reviews,
    promotions: state.promotions,
  };
};

const mapDispatchToProps = (dispatch) => ({
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
  postReview: (courseID, value, author, comment) =>
    dispatch(postReview(courseID, value, author, comment)),
  postFeedback: (
    firstname,
    lastname,
    telnum,
    email,
    agree,
    contactType,
    message
  ) =>
    dispatch(
      postFeedback(
        firstname,
        lastname,
        telnum,
        email,
        agree,
        contactType,
        message
      )
    ),
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  },
});

class Main extends Component {
  componentDidMount() {
    this.props.fetchCourses();
    this.props.fetchMembers();
    this.props.fetchPromotions();
    this.props.fetchReviews();
  }
  render() {
    const HomePage = () => {
      return (
        <Home
          course={
            this.props.courses.courses.filter((course) => course.featured)[0]
          }
          courseLoading={this.props.courses.isLoading}
          courseErrorMsg={this.props.courses.errMess}
          promotion={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
          promosLoading={this.props.promotions.isLoading}
          promosErrorMsg={this.props.promotions.errMess}
          member={
            this.props.members.members.filter((member) => member.featured)[0]
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
              (course) => course._id === match.params.courseId
            )[0]
          }
          isLoading={this.props.courses.isLoading}
          errMess={this.props.courses.errMess}
          reviews={this.props.reviews.reviews.filter(
            (review) => review.courseId === match.params.courseId
          )}
          reviewserrMess={this.props.reviews.errMess}
          postReview={this.props.postReview}
        />
      );
    };
    return (
      <div>
        <Header />
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
                path="/contactus"
                component={() => (
                  <Contact
                    resetFeedbackForm={this.props.resetFeedbackForm}
                    postFeedback={this.props.postFeedback}
                  />
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
