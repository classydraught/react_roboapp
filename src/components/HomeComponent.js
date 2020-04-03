import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import { FadeTransform } from "react-animation-components";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";

function RenderCard({ item, isLoading, errMess }) {
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
        <Card className="card-style my-5">
          <CardImg
            src={baseUrl + item.image}
            alt={item.name}
            className="card-image img-fluid"
          />
          <CardBody className="card-text">
            <CardTitle className="text-center">{item.name}</CardTitle>
            {item.designation ? (
              <CardSubtitle className="text-center">
                {item.designation}
              </CardSubtitle>
            ) : null}
            <CardText className="text-justify">{item.description}</CardText>
          </CardBody>
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
        <div className="col-12 col-md ">
          <RenderCard
            isLoading={props.courseLoading}
            item={props.course}
            errMess={props.courseErrorMsg}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            isLoading={props.memberLoading}
            item={props.member}
            errMess={props.memberLoading}
          />
        </div>
        <div className="col-12 col-md m-1">
          <RenderCard
            isLoading={props.promosLoading}
            item={props.promotion}
            errMess={props.promosErrorMsg}
          />
        </div>{" "}
      </div>
    </div>
  );
}

export default Home;
