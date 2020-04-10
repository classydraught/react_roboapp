import React, { Component } from "react";
import {
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
  Label,
  Row,
  Modal,
  ModalHeader,
  ModalBody
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
import Button from "@material-ui/core/Button";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { Control, LocalForm, Errors } from "react-redux-form";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

const required = value => value && value.length;
const maxLength = length => value => !value || value.length <= length;
const minLength = length => value => value && value.length >= length;

class ReviewForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
      starRating: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleComment = this.handleComment.bind(this);
    this.purchase = this.purchase.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: parseInt(value)
    });
  }
  handleComment(values) {
    this.toggleModal();
    this.props.postReview(
      this.props.courseId,
      this.state.starRating,
      localStorage.getItem("RoboName"),

      values.comment
    );
  }
  purchase() {
    this.props.purchaseCourse(localStorage.getItem("id"), this.props.courseId);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render() {
    console.log(this.props);
    return (
      <>
        {localStorage.getItem("RoboKey") ? (
          localStorage
            .getItem("courses")
            .split(",")
            .includes(this.props.courseId) ? (
            <Button variant="outlined" onClick={this.toggleModal} size="large">
              <RateReviewIcon />
              &nbsp;&nbsp;Add review
            </Button>
          ) : (
            <Button variant="outlined" size="large" onClick={this.purchase}>
              <ShoppingBasketIcon />
              &nbsp;&nbsp; Add course
            </Button>
          )
        ) : null}
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit comment</ModalHeader>
          <ModalBody>
            <LocalForm className="container" onSubmit={this.handleComment}>
              <Row className="form-group">
                <Label htmlFor="rating">Rating&nbsp;&nbsp;&nbsp;</Label>
                <Rating
                  defaultValue={this.state.starRating}
                  id="starRating"
                  name="starRating"
                  onChange={this.handleInputChange}
                />
              </Row>

              <Row className="form-group">
                <Label htmlFor="comment">Comment</Label>
                <Control.textarea
                  rows={6}
                  model=".comment"
                  className="form-control"
                  id="comment"
                  name="comment"
                  placeholder="Your comment"
                  validators={{
                    required,
                    minLength: minLength(4),
                    maxLength: maxLength(70)
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".comment"
                  show="touched"
                  messages={{
                    required: "Required ",
                    minLength: "Must be greater than 2 characters "
                  }}
                />
              </Row>
              <Row>
                <Button type="submit" variant="outlined" size="large">
                  <i className="fa fa-paper-plane">&nbsp;&nbsp;Post</i>
                </Button>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

const totalRating = reviews => {
  let sum = 0;
  reviews.reviews.map(review => (sum += review.value));
  return sum / reviews.reviews.length;
};

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: "100vw"
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: amber["A200"]
  }
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
          day: "2-digit"
        }).format(new Date(Date.parse(review.date)))}
      />

      <CardContent>
        <Rating name="read-only" value={review.value} readOnly />{" "}
        <span className="ml-5">
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded
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
          exitTransform: "scale(0.2) translateY(-20%)"
        }}
      >
        <div className="card profile-coursecard mb-3">
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

function RenderReviews({ reviews, courseId, postReview, purchaseCourse }) {
  if (reviews != null) {
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Reviews</h4>
        <hr />
        <ul className="list-unstyled">
          <Stagger in>
            {reviews.map(review => {
              return (
                <Fade in key={review._id}>
                  <li className="mb-3">
                    <RecipeReviewCard review={review} />
                  </li>
                </Fade>
              );
            })}
          </Stagger>
        </ul>
        <ReviewForm
          courseId={courseId}
          postReview={postReview}
          purchaseCourse={purchaseCourse}
        />
      </div>
    );
  } else {
    return <div></div>;
  }
}

const CourseDetail = props => {
  console.log(props);
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
              <Link
                to="/home"
                style={{
                  color: "#0b0704"
                }}
              >
                Home
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Link
                to="/courses"
                style={{
                  color: "#0b0704"
                }}
              >
                Courses
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.course.name}</BreadcrumbItem>{" "}
          </Breadcrumb>
          <div className="col-12 col-6">
            <h3>{props.course.name}</h3> <hr />
          </div>
        </div>
        <div className="row">
          <RenderCourse course={props.course} reviews={props.reviews} />
          <RenderReviews
            reviews={props.reviews}
            courseId={props.course._id}
            postReview={props.postReview}
            purchaseCourse={props.purchaseCourse}
          />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default CourseDetail;
