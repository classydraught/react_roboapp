import React from "react";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { lime, grey } from "@material-ui/core/colors";
import { FadeTransform } from "react-animation-components";

import { Link } from "react-router-dom";

import { Loading } from "./LoadingComponent";

import { baseUrl } from "../shared/baseUrl";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
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
    backgroundColor: lime["A200"],
    color: grey[900]
  }
}));
function RenderCourse({ course }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className="profile-coursecard mt-1 mb-2 ">
      <Link to={`/courses/${course._id}`}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              src={baseUrl + course.image}
            ></Avatar>
          }
          title={course.name}
        />
        <CardMedia className={classes.media} image={baseUrl + course.image} />
      </Link>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <i className="fa fa-heart"></i>
        </IconButton>
        <IconButton aria-label="share">
          <i className="fa fa-share-square"></i>
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <i className="fa fa-arrow-circle-down"></i>
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>{course.description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
const Course = props => {
  const courseCatalog = props.courses.courses.map(course => {
    return (
      <div key={course._id} className="col-12 col-md-5 m-1">
        <FadeTransform
          in
          transformProps={{
            exitTransform: "scale(0.2) translateY(-20%)"
          }}
        >
          <RenderCourse course={course} />
        </FadeTransform>
      </div>
    );
  });
  if (props.courses.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.courses.errMess) {
    return (
      <div className="container">
        <div className="row" style={{ height: "50vh" }}>
          <h4>{props.courses.errMess}</h4>
        </div>
      </div>
    );
  } else {
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
            <BreadcrumbItem active>Courses</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Courses offered</h3>
            <hr />
          </div>
        </div>

        <div className="row">{courseCatalog}</div>
      </div>
    );
  }
};

export default Course;
