import React from "react";




class RefreshPoller extends React.Component {

    constructor(props) {
        super()
        console.log("props.timeInterval ", props.timeInterval)

        if (typeof props.timeInterval == String) {
            props.timeInterval = Array.from(props.timeInterval)
        }
        
        
    }

    componentWillMount() {
        if(this.props.timeInterval == undefined) {
            this.setState({
                timeIntervalFrequency: [10, 20, 30, 40, 50, 60]
            })
        } else {
            this.setState({
                timeIntervalFrequency: this.props.timeInterval
            })
        }
          
    }

    componentDidMount() {        
        console.log("Selected Value after mount ", this.refs.selectTimeInterval.value)
        
    }

    onSelect =(event) => {
        setTimeout(function(){
            document.getElementById("eventsPage").reload();
          },60)
    }


    componentWillUnmount() {
           }

    render() {
        return(
            <div>
                Refresh every <select onChange={this.onSelect} ref="selectTimeInterval">             
                  {this.state.timeIntervalFrequency.map(timeUnit=>
                      <option key={timeUnit} value={timeUnit}>{timeUnit}</option>
                  )}
                </select> seconds
            </div>
        );
    }

}

export default RefreshPoller;