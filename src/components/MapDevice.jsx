import React from "react";
import { ControlLabel, FormControl, FormGroup, Button } from "react-bootstrap";
import './css/EventsPage.css';


class MapDevice extends React.Component {



    constructor(props) {
        super(props);
        
    }
    

    async loadData() {
        console.log("Calling loadData");
        let resultValue = await fetch(this.url + '/user');
        console.log(resultValue)
        let resultJson = await resultValue.json();
        console.log(resultJson)

        if (resultJson.length === 0) {
            console.log("loadData - fetch returned empty array");
            return;
        }

        let rowdata = resultJson.map((row) => {
            let newRow = row;
            let ipAddress = '';
            row.managedElements.map( managedElement => (ipAddress+=managedElement.ipAddress+","));
            ipAddress = ipAddress.substring(0,ipAddress.length-1);
            newRow.ipAddress = ipAddress;
            delete newRow.managedElements;
            return newRow;
        })

        this.setState({ rowdata: rowdata });
    }
    componentDidMount() {
        this.loadData();
       
    }

    createRowWithDiv(rowData) {
        let row = [];
        let cellsArray = [];
        // console.log("Row Data", rowData);
       for (var field in rowData) {
            // console.log(rowData[field]);
            cellsArray.push(<div class="table-data">{rowData[field]}</div>)
        }
        row.push(<div class="table-row">{cellsArray}</div>)
        return row;
    }
render() {
    return (<div></div>
    //   <form onSubmit={this.handleSubmit}>
    //     <FormGroup controlId="email" bsSize="large">
    //       <ControlLabel>Email</ControlLabel>
    //       <FormControl
    //         autoFocus
    //         type="email"
    //         value={this.state.email}
    //         onChange={this.handleChange}
    //       />
    //     </FormGroup>
    //     <FormGroup controlId="managedElements" bsSize="large">
    //       <ControlLabel>Map Devices</ControlLabel>
    //       <FormControl
    //         placeholder="Comma separated device IPs"
    //         value={this.state.managedElements}
    //         onChange={this.handleChange}
    //         type="text"
    //       />
    //     </FormGroup>
    //     <FormGroup controlId="password" bsSize="large">
    //       <ControlLabel>Password</ControlLabel>
    //       <FormControl
    //         value={this.state.password}
    //         onChange={this.handleChange}
    //         type="password"
    //       />
    //     </FormGroup>
    //     <FormGroup controlId="confirmPassword" bsSize="large">
    //       <ControlLabel>Confirm Password</ControlLabel>
    //       <FormControl
    //         value={this.state.confirmPassword}
    //         onChange={this.handleChange}
    //         type="password"
    //       />
    //     </FormGroup>
    //     <LoaderButton
    //       block
    //       bsSize="large"
    //       disabled={!this.validateForm()}
    //       type="submit"
    //       isLoading={this.state.isLoading}
    //       text="Signup"
    //       loadingText="Signing up…"
    //     />
    //   </form>
    );
  }
}
export default MapDevice;