import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import "./css/Home.css";

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      notes: []
    };
  }
  renderLander() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>AKNMS</h1>
          <p>A Simple event viewer</p>
        </div>
      </div>
    );
  }
  renderEventsPage() {
    return (
      <div className="lander">
        <Link to="/eventsPage">View Events</Link>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderEventsPage() : this.renderLander()}
      </div>
    );
  }
}
