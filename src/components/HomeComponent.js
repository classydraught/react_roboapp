import React from "react";
import { FadeTransform } from "react-animation-components";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
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
    backgroundColor: lime["A200"],
    color: grey[900],
  },
}));

function RenderCard({ item, isLoading, errMess, itemInfo }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  if (isLoading) {
    return <Loading />;
  } else if (errMess) {
    return <h4>{errMess}</h4>;
  } else {
    return (
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.2) translateY(-20%)",
        }}
      >
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {item.name.charAt(0)}
              </Avatar>
            }
            title={itemInfo}
          />
          <CardMedia
            className={classes.media}
            image={baseUrl + item.image}
            title="Paella dish"
          />
          <CardContent>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className="text-center"
            >
              {item.name}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <i class="fa fa-heart"></i>
            </IconButton>
            <IconButton aria-label="share">
              <i class="fa fa-share-square"></i>
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <i class="fa fa-arrow-circle-down"></i>
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography>{item.description}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </FadeTransform>
    );
  }
}

function Home(props) {
  return (
    <div className="container mt-3 mb-3">
      <div className="row text-center">
        <div className="col-12">
          <h4>Featured promotions</h4>
        </div>
      </div>
      <hr></hr>
      <div className="row mx-auto">
        <div className="col-12 col-md mb-3 ">
          <RenderCard
            isLoading={props.courseLoading}
            item={props.course}
            errMess={props.courseErrorMsg}
            itemInfo="Featured course"
          />
        </div>
        <div className="col-12 col-md m-1 mb-3 ">
          <RenderCard
            isLoading={props.memberLoading}
            item={props.member}
            errMess={props.memberLoading}
            itemInfo="Featured tutor"
          />
        </div>
        <div className="col-12 col-md m-1 mb-3">
          <RenderCard
            isLoading={props.promosLoading}
            item={props.promotion}
            errMess={props.promosErrorMsg}
            itemInfo="Featured live class"
          />
        </div>{" "}
      </div>
    </div>
  );
}

export default Home;
