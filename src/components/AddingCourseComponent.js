import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Label, Col, Row } from "reactstrap";
import { Control, Form, Errors } from "react-redux-form";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { baseUrl } from "../shared/baseUrl";

const required = value => value && value.length;
const maxLength = length => value => !value || value.length <= length;
const minLength = length => value => value && value.length >= length;
const isNumber = value => !isNaN(Number(value));
class AddCourse extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(values) {
    let form_data = new FormData();

    form_data.append(
      "courseImage",
      values.courseImage[0],
      values.courseImage.name
    );

    form_data.append("name", values.name);
    form_data.append("category", values.category);
    form_data.append("description", values.description);
    form_data.append("price", values.price);
    form_data.append("featured", values.featured);

    let url = baseUrl + "courses";
    axios
      .post(url, form_data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("RoboKey")
        }
      })
      .then(
        response => {
          if (response.status === 201) {
            alert("Course created");
            this.props.addUserCourse(response.data.createdProduct);
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
      .catch(err => alert("Course Not created" + err));
  }
  render() {
    if (this.props.user.LoggedIn)
      return (
        <div className="container">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link
                style={{
                  color: "#0b0704",
                  textDecoration: "none"
                }}
              >
                Home
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Add Course</BreadcrumbItem>
          </Breadcrumb>
          <div className="row">
            <div className="col-12">
              <h2>Add Course details</h2>
            </div>
          </div>
          <hr></hr>
          <div className="col-12 col-md-9">
            <Form
              model="CourseDetails"
              onSubmit={values => this.handleSubmit(values)}
            >
              <Row className="form-group">
                <Label htmlFor="Coursename" md={3}>
                  Course name
                </Label>
                <Col md={9}>
                  <Control.text
                    model=".name"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Course name"
                    validators={{
                      required,
                      minLength: minLength(2),
                      maxLength: maxLength(16)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: "Required ",
                      minLength: "Must be greater than 6 characters ",
                      maxLength: "Must be 16 characters or less "
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="price" md={3}>
                  Price
                </Label>
                <Col md={4}>
                  <Control.text
                    model=".price"
                    className="form-control"
                    id="price"
                    name="price"
                    placeholder="price"
                    validators={{
                      required,
                      isNumber
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".price"
                    show="touched"
                    messages={{
                      required: "Required ",
                      isNumber: "Should be number only"
                    }}
                  />
                </Col>
                <Col md={{ size: 4 }}>
                  <div className="form-check">
                    <Label check>
                      <Control.checkbox
                        model=".featured"
                        className="form-check-input"
                        name="featured"
                      />{" "}
                      <strong>featured?</strong>
                    </Label>
                  </div>
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="Category" md={3}>
                  Category
                </Label>
                <Col md={9}>
                  <Control.text
                    model=".category"
                    className="form-control"
                    id="category"
                    name="category"
                    placeholder="Category"
                    validators={{
                      required,
                      minLength: minLength(8),
                      maxLength: maxLength(16)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".category"
                    show="touched"
                    messages={{
                      required: "Required ",
                      minLength: "Must be greater than 8 characters ",
                      maxLength: "Must be 16 characters or less "
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="description" md={3}>
                  Description
                </Label>
                <Col md={9}>
                  <Control.textarea
                    model=".description"
                    id="description"
                    name="description"
                    required
                    className="form-control"
                  ></Control.textarea>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="courseImage" md={3}>
                  Course Image
                </Label>
                <Col md={9}>
                  <Control.file
                    model=".courseImage"
                    id="courseImage"
                    name="courseImage"
                    required
                    className="custom-file"
                  ></Control.file>
                </Col>
              </Row>

              <Row className="form-group">
                <Col md={{ size: 9, offset: 3 }}>
                  <Button type="submit" variant="outlined" size="medium">
                    <i className="fa fa-user-plus"></i>&nbsp;&nbsp;Register
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      );
    return (
      <div className="container">
        <div className="row">Not logged in</div>
        <Redirect to="/home" />
      </div>
    );
  }
}
export default AddCourse;
