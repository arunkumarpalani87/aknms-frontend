import React from 'react';
import store from '../store/store.js';
import compareValues from '../utilities/sort.js';

class InfiniteTable extends React.Component {
    constructor(props) {
        console.log("Calling InfiniteTable Constructor");
        super(props);
        store.subscribe(() => { this.forceUpdate() });
    }

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

    componentDidMount() {
        console.log("Calling componentDidMount");
        this.loadData(this.props.initialRecordCount);
        this.refs.iScroll.addEventListener("scroll", () => {
            if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >= this.refs.iScroll.scrollHeight) {
                this.loadData(this.props.additionalRecordCount);
            }
        });
    }

    async loadData(recordCount) {
        console.log("Calling loadData");
        let lastLoadedIndex = store.getState().lastLoadedIndex;
        let resultValue = await fetch('http://localhost:8080/aknms/v1/event?id-from=' + (lastLoadedIndex + 1) + '&count=' + recordCount);
        let resultJson = await resultValue.json();
        if (resultJson.length === 0) {
            console.log("loadData - fetch returned empty array");
            return;
        }

        console.log('loadData - Before Sorting', resultJson);
        const resultJsonDesc = [...resultJson].sort(compareValues('id', 'desc'));
        console.log('loadData - After Sorting', resultJsonDesc);

        let newlastLoadedIndex = resultJsonDesc[0].id;
        console.log("loadData - newlastLoadedIndex", newlastLoadedIndex);
        if (newlastLoadedIndex === lastLoadedIndex) {
            console.log("loadData - returned value is already loaded");
            return;
        }

        let rowdata = resultJson.map((row) => {
            let newRow = row;
            newRow.managementIp = row.managedElement.ipAddress;
            delete newRow.managedElement;
            return newRow;
        })

        // console.log("loadData - rowdata", rowdata)
        rowdata = Object.assign([], store.getState().rowdata.concat(rowdata));
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
            <div
                className="infiniteTable"
                ref="iScroll"
                style={{ height: "600px", overflow: "auto" }}>
                <table align="center">
                    <style>{"table, th, td {border:1px solid black; border-collapse: collapse;}"}</style>
                    <tr>
                        {headers.map(header => (<th>{header.headername}</th>))}
                    </tr>
                    {store.getState().rowdata.map(row => (this.createRow(row)))}
                </table>
            </div>
        )
    };
};

InfiniteTable.defaultProps = {
    initialRecordCount: 50,
    additionalRecordCount: 20
}

/*
InfiniteTable.contextTypes = {
    store : PropTypes.object
}
*/
export default InfiniteTable;