import React, { Component } from "react";
import { ControlLabel, FormControl, FormGroup, HelpBlock } from "react-bootstrap";
import { Auth } from "aws-amplify";
import LoaderButton from "../components/LoaderButton";
import "./css/Home.css";
import store from '../store/store';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    store.subscribe(() => { this.forceUpdate() });
    this.state = {
      isLoading: false,
      email: "",
      password: "",
      managedElements: "",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null
    };
  }

  validateIPaddress(ipaddress) {
    if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
      return (true);
    }
    return (false);
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  validateConfirmationForm() {
    console.log(this.state.confirmationCode + " code")
    return this.state.confirmationCode.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();
    console.log("inside submit");
    this.setState({ isLoading: true });
    let data = { username: this.state.email, managedElements: [] };
    try {
      if (this.state.managedElements.length > 0) {
        this.state.managedElements.split(',').forEach(element => {
          if (!this.validateIPaddress(element)) {
            this.setState({ isLoading: false });
            throw new Error('Invalid IpAddress list');;
          } else {
            let ipaddress = { ipAddress: element };
            data.managedElements.push(ipaddress)
          }
        }
        );
      }
      
      let host_port = ':8443';
      let host_name = window.location.hostname;
      let host_pathname = '/aknms/v1/user';
      let url = "https://" + host_name + host_port + host_pathname;

      let response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(function (response) {
          return response.json()
        }).then(function (body) {
          console.log(body);
        });

      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password,
        attributes: {
          email: this.state.email
        }

      });
      this.setState({
        newUser
      });
      
    } catch (e) {
      alert(e.message);
    }
    this.setState({ isLoading: false });
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    console.log("handleConfirmationSubmit submit");

    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      console.log("handleConfirmationSubmit confirmSignUp");

      await Auth.signIn(this.state.email, this.state.password);
      console.log("handleConfirmationSubmit signIn");
      console.log(this.state.managedElements)
      this.props.userHasAuthenticated(true);

      await Auth.signOut();
      store.dispatch({
        type: "CLEAR_DATA"
      });
      this.props.history.push("/login");
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }


  renderConfirmationForm() {
    return (
      <form onSubmit={this.handleConfirmationSubmit}>
        <FormGroup controlId="confirmationCode" bsSize="large">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={this.state.confirmationCode}
            onChange={this.handleChange}
          />
          <HelpBlock>Please check your email for the code.</HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateConfirmationForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Verify"
          loadingText="Verifying…"
        />
      </form>
    );
  }

  renderForm() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup controlId="managedElements" bsSize="large">
          <ControlLabel>Map Devices</ControlLabel>
          <FormControl
            placeholder="Comma separated device IPs"
            value={this.state.managedElements}
            onChange={this.handleChange}
            type="text"
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            type="password"
          />
        </FormGroup>
        <LoaderButton
          block
          bsSize="large"
          disabled={!this.validateForm()}
          type="submit"
          isLoading={this.state.isLoading}
          text="Signup"
          loadingText="Signing up…"
        />
      </form>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}
