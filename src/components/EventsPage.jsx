import React from "react";
import { withRouter } from "react-router-dom";
import store from "../store/store.js";
import EventsChart from "./EventsChart.jsx";
import InfiniteTable from './InfiniteTable.jsx';



class EventsPage extends React.Component {

    constructor(props) {
        console.log("Calling EventsPage Constructor");
        super(props);
        store.subscribe(() => { this.forceUpdate() });
    }

    headers = [
        { headername: "ID", fieldname: "id" },
        { headername: "Timestamp", fieldname: "timestamp" },
        { headername: "IPAddress", fieldname: "ipAddress" },
        { headername: "Log Message", fieldname: "message" },
        { headername: "Log Type", fieldname: "type" }
    ];

    render() {
        return (
            <div>
                <h1 style={{ "textAlign": "center" }}>AK NMS Events Summary</h1>
                <EventsChart />
                {/* 
                <table><tr><td><RefreshPoller /></td><td><EventsLastSinceFilter /></td></tr></table>
                <hr />
                <EventsTable/>   */}
                <p></p>
                <InfiniteTable
                    headers={this.headers}
                    initialRecordCount='50'
                    additionalRecordCount='10' />
            </div>
        );
    }
};

/*EventsPage.contextTypes = {
    store : PropTypes.object
}
*/

export default withRouter(EventsPage);
