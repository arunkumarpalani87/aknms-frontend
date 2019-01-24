import React from "react";
import EventsTable from "./EventsTable.jsx";
import RefreshPoller from "./RefreshPoller.jsx";
import EventsChart from "./EventsChart.jsx";
import EventsLastSinceFilter from "./EventsLastSinceFilter.jsx";

class EventsPage extends React.Component{
	

	render(){
        return (
            <div>
                <h1>AK NMS Events</h1>
                <hr/>
                <EventsChart/>
                <hr/>
                <table><tr><td><RefreshPoller/></td><td><EventsLastSinceFilter/></td></tr></table>
                <hr/>
                <EventsTable/>
            </div>
        );
	}
};

export default EventsPage;
