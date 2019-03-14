import React from "react";
import { withRouter } from "react-router-dom";
import store from "../store/store.js";
import EventsChart from "./EventsChart.jsx";
import InfiniteTable from './InfiniteTable.jsx';
import Login from "../containers/Login.js";
import RefreshPoller from "./RefreshPoller.jsx";


class EventsPage extends React.Component {

    constructor(props) {
        console.log("Calling EventsPage Constructor");
        super(props);
        
        store.subscribe(() => { this.forceUpdate() });
        this.defaultInterval = 10000;
        this.state = {
            refreshinterval: this.defaultInterval
        };
        this.updateInterval = (newInterval) => {
            // Clearing previous interval
            clearInterval(this.interval);
            this.setState({
                refreshinterval: newInterval
            })
}
      }
   
      headers = [
        { headername: "ID", fieldname: "id" },
        { headername: "Timestamp", fieldname: "timestamp" },
        { headername: "IPAddress", fieldname: "ipAddress" },
        { headername: "Log Message", fieldname: "message" },
        { headername: "Log Type", fieldname: "type" }
    ];

    renderLogin() {
        return (
          <div className="Home">
            <Login />
          </div>
        );
      }
    renderEventsPage() {
        return (
            <div>
                <h1 style={{ "textAlign": "center" }}>AK NMS Events Summary</h1>
                <EventsChart />
                {/* <RefreshPoller /> */}
                <InfiniteTable
                    headers={this.headers}
                    initialRecordCount='20'
                    additionalRecordCount='20'
                    
                     />
            </div>
        );
    }


render() {
    return (
      <div className="Home" id="eventsPage">
        {sessionStorage.getItem('username') != null ? this.renderEventsPage() : this.renderLogin()}
      </div>
    );
  }
}
export default withRouter(EventsPage);
