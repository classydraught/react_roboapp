import React, { Component } from "react";
import { Label, Col, Row, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Control, Form, Errors } from "react-redux-form";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const required = (value) => value && value.length;
const maxLength = (length) => (value) => !value || value.length <= length;
const minLength = (length) => (value) => value && value.length >= length;
const validEmail = (value) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i.test(value);

class Register extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.userRegister(values.username, values.email, values.password);
    this.props.resetUserDetails();
  }

  render() {
    console.log(this.props);

    return (
      <div className="container">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>Register</BreadcrumbItem>
        </Breadcrumb>
        <div className="row">
          <div className="col-12 col-md-9 mt-4">
            <h2>We wont ask much!</h2>
            <hr></hr>
            <Form
              model="register"
              onSubmit={(values) => this.handleSubmit(values)}
            >
              <Row className="form-group">
                <Label htmlFor="username" md={3}>
                  First name
                </Label>
                <Col md={9}>
                  <Control.text
                    model=".username"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="User name"
                    validators={{
                      required,
                      minLength: minLength(6),
                      maxLength: maxLength(16),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".username"
                    show="touched"
                    messages={{
                      required: "Required ",
                      minLength: "Must be greater than 6 characters ",
                      maxLength: "Must be 16 characters or less ",
                    }}
                  />
                </Col>
              </Row>

              <Row className="form-group">
                <Label htmlFor="email" md={3}>
                  Email
                </Label>
                <Col md={9}>
                  <Control.text
                    model=".email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email address"
                    validators={{ required, validEmail }}
                  />
                  <Errors
                    className="text-danger"
                    model=".email"
                    show="touched"
                    messages={{
                      required: "Required ",
                      validEmail: "Invalid email address ",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="password" md={3}>
                  Password
                </Label>
                <Col md={9}>
                  <Control.password
                    model=".password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    validators={{
                      required,
                      minLength: minLength(8),
                      maxLength: maxLength(16),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".password"
                    show="touched"
                    messages={{
                      required: "Required ",
                      minLength: "Must be greater than 8 characters ",
                      maxLength: "Must be 16 characters or less ",
                    }}
                  />
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
      </div>
    );
  }
}

export default Register;
