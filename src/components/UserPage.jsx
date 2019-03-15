import React from "react";
import {  withRouter } from "react-router-dom";

import './css/EventsPage.css';


class UserPage extends React.Component {



    constructor(props) {
        super(props);
        this.host_port = ':8443';
        this.host_name = window.location.hostname;
        this.host_pathname = '/aknms/v1';
        this.url = "https://" + this.host_name + this.host_port + this.host_pathname;
        this.state = {
            rowdata: []
        };
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

    renderNoAccess() {
        return (
            <div className="NotFound">
                <h3>Sorry, you dont have access to this page!</h3>
            </div>
        );
    }




    renderAdmin() {
        let headers = [
            { headername: "username", fieldname: "username" },{headername: "DEVICE(S)", fieldname: "ipAddress" }]
        return (
            <div>
                <div class="table-header">
                    {headers.map(header => (<div class="header__item" ><a id={header.headername} class="filter__link" href="#">{header.headername}</a></div>))}
                </div>
                <div class="table-content">
                    {this.state.rowdata.map(row => (this.createRowWithDiv(row)))}
                </div>
            </div>
        );
    }


    render() {
        return (
            
            <div >
                
                { sessionStorage.getItem("userrole") === 'admin' ? this.renderAdmin() : this.renderNoAccess()}
            </div>
        );
    }
}

export default withRouter(UserPage);