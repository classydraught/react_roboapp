import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Stagger, Fade } from "react-animation-components";
import Divider from "@material-ui/core/Divider";
const totalRating = (reviews) => {
  let sum = 0;
  reviews.reviews.map((review) => (sum += review.value));
  return sum / reviews.reviews.length;
};

function RenderCourse({ course, reviews }) {
  let finalRating = totalRating({ reviews });
  return (
    <div className="col-12 col-md-5 m-1">
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.2) translateY(-20%)",
        }}
      >
        <Card>
          <CardImg top src={baseUrl + course.image} alt={course.name} />
          <CardBody>
            <CardTitle>{course.name}</CardTitle>

            <Rating
              name="read-only"
              value={finalRating}
              readOnly
              precision={0.1}
            />

            <CardText>{course.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    </div>
  );
}

function RenderReviews({ reviews, courseId }) {
  if (reviews != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Reviews</h4>
        <Divider />

        <ul className="list-unstyled">
          <Stagger in>
            {reviews.map((review) => {
              return (
                <Fade in key={review.id}>
                  <li>
                    <p>
                      {review.author},{" "}
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }).format(new Date(Date.parse(review.date)))}{" "}
                    </p>
                    <Rating name="read-only" value={review.value} readOnly />
                    <p>"{review.comment}"</p>
                    <Divider></Divider>
                  </li>
                </Fade>
              );
            })}
          </Stagger>
        </ul>
      </div>
    );
  } else {
    return <div></div>;
  }
}

const CourseDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.course != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link to="/courses">Courses</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.course.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.course.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCourse course={props.course} reviews={props.reviews} />
          <RenderReviews reviews={props.reviews} courseId={props.course.id} />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default CourseDetail;
