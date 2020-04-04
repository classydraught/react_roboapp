import React from "react";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Label,
  Col,
  Row,
} from "reactstrap";

function Contact() {
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
            width="400"
            height="400"
            frameborder="0"
            allowfullscreen=""
            aria-hidden="false"
            tabindex="0"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;
