import React from "react";
import {
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { amber } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Rating from "@material-ui/lab/Rating";
import { Link } from "react-router-dom";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Stagger, Fade } from "react-animation-components";

const totalRating = (reviews) => {
  let sum = 0;
  reviews.reviews.map((review) => (sum += review.value));
  return sum / reviews.reviews.length;
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100vw",
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: amber["A200"],
  },
}));

function RecipeReviewCard({ review }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}></Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={review.author}
        subheader={new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        }).format(new Date(Date.parse(review.date)))}
      />

      <CardContent>
        <Rating name="read-only" value={review.value} readOnly />{" "}
        <span className="ml-5">
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </span>
      </CardContent>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>{review.comment}</CardContent>
      </Collapse>
    </Card>
  );
}
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
        <div className="card">
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
        </div>
      </FadeTransform>
    </div>
  );
}

function RenderReviews({ reviews, courseId }) {
  if (reviews != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Reviews</h4>
        <hr />
        <ul className="list-unstyled">
          <Stagger in>
            {reviews.map((review) => {
              return (
                <Fade in key={review.id}>
                  <li className="mb-3">
                    <RecipeReviewCard review={review} />
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
