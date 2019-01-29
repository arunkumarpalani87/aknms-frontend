import React, { Component } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class AgGridTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        { headerName: "Id", field: "id" },
        { headerName: "Timestamp", field: "timestamp" },
        { headerName: "Type", field: "type" },
        { headerName: "Message", field: "message" }
      ],
      defaultColDef: {
        width: 120,
        suppressFilter: true
      }
    };
  }

  componentDidMount() {
    fetch('https://localhost:8443/aknms/v1/event/')
      .then(result => result.json())
      .then(rowData => this.setState({ rowData }))
  }

  render() {
    return (
      <div
        className="ag-theme-balham"
        style={{
          height: '500px',
          width: '600px'
        }}
      >
        <AgGridReact
          enableSorting={true}
          enableFilter={true}
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}>
        </AgGridReact>
      </div>
    );
  }
}

export default AgGridTable;
