import React from "react";
import { render } from "react-dom";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

const styles = {
  textAlign: "center",
  backgroundColor: "#CCC",
  padding: 30,
};

const ID = "ID";

const handleClick = (event, data) => {};

const ActiveOrderDataGrid = () => (
  <div style={{ fontFamily: "sans-serif" }}>
    <ContextMenuTrigger id={ID}>
      <h2 style={styles}>Right click here</h2>
    </ContextMenuTrigger>
    <ContextMenu id={ID}>
      <MenuItem data={{ action: "copy" }} onClick={handleClick}>
        Copy
      </MenuItem>
      <MenuItem data={{ action: "paste" }} onClick={handleClick}>
        Paste
      </MenuItem>
      <MenuItem divider />
      <MenuItem data={{ action: "delete" }} onClick={handleClick}>
        Delete
      </MenuItem>
    </ContextMenu>{" "}
  </div>
);

export default ActiveOrderDataGrid;

// import React, { useState } from "react";
// import { render } from "react-dom";
// import { AgGridColumn, AgGridReact } from "ag-grid-react";
// import { Restore, Save } from "@material-ui/icons";

// const ActiveOrderDataGrid = () => {
//   const [gridApi, setGridApi] = useState(null);
//   const [gridColumnApi, setGridColumnApi] = useState(null);
//   const [col, setCol] = useState(null);

//   const [rowData, setRowData] = useState([
//     { make: "Toyota", model: "Celica", price: 35000 },
//     { make: "Ford", model: "Mondeo", price: 32000 },
//     { make: "Porsche", model: "Boxter", price: 72000 },
//   ]);

//   const columns = [
//     { resizable: true, width: 100, headerName: "Make", field: "make" },
//     { resizable: true, headerName: "Model", field: "model" },
//     { resizable: true, headerName: "Price", field: "price" },
//     { resizable: true, headerName: "Hi", field: "make" },
//   ];

//   const onGridReady = (params) => {
//     setGridApi(params.api);
//     setGridColumnApi(params.columnApi);
//   };

//   const testRender = (params) => <p>{params.data.make + "sss"}</p>;
//   const frameworkComponents = {
//     testRender: testRender,
//   };

//   const Save = () => {
//     setCol(gridColumnApi.getColumnState());
//   };

//   const Restore = () => {
//     gridColumnApi.applyColumnState({ state: col, applyOrder: true });
//   };

//   return (
//     <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
//       <button onClick={() => Save()}>Save</button>
//       <button onClick={() => Restore()}>Restore</button>
//       <AgGridReact
//         // columnDefs={columns}
//         suppressDragLeaveHidesColumns={true}
//         columnDefs={columns}
//         onGridReady={onGridReady}
//         rowData={rowData}
//         frameworkComponents={frameworkComponents}
//       >
//         {/* <AgGridColumn field="make" cellRenderer="testRender"></AgGridColumn>
//         <AgGridColumn field="model" />
//         <AgGridColumn field="price" /> */}
//       </AgGridReact>
//     </div>
//   );
// };

// export default ActiveOrderDataGrid;
