import React from "react";
import PieChart from 'react-minimal-pie-chart';

class EventsChartLegend extends React.Component {
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
                            "margin-right": "300px"
                        }}>
                        <span
                            style={{
                                border: "1px solid #ccc",
                                float: "left",
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
        let host_proto = window.location.protocol;
        let host_port = window.location.port;
        let host_name = window.location.hostname;
        let host_pathname = "aknms/v1";
        let url = host_proto+"//"+host_name+":"+host_port+"/"+host_pathname;
        let countResult = await fetch(url+'/event/count');
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
        let host_proto = window.location.protocol;
        let host_port = window.location.port;
        let host_name = window.location.hostname;
        let host_pathname = "aknms/v1";
        let url = host_proto+"//"+host_name+":"+host_port+"/"+host_pathname;
       
        fetch(url+'/event/count')
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
                <EventsChartLegend data={this.state.chartdata} />
                
                <PieChart
                    data={this.state.chartdata}
                    radius={30}
                    style={{ height: '300px' }}
                    animate
                    animationDuration={2000}
                />
                
            </div>
        );
    }
}
export default EventsChart;
