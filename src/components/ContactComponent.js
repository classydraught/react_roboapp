import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Label, Col, Row } from "reactstrap";
import { Control, Form, Errors } from "react-redux-form";
import Button from "@material-ui/core/Button";

const required = (value) => value && value.length;
const maxLength = (length) => (value) => !value || value.length <= length;
const minLength = (length) => (value) => value && value.length >= length;
const isNumber = (value) => !isNaN(Number(value));
const validEmail = (value) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,10}$/i.test(value);

class Contact extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    this.props.postFeedback(
      values.firstname,
      values.lastname,
      values.telnum,
      values.email,
      values.agree,
      values.contactType,
      values.message
    );

    this.props.resetFeedbackForm();
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Contact</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>Contact</h3>
            <hr />
          </div>
        </div>
        <div className="row row-content">
          <div className="col-12 col-sm-4 offset-sm-1">
            <h5>Our Address</h5>
            <address>
              Mohan Elite Apartment, Plot-51
              <br />
              Kothaguda, Hi-Tech City
              <br />
              Hyderabad, India.
              <br />
              <i className="fa fa-phone"></i>: +91 7673979429
              <br />
              <i className="fa fa-envelope"></i>:{" "}
              <a href="mailto:cskavi34@gmail.com">cskavi34@gmail.com</a>
              <br></br>
              <br></br>
              <div className="btn-group" role="group">
                <a
                  role="button"
                  className="btn btn-primary"
                  href="tel:+917673979429"
                >
                  <i className="fa fa-phone"></i> Call
                </a>
                <a
                  role="button"
                  className="btn btn-success"
                  href="mailto:cskavi34@gmail.com"
                >
                  <i className="fa fa-envelope-o"></i> Email
                </a>
              </div>
            </address>
          </div>
          <div className="col-12 col-sm-6 offset-sm-1 mt-3 mt-sm-0">
            <h3>Location Information</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.9710286090194!2d78.3841065!3d17.4611007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb917283e616df%3A0x93fc135bbe6cbc99!2sRakesh%20Tech%20Solutions!5e0!3m2!1sen!2sin!4v1585997464072!5m2!1sen!2sin"
              width="350"
              height="350"
              frameborder="0"
              allowfullscreen=""
              aria-hidden="false"
              tabindex="0"
              title="map"
            ></iframe>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-9 mt-4">
            <h2>Want to host your courses on our platform?</h2>
            <hr></hr>
            <Form
              model="feedback"
              onSubmit={(values) => this.handleSubmit(values)}
            >
              <Row className="form-group">
                <Label htmlFor="firstname" md={3}>
                  First name
                </Label>
                <Col md={9}>
                  <Control.text
                    model=".firstname"
                    className="form-control"
                    id="firstname"
                    name="firstname"
                    placeholder="First name"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(16),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".firstname"
                    show="touched"
                    messages={{
                      required: "Required ",
                      minLength: "Must be greater than 2 characters ",
                      maxLength: "Must be 16 characters or less ",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="lastname" md={3}>
                  Last name
                </Label>
                <Col md={9}>
                  <Control.text
                    model=".lastname"
                    className="form-control"
                    id="lastname"
                    name="lastname"
                    placeholder="Last name"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(32),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".lastname"
                    show="touched"
                    messages={{
                      required: "Required ",
                      minLength: "Must be greater than 2 characters ",
                      maxLength: "Must be 32 characters or less ",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="phone" md={3}>
                  Phone
                </Label>
                <Col md={9}>
                  <Control.text
                    model=".phone"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Phone number"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(16),
                      isNumber,
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".phone"
                    show="touched"
                    messages={{
                      required: "Required ",
                      minLength: "Must be greater than 2 numbers ",
                      maxLength: "Must be 16 numbers or less ",
                      isNumber: "Must be numbers ",
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
                <Col md={{ size: 4, offset: 3 }}>
                  <div className="form-check">
                    <Label check>
                      <Control.checkbox
                        model=".agree"
                        className="form-check-input"
                        name="agree"
                      />{" "}
                      <strong>May we contact you?</strong>
                    </Label>
                  </div>
                </Col>
                <Col md={5}>
                  <Control.select
                    model=".contactType"
                    className="form-control"
                    name="contactType"
                  >
                    <option>Phone</option>
                    <option>Email</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="message" md={3}>
                  Your feedback
                </Label>
                <Col md={9}>
                  <Control.text
                    model=".message"
                    className="form-control"
                    rows="6"
                    id="message"
                    name="message"
                    placeholder="Your feedback"
                    validators={{ required }}
                  />
                  <Errors
                    className="text-danger"
                    model=".message"
                    show="touched"
                    messages={{
                      required: "Required ",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{ size: 9, offset: 3 }}>
                  <Button type="submit" variant="outlined" size="large">
                    <i className="fa fa-paper-plane">&nbsp;&nbsp;Submit</i>
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

export default Contact;
