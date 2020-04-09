import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Card, CardBody, CardImg } from "reactstrap";
import Divider from "@material-ui/core/Divider";

class Profile extends Component {
  render() {
    if (this.props.user.LoggedIn)
      return (
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-4">
              <Card className="my-3 profilecard">
                <CardImg
                  src="https://s3-us-west-2.amazonaws.com/lightstalking-assets/wp-content/uploads/2019/07/17103718/aaker-zyeuEIolkcY-unsplash.jpg"
                  className="image--cover mx-auto"
                />
                <h3>Avinash Bommi</h3>
                <CardBody>
                  <Divider />
                  <p className="text-center mt-3">
                    <span role="img" aria-label="victory">
                      🤞
                    </span>
                    focusing
                  </p>
                  <div className="mt-3">
                    <i className="fa fa-2x fa-facebook m-2"></i>
                    <i class="fa fa-2x fa-instagram m-2"></i>
                    <i class="fa fa-2x fa-twitter m-2"></i>
                    <i class="fa fa-2x fa-dribbble m-2"></i>
                  </div>
                </CardBody>
              </Card>
            </div>
            <div className="col-12 col-md-8"></div>
          </div>
        </div>
      );
    else
      return (
        <div className="container">
          <div className="row">Not logged in</div>
          <Redirect to="/home" />
        </div>
      );
  }
}

export default Profile;
