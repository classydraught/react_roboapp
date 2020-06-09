import React, { Component } from "react";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import { baseUrl } from "../shared/baseUrl";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isNavOpen: false,
      isModalOpen: false,
      isdropdownOpen: false
    };
    this.toggleNav = this.toggleNav.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen
    });
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  toggleDropdown() {
    this.setState({
      isdropdownOpen: !this.state.isdropdownOpen
    });
  }

  handleLogin(event) {
    event.preventDefault();
    this.toggleModal();
    this.props.loginUser(this.username.value, this.password.value);
  }
  render() {
    return (
      <>
        <div>
          <Navbar dark expand="md" className="fixed-top">
            <div className="container">
              <NavbarToggler onClick={this.toggleNav} />
              <NavbarBrand className="ml-auto" href="/">
                <img
                  src="assets/logo_svg.png"
                  width="55"
                  height="50"
                  alt="Robovidhya"
                />
              </NavbarBrand>
              <Collapse isOpen={this.state.isNavOpen} navbar>
                <Nav navbar>
                  <NavItem>
                    <NavLink className="nav-link" to="/home">
                      <span className="fa fa-home fa-lg"></span> Home
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link" to="/aboutus">
                      <span className="fa fa-info fa-lg"></span> About Us
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link" to="/courses">
                      <span className="fa fa-list fa-lg"></span> Courses
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink className="nav-link" to="/contactus">
                      <span className="fa fa-address-card fa-lg"></span> Contact
                    </NavLink>
                  </NavItem>
                </Nav>
                <Nav className="ml-auto" navbar>
                  {!this.props.user.LoggedIn ? (
                    <NavItem>
                      <Button
                        variant="outlined"
                        style={{ color: "#fff" }}
                        onClick={this.toggleModal}
                      >
                        <span className="fa fa-sign-in fa-lg"></span>{" "}
                        &nbsp;&nbsp;Login
                      </Button>
                    </NavItem>
                  ) : (
                      <NavItem>
                        <Dropdown
                          isOpen={this.state.isdropdownOpen}
                          toggle={this.toggleDropdown}
                        >
                          <DropdownToggle>
                            <i className="fa fa-chevron-circle-down "></i>
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem>
                              <Link
                                to="/profile"
                                style={{
                                  color: "#0b0704",
                                  textDecoration: "none"
                                }}
                              >
                                <Avatar
                                  className="mx-auto mb-2"
                                  src={
                                    baseUrl + localStorage.getItem("profilepic")
                                  }
                                />
                              </Link>
                            </DropdownItem>
                            <Divider />
                            <DropdownItem>
                              <Link
                                to="/addcourse"
                                style={{
                                  color: "#0b0704",
                                  textDecoration: "none"
                                }}
                              >
                                <i className="fa fa-plus-circle"></i>
                              &nbsp;&nbsp;Add a Course
                            </Link>
                            </DropdownItem>
                            <DropdownItem
                              onClick={this.props.LogOutUser}
                              color="#0b0704"
                            >
                              <i className="fa fa-sign-out"></i> Logout
                          </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </NavItem>
                    )}
                </Nav>
              </Collapse>
            </div>
          </Navbar>
        </div>
        <Jumbotron>
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>Robovidhya</h1>
                <p className="text-justify">
                  At Robovidhya, our aim is to upgrade the skills and improve
                  the employability of students and enhancing the skills of
                  professionals by transforming them into real time and
                  productive engineers who can build the new things that can
                  change the world.
                </p>
              </div>
            </div>
          </div>
        </Jumbotron>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Email</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  innerRef={input => (this.username = input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  innerRef={input => (this.password = input)}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input
                    type="checkbox"
                    name="remember"
                    innerRef={input => (this.remember = input)}
                  />
                  Remember me
                </Label>
              </FormGroup>

              <Button
                type="submit"
                value="submit"
                variant="outlined"
                className="mt-2"
                size="large"
              >
                <span className="fa fa-sign-in fa-lg"></span>
              </Button>
              <FormGroup className="mt-2">
                <Link to="/register" onClick={this.toggleModal}>
                  Not a member? Register here!
                </Link>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default Header;
