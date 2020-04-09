import React, { Component } from "react";
import { Redirect } from "react-router-dom";
class Profile extends Component {
  render() {
    if (this.props.user.LoggedIn)
      return (
        <div className="container">
          <div className="row">Hello</div>
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
