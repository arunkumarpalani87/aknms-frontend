import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./css/Home.css";

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true
    };
  }
  renderLander() {
    return (
      <div className="Home">
        <div className="lander">
          <img src="android-chrome-192x192.png" alt="AKNMS"/>
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

  renderAdminPage() {
    return (
      <div className="lander">
      <div>
      <Link to="/eventsPage">View Events</Link>
      </div>
      <div>
      <Link to="/userPage">View Users</Link>
      </div>
      {/* <div>
      <Link to="/devicePage">View Devices</Link>
      </div> */}
  </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {sessionStorage.getItem("username") !=null ? sessionStorage.getItem("userrole") === 'admin' ? this.renderAdminPage() : this.renderEventsPage() : this.renderLander()}
      </div>
    );
  }
}


export default withRouter(Home);
