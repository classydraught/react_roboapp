import React from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  Media,
} from "reactstrap";
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
import { Stagger, Fade } from "react-animation-components";

function Rendermember({ member }) {
  return (
    <Fade in key={member._id}>
      <div className="col-12 mt-2">
        <Media tag="li">
          <Media left middle>
            <Media
              object
              src={baseUrl + member.image}
              alt={member.name}
              style={{ width: "128px", height: "128px" }}
            />
          </Media>
          <Media body className="ml-4">
            <h4>{member.name}</h4>
            <p>{member.designation}</p>
            <p className="d-none d-sm-block">{member.description}</p>
          </Media>
        </Media>
        <hr></hr>
      </div>
    </Fade>
  );
}

function About(props) {
  const members = props.members.members.map((member) => {
    return <Rendermember member={member} key={member._id} />;
  });

  if (props.members.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.members.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.members.errMess}</h4>
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
                  color: "#0b0704",
                }}
              >
                Home
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>About</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>About</h3>
            <hr />
          </div>
        </div>
        <div className="row row-content">
          <div className="col-12 col-md-6">
            <h2>Our History</h2>
            <p>
              Robovidhya is established with the motive of creating industry
              ready professionals by filling the gap between industry and
              students, professionals. At Robovidhya, our aim is to upgrade the
              skills and improve the employability of students and enhancing the
              skills of professionals by transforming them into real time and
              productive engineers who can build the new things that can change
              the world. ​ Our aim is to offer live Hands-On-Sessions to the
              candidates which will help them to understand the theoretical as
              well as the practical aspects of the innovative World. ​ We offer
              training programs that are certified by industry and delivered by
              well qualified professionals. We strongly believe in up-gradation
              of technical skills can enhance the chances of becoming industry
              ready professionals
            </p>
          </div>
          <div className="col-12 col-md-5">
            <Card>
              <CardHeader className="bg-primary text-white">
                Facts At a Glance
              </CardHeader>
              <CardBody>
                <dl className="row p-1">
                  <dt className="col-6">Started</dt>
                  <dd className="col-6">3 Feb. 2019</dd>
                  <dt className="col-6">Major Stake Holder</dt>
                  <dd className="col-6">Synxa IT. PVT LTD.</dd>
                  <dt className="col-6">Last Year's Turnover</dt>
                  <dd className="col-6">$1,250,37</dd>
                  <dt className="col-6">Employees</dt>
                  <dd className="col-6">40</dd>
                </dl>
              </CardBody>
            </Card>
          </div>
          <div className="col-12">
            <Card>
              <CardBody className="bg-faded">
                <blockquote className="blockquote">
                  <p className="mb-0">
                    “Change is the end result of all true
                    <strong> learning.</strong> “
                  </p>
                  <footer className="blockquote-footer">
                    Leo Buscaglia Quotes,
                    <cite title="Source Title">
                      The Fall of Freddie the Leaf, 1982
                    </cite>
                  </footer>
                </blockquote>
              </CardBody>
            </Card>
          </div>
        </div>
        <div className="row row-content">
          <div className="col-12">
            <h2>Corporate Leadership</h2>
          </div>
          <div className="col-12">
            <Stagger in>
              <Media list>{members}</Media>
            </Stagger>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
