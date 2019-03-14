import React from 'react';
import store from '../store/store.js';
import './css/EventsPage.css';


class InfiniteTable extends React.Component {
    constructor(props) {
        console.log("Calling InfiniteTable Constructor");
        super(props);
        this.host_port = ':8443';
        this.host_name = window.location.hostname;
        this.host_pathname = '/aknms/v1';
        this.url = "https://" + this.host_name + this.host_port + this.host_pathname;
        store.subscribe(() => { this.forceUpdate() });
    }

   
    /* Regular Table - Not Used */
    createRow(rowData) {
        let row = [];
        let cellsArray = [];
        // console.log("Row Data", rowData);
        for (var field in rowData) {
            // console.log(rowData[field]);
            cellsArray.push(<td>{rowData[field]}</td>)
        }
        row.push(<tr>{cellsArray}</tr>)
        return row;
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
    componentWillUnmount() {
        console.log("Calling componentunMount");
        store.dispatch({
            type: "CLEAR_DATA"
          });
    }

    
    componentDidMount() {
        console.log("Calling componentDidMount");
        
        this.loadData(this.props.initialRecordCount);
        this.refs.iScroll.addEventListener("scroll", () => {
            if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >= this.refs.iScroll.scrollHeight) {
                this.loadData(this.props.additionalRecordCount);
            }
        });
    }

    fetchDate(mysqldate) {
        let year = mysqldate.substr(0, 4);
        let month = mysqldate.substr(4, 2);
        let day = mysqldate.substr(6, 2);
        let hour = mysqldate.substr(8, 2);
        let minute = mysqldate.substr(10, 2);
        let second = mysqldate.substr(12, 2);
        console.log(mysqldate);
        console.log("Date", year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second);
        let date = new Date(year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second);
        console.log("Date", date);
        return date.toLocaleString();
    }

    handleSort = (name) => {
        
        sessionStorage.setItem('sort_key',name);
        sessionStorage.getItem('sort_dir') === 'ASC' ? sessionStorage.setItem('sort_dir','DESC') : sessionStorage.setItem('sort_dir','ASC') ;
        store.dispatch({
            type: "CLEAR_DATA"
          });
        this.loadData(this.props.initialRecordCount);
    }
    async loadData(recordCount) {
        console.log("Calling loadData");
        var userquery = '&user=' + sessionStorage.getItem('username');
        if (sessionStorage.getItem('userrole') === 'admin') {
            userquery = '';
        }
        let lastLoadedIndex = store.getState().infiniteTableReducer.lastLoadedIndex;
        let resultValue = await fetch(this.url + '/event?id-from=' + lastLoadedIndex + '&count=' + recordCount + userquery + '&sort_dir='+sessionStorage.getItem('sort_dir')+ '&sort_key='+sessionStorage.getItem('sort_key'));
        console.log(resultValue)

        let resultJson = await resultValue.json();
        console.log(resultJson)

        if (resultJson.length === 0) {
            console.log("loadData - fetch returned empty array");
            return;
        }

        let newlastLoadedIndex = lastLoadedIndex+1;
        console.log("loadData - newlastLoadedIndex", newlastLoadedIndex);
        if (newlastLoadedIndex === lastLoadedIndex) {
            console.log("loadData - returned value is already loaded");
            return;
        }

        let rowdata = resultJson.map((row) => {
            let newRow = row;
            newRow.timestamp = this.fetchDate(row.timestamp.toString());
            delete newRow.managedElement;
            return newRow;
        })

        rowdata = Object.assign([], store.getState().infiniteTableReducer.rowdata.concat(rowdata));
        store.dispatch({
            type: "LOAD_DATA",
            rowdata: rowdata,
            lastLoadedIndex: newlastLoadedIndex
        });
    }

    render() {
        console.log("Calling Table Render");
        let headers = this.props.headers;
        if (headers === undefined || headers.length === 0) {
            return (<div className="infiniteTable" ref="iScroll"><b>Error - Table Headers Undefined</b></div>);
        }
        console.log("render - Headers", headers);
        return (
            <div>
            <div class="table-header">
                    {headers.map(header => (<div class="header__item" ><a id={header.headername} class="filter__link" href="#" onClick={() => this.handleSort(header.fieldname)}>{header.headername}</a></div>))}
                </div>
            <div
                className="infiniteTable"
                ref="iScroll"
                style={{ height: "600px", overflow: "auto" }}>
                

                <div class="table-content">
                    {store.getState().infiniteTableReducer.rowdata.map(row => (this.createRowWithDiv(row)))}
                </div>
            </div>
            </div>
        )

        
    };
};

InfiniteTable.defaultProps = {
    initialRecordCount: 20,
    additionalRecordCount: 20
}


export default InfiniteTable;
