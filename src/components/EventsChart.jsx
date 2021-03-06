import React from "react";
import PieChart from 'react-minimal-pie-chart';
import store from "../store/store";
import './css/EventsPage.css';


class EventsChartLegend extends React.Component {
    constructor(props) {
        super(props);
        this.host_port = ':8443';
        this.host_name = window.location.hostname;
        this.host_pathname = '/aknms/v1/event/count';
        this.url = "https://" + this.host_name + this.host_port + this.host_pathname;
        store.subscribe(() => { this.forceUpdate() });

    }
    render() {
        return (
            <ul
                style={{
                    "text-align": "center",
                    "list-style": "none"
                }}
            >
                {this.props.data.map((e) =>
                    <li 
                        style={{
                            float: "left",
                            "margin-right":"85px",
                            "margin-bottom": "90px"
                    }}>
                        <span
                            style={{
                                border: "1px solid #ccc",
                                float: "left",
                                clear: "left",
                                width: "12px",
                                height: "12px",
                                margin: "2px",
                                "background-color": e.color
                            }}>&nbsp; {e.title} {e.value} </span>
                    </li>
                )}
            </ul>
        );
    }
}
class EventsChart extends React.Component {
    constructor(props) {
        console.log("Calling EventsChart constructor");
        super(props);
        this.host_port = ':8443';
        this.host_name = window.location.hostname;
        this.host_pathname = '/aknms/v1/event/count';
        this.url = "https://" + this.host_name + this.host_port + this.host_pathname;
        store.subscribe(() => { this.forceUpdate() });
        this.state = {
            chartdata: []
        }
        /*
        Sample Data
        this.data =
            [
                { title: 'One', value: 10, color: '#E38627' },
                { title: 'Two', value: 15, color: '#C13C37' },
                { title: 'Three', value: 20, color: '#6A2135' },
            ];
        */
        console.log("EventsChart - state", this.state);
    }

    // Unused Function - Not working
    async fetchDataAsync() {

        let countResult = await fetch(this.url + '?user=' + sessionStorage.getItem('username'));
        let countJson = await countResult.json();
        let chartData = countJson.map((eventCountRecord) => {
            let chartEntry = {
                title: eventCountRecord.eventType,
                value: eventCountRecord.count
            }
            return chartEntry;
        });
        let coloursArray = ['#E38627', '#C13C37', '#6A2135', '#846968'];
        for (let i = 0; i < chartData.length; i++) {
            chartData[i].colour = coloursArray[i];
        }
        console.log("fetchData - chartData", chartData.then());
        return chartData;
    }
    componentDidMount() {
        fetch(this.url + '?user=' + store.getState().loginReducer.username)
            .then(countResult => countResult.json())
            .then(countJson => {
                countJson.map(eventCountRecord => {
                    let chartEntry = {
                        title: eventCountRecord.title,
                        value: eventCountRecord.value,
                        color: eventCountRecord.color
                    }
                    console.log("componentDidMount - chartEntry", chartEntry);
                    return chartEntry;
                })
                return countJson;
            })
            .then(chartData => {
                console.log("componentDidMount - chartEntry", chartData);
                this.setState({ chartdata: chartData });
                console.log("componentDidMount - chartData", chartData);
            });
    }

    render() {
        console.log("Calling EventsChart Render");
        console.log("Render - state", this.state);
        // TODO - Add Legend
        if (typeof this.state.chartdata === 'undefined' || this.state.chartdata.length === 0) {
            return (<div><b>Loading Chart</b></div>);
        }
        return (
            <div>
                <PieChart
                    data={this.state.chartdata}
                    radius={30}
                    style={{ height: '300px', 'margin-bottom': '25px' }}
                    animate
                    animationDuration={2000}
                    
                />
                <EventsChartLegend data={this.state.chartdata} />

                

            </div>
        );
    }
}
export default EventsChart;
