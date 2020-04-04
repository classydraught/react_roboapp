import React from "react";
import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <div className="footer">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-4 offset-1 col-sm-2">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/aboutus">About Us</Link>
              </li>
              <li>
                <Link to="/courses">Courses</Link>
              </li>
              <li>
                <Link to="/contactus">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="col-7 col-sm-5">
            <h5>Our Address</h5>
            <address>
              Mohan Elite Apartment ,Plot 51
              <br />
              Kothaguda
              <br />
              Hyderabad, India
              <br />
              <i className="fa fa-phone fa-lg"></i>: +91 7673979429
              <br />
              <i className="fa fa-fax fa-lg"></i>: +91 8297972202
              <br />
              <i className="fa fa-envelope fa-lg"></i>:{" "}
              <a href="mailto:cskavi34@gmail.com">cskavi34@gmail.com</a>
            </address>
          </div>
          <div className="col-12 col-sm-4 align-self-center">
            <div className="text-center">
              <i className="fa fa-twitter fa-lg mx-3"></i>
              <i className="fa fa-facebook fa-lg mx-3"></i>
              <i className="fa fa-google-plus-square fa-lg mx-3"></i>
              <i className="fa fa-envelope fa-lg mx-3"></i>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-auto">
            <p>© Copyright 2020 Robovidhya</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
