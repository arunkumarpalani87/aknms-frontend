import React from "react";




class RefreshPoller extends React.Component {
    constructor(props) {
        super(props);
        this.updateInterval = (e) => {
            this.props.updateInterval(e.target.value);
        }
    }
    
    render() {
        const intervals = {
            5000: "5 Secs",
            10000: "10 Secs",
            20000: "20 Secs",
            30000: "30 Secs",
            40000: "40 Secs",
            50000: "50 Secs",
            60000: "60 Secs"
        }

        const options = Object.keys(intervals).map(key =>
            <option key={key} value={key}>{intervals[key]}</option>
        )

        return (
            <div>
                Polling Interval &nbsp;
                <select onChange={this.updateInterval} defaultValue={this.props.defaultInterval}>
                    <option value='-1'>Select Interval</option>
                    {options}
                    )
                </select>
            </div>
        );
    }
}

export default RefreshPoller;