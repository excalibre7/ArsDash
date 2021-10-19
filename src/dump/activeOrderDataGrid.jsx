import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import {
  Paper,
  Typography,
  TablePagination,
  Collapse,
  IconButton,
  Popover,
  Grid,
  FormLabel,
  FormControl,
  FormControlLabel,
  FormGroup,
  Checkbox,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "../stylesheets/grid.css";
import useWindowDimensions from "../hooks/useWindowDimensions";
import "../stylesheets/App.css";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import RemoveIcon from "@material-ui/icons/Remove";
import { Save } from "@material-ui/icons";
import "../stylesheets/custom.css";
import "../stylesheets/react-contextmenu.css";
// import ActionableDropdown from "./actionableDropdown";
import { DropdownButton } from "react-bootstrap";
import { Dropdown } from "bootstrap";
import ActionableDropdown from "./actionableDropdown";
import {
  ContextMenuTrigger,
  ContextMenu,
  SubMenu,
  MenuItem,
  hideMenu,
} from "react-contextmenu";

const usableColumns = [
  { label: "Order No", id: "ORDER_ID" },
  { label: "Vendor", id: "VENDOR" },
  { label: "Brand", id: "BRAND" },
  { label: "Order Date", id: "ORDER_DATE" },
  { label: "Qty", id: "QTY" },
  { label: "Capacity", id: "CAPACITY_OFFERED" },
  { label: "Delivery Date", id: "GRN_COMMIT_DATE" },
  { label: "Status", id: "PREDICT_ON_TIME" },
  { label: "Latest Completed Activity", id: "LATEST_ACTIVITY_NAME" },
  { label: "Predicted Delivery Date", id: "PREDICT_DATE" },
  { label: "Likely Defects", id: "DEFECTS_DETAILS" },
  { label: "Final Inspection", id: "PREDICT_FINAL_INSPECTION" },
];

const useStyles = makeStyles((theme) => ({
  confidence: {
    color: "#000000",
    paddingTop: theme.spacing(1.4),
    fontSize: "0.75rem",
  },
  status: {
    color: "#ffffff",
    height: "2.3rem",
    paddingTop: theme.spacing(0.9),
  },
  statusTxt: {
    fontSize: "13px",
  },
  paginate: {
    paddingTop: theme.spacing(2),
  },
  filter: {
    color: "#ffffff",
    height: "3.5vh",
  },
  iconb: {
    padding: theme.spacing(0, 0, 0, 0.5),
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0)",
    },
  },
  iconstage: {
    padding: theme.spacing(0, 0, 0, 0),
  },
  formControl: {
    margin: theme.spacing(1.5),
  },
}));

const ActiveOrderDataGrid = (props) => {
  const classes = useStyles();
  const {
    rows,
    currentSort,
    setCurrentSort,
    columnState,
    setColumnState,
    page,
    rowsPerPage,
    setPage,
    setRowsPerPage,
    columnsActive,
    setColumnsActive,
  } = props;
  const divRef = React.useRef(null);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [dimensions, setDimensions] = useState({ width: null, height: null });

  var myRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const [saveCount, setSaveCount] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [localColumnState, setLocalColumnState] = useState(null);
  const [actionDropdown, setActionDropdown] = useState(false);
  const [checkboxColumnState, setCheckBoxColumnState] = useState(false);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const columnWidth = (percentage) => {
    if (divRef.current != null) {
      var width = null;
      if (divRef.current.clientWidth > 1000) {
        width = (divRef.current.clientWidth * percentage) / 100; // Pixel calculation
      } else {
        width = (1000 * percentage) / 100;
      }
      return width;
    }
  };

  const colPopOpen = Boolean(anchorEl);
  const id = colPopOpen ? "simple-popover" : undefined;

  const getBgColor = (status, code) => {
    if (code == "MAIN") {
      if (status == 1) {
        return "#00b803"; //COLOR 77b897
      } else if (status == 0) {
        return "#e60e0e"; //COLOR e2634e
      }
    } else if (code == "TIMELINE") {
      if (status == "On Time") {
        return "#8ccfa1"; //COLOR
      } else if (status == "Delayed") {
        return "#ed9d90"; //COLORed9d90
      }
    } else if (code == "STATUS") {
      if (status == "BEFORE") {
        return "#009103";
      } else if (status == "ON-TIME") {
        return "#30b833";
      } else if (status == "ONE-WEEK") {
        return "#FFC107";
      } else if (status == "MORE-THAN-ONE-WEEK") {
        return "#e60e0e";
      }
    }
  };

  const updateWindowDimensions = () => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  };

  const secondPercentWidthSetting = () => {
    if (gridColumnApi != null) {
      setCheckBoxColumnState({
        columns: gridColumnApi.getColumnState(),
        dimensions: dimensions,
      });
      let localCopyColumnState = gridColumnApi.getColumnState();
      localCopyColumnState.forEach((e) => {
        e.percentw = (e.width / dimensions.width) * 100;
      });
      setCheckBoxColumnState({
        columns: localCopyColumnState,
        dimensions: dimensions,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updateWindowDimensions);
    updateWindowDimensions();
    setLocalColumnState(columnState);
    if (columnState != null) {
      let loc_ = columnState.columns;
      loc_.forEach((e) => {
        e.percentw = (e.width / columnState.dimensions.width) * 100;
      });
      setLocalColumnState({
        columns: loc_,
        dimensions: columnState.dimensions,
      });
    }
  }, []);

  const sortingInterface = (param) => {
    setCurrentSort(param);
    if (gridApi != null) {
      gridApi.refreshCells();
    }
  };

  const actionDropdownStatus = (params) => {
    hideMenu();
    if (params.colDef.field == "DELAY4") {
      setActionDropdown(true);
    } else {
      setActionDropdown(false);
    }
  };

  const getStatusTag = (p) => {
    if (p == "BEFORE") {
      return "Before";
    } else if (p == "ON-TIME") {
      return "On Time";
    } else if (p == "ONE-WEEK") {
      return "Slight Delay";
    } else if (p == "MORE-THAN-ONE-WEEK") {
      return "Delayed";
    }
  };

  const getColDefs = (type) => {
    var _column_ = [
      {
        resizable: true,
        width: columnWidth(9),
        headerName: currentSort,
        field: "ORDER_ID",
        headerComponentFramework: (params) => {
          if (currentSort == "no-a") {
            return (
              <div className="headerDiv">
                Order No
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => sortingInterface("no-d")}
                >
                  <ArrowDownwardIcon className={classes.filter} />
                </IconButton>
              </div>
            );
          } else if (currentSort == "no-d") {
            return (
              <div className="headerDiv">
                Order No
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => sortingInterface("no-a")}
                >
                  <ArrowUpwardIcon className={classes.filter} />
                </IconButton>
              </div>
            );
          } else {
            return (
              <div className="headerDiv">
                Order No
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => sortingInterface("no-a")}
                >
                  <RemoveIcon className={classes.filter} />
                </IconButton>
              </div>
            );
          }
        },
      },
      {
        resizable: true,
        cellStyle: { "white-space": "normal", "line-height": 1.5 },
        width: columnWidth(14),
        headerName: "Vendor",
        field: "VENDOR",
        cellRendererFramework: (params) => (
          <div
            style={{
              paddingTop: 10,
            }}
          >
            {params.data.VENDOR}
          </div>
        ),
      },
      {
        resizable: true,
        width: columnWidth(10),
        cellStyle: { "white-space": "normal", "line-height": 1.5 },
        headerName: "Brand",
        field: "BRAND",
        cellRendererFramework: (params) => (
          <div
            style={{
              paddingTop: 10,
            }}
          >
            {params.data.BRAND}
          </div>
        ),
      },
      {
        resizable: true,
        width: columnWidth(10),
        headerName: currentSort,
        field: "ORDER_DATE",
        headerComponentFramework: (params) => {
          if (currentSort == "ord-a") {
            return (
              <div className="headerDiv">
                Order
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => sortingInterface("ord-d")}
                >
                  <ArrowDownwardIcon className={classes.filter} />
                </IconButton>
              </div>
            );
          } else if (currentSort == "ord-d") {
            return (
              <div className="headerDiv">
                Order
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => sortingInterface("ord-a")}
                >
                  <ArrowUpwardIcon className={classes.filter} />
                </IconButton>
              </div>
            );
          } else {
            return (
              <div className="headerDiv">
                Order
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => sortingInterface("ord-a")}
                >
                  <RemoveIcon className={classes.filter} />
                </IconButton>
              </div>
            );
          }
        },
      },
      {
        resizable: true,
        width: columnWidth(7),
        headerName: currentSort,
        field: "QTY",
        headerComponentFramework: (params) => {
          if (currentSort == "qty-a") {
            return (
              <div className="headerDiv">
                Qty
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => sortingInterface("qty-d")}
                >
                  <ArrowDownwardIcon className={classes.filter} />
                </IconButton>
              </div>
            );
          } else if (currentSort == "qty-d") {
            return (
              <div className="headerDiv">
                Qty
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => sortingInterface("qty-a")}
                >
                  <ArrowUpwardIcon className={classes.filter} />
                </IconButton>
              </div>
            );
          } else {
            return (
              <div className="headerDiv">
                Qty
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => sortingInterface("qty-a")}
                >
                  <RemoveIcon className={classes.filter} />
                </IconButton>
              </div>
            );
          }
        },
      },
      {
        width: columnWidth(8),
        resizable: true,
        headerName: currentSort,
        field: "CAPACITY_OFFERED",
        headerComponentFramework: (params) => {
          if (currentSort == "capoff-a") {
            return (
              <div className="headerDiv">
                Capacity
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => sortingInterface("capoff-d")}
                >
                  <ArrowDownwardIcon className={classes.filter} />
                </IconButton>
              </div>
            );
          } else if (currentSort == "capoff-d") {
            return (
              <div className="headerDiv">
                Capacity
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => sortingInterface("capoff-a")}
                >
                  <ArrowUpwardIcon className={classes.filter} />
                </IconButton>
              </div>
            );
          } else {
            return (
              <div className="headerDiv">
                Capacity
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => sortingInterface("capoff-a")}
                >
                  <RemoveIcon className={classes.filter} />
                </IconButton>
              </div>
            );
          }
        },
      },
      {
        resizable: true,
        width: columnWidth(9),
        headerName: currentSort,
        field: "GRN_COMMIT_DATE",
        headerComponentFramework: (params) => {
          if (currentSort == "del-a") {
            return (
              <div className="headerDiv">
                Delivery
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => sortingInterface("del-d")}
                >
                  <ArrowDownwardIcon className={classes.filter} />
                </IconButton>
              </div>
            );
          } else if (currentSort == "del-d") {
            return (
              <div className="headerDiv">
                Delivery
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => sortingInterface("del-a")}
                >
                  <ArrowUpwardIcon className={classes.filter} />
                </IconButton>
              </div>
            );
          } else {
            return (
              <div className="headerDiv">
                Delivery
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => sortingInterface("del-a")}
                >
                  <RemoveIcon className={classes.filter} />
                </IconButton>
              </div>
            );
          }
        },
      },
      {
        width: columnWidth(9),
        headerName: "Status",
        field: "PREDICT_ON_TIME",
        cellRendererFramework: (params) => (
          <div
            align="center"
            style={{
              paddingTop: 10,
            }}
          >
            <Paper
              className={classes.status}
              style={{
                // color: "#fff",
                maxWidth: 80,
                backgroundColor: getBgColor(
                  params.data.PREDICT_ON_TIME_STATUS,
                  "STATUS"
                ),
              }}
            >
              <Typography className={classes.statusTxt} align="center">
                {getStatusTag(params.data.PREDICT_ON_TIME_STATUS)}
              </Typography>
              <Typography className={classes.confidence}>
                {params.data.PREDICT_CONFIDENCE}
              </Typography>
            </Paper>
          </div>
        ),
      },
      {
        resizable: true,
        width: columnWidth(28),
        headerName: "Latest Completed Activity",
        field: "LATEST_ACTIVITY_NAME",
        cellStyle: { "white-space": "normal", "line-height": 1.5 },
        cellRendererFramework: (params) => (
          <div
            style={{
              paddingTop: 10,
            }}
          >
            {params.data.LATEST_ACTIVITY_NAME}
          </div>
        ),
        headerComponentFramework: (params) => {
          if (currentSort == "cs-a") {
            return (
              <div className="headerDiv">
                Latest Completed Activity
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => sortingInterface("cs-d")}
                >
                  <ArrowDownwardIcon className={classes.filter} />
                </IconButton>
              </div>
            );
          } else if (currentSort == "cs-d") {
            return (
              <div className="headerDiv">
                Latest Completed Activity
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => sortingInterface("cs-a")}
                >
                  <ArrowUpwardIcon className={classes.filter} />
                </IconButton>
              </div>
            );
          } else {
            return (
              <div className="headerDiv">
                Latest Completed Activity
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => sortingInterface("cs-a")}
                >
                  <RemoveIcon className={classes.filter} />
                </IconButton>
              </div>
            );
          }
        },
      },
      {
        resizable: true,
        width: columnWidth(11),
        headerName: "Predicted Delivery",
        field: "PREDICT_DATE",
      },
      {
        resizable: true,
        width: columnWidth(20),
        // cellStyle: { "white-space": "normal", "line-height": 1.5 },
        field: "DEFECTS_DETAILS",
        cellStyle: { "line-height": 1.5 },
        headerName: "Likely Defects",
        cellRendererFramework: (params) => (
          <p style={{ paddingTop: 4 }}>
            {params.data.DEFECTS_DETAILS.FIRST_DEFECT}{" "}
            <b>{`(${params.data.DEFECTS_DETAILS.FIRST_DEFECT_CONFIDENCE}%)`}</b>
            <br />
            {params.data.DEFECTS_DETAILS.SECOND_DEFECT}{" "}
            <b>{`(${params.data.DEFECTS_DETAILS.SECOND_DEFECT_CONFIDENCE}%)`}</b>
            <br />
            {params.data.DEFECTS_DETAILS.THIRD_DEFECT}{" "}
            <b>{`(${params.data.DEFECTS_DETAILS.THIRD_DEFECT_CONFIDENCE}%)`}</b>
          </p>
        ),
      },
      {
        width: columnWidth(10),
        headerName: "Final Inspection",
        field: "PREDICT_FINAL_INSPECTION",
        cellRendererFramework: (params) => (
          <div
            align="center"
            style={{
              paddingTop: 10,
            }}
          >
            <Paper
              className={classes.status}
              style={{
                color: "#fff",
                maxWidth: 80,
                backgroundColor: getBgColor(
                  params.data.PREDICT_FINAL_INSPECTION,
                  "MAIN"
                ),
              }}
            >
              <Typography className={classes.statusTxt} align="center">
                {params.data.PREDICT_FINAL_INSPECTION == 0 ? "Fail" : "Pass"}
              </Typography>
              <Typography className={classes.confidence}>
                {params.data.PREDICT_CONFIDENCE_FINAL_INSP}
              </Typography>
            </Paper>
          </div>
        ),
      },

      // {
      //   width: columnWidth(10),
      //   headerName: "Actions",
      //   field: "DELAY4",
      //   cellRendererFramework: ActionableDropdown,
      // },
    ];

    _column_ = _column_.filter((el) => columnsActive[el.field]);

    if (localColumnState == null && type == "reg") {
      return _column_;
    } else if (type == "reg") {
      let mainCols = _column_;
      let local_ = [];
      checkboxColumnState.columns.forEach((element) => {
        mainCols.forEach((item) => {
          if (item.field == element.colId) {
            // item.width = element.width;
            item.width = columnWidth(element.percentw);
            local_.push(item);
          }
        });
      });
      return local_;
    } else if (type == "check") {
      let mainCols = _column_;
      let local_ = [];
      checkboxColumnState.columns.forEach((element) => {
        mainCols.forEach((item) => {
          if (item.field == element.colId) {
            // item.width = element.width;
            item.width = columnWidth(element.percentw);
            local_.push(item);
          }
        });
      });
      return local_;
    }
  };

  const setSave = () => {
    setSaveCount(saveCount + 1);
    if (saveCount + 1 == 1 && localColumnState != null) {
      // Restore(localColumnState.columns);
    }
    if (gridColumnApi != null) {
      setColumnState({
        columns: gridColumnApi.getColumnState(),
        dimensions: dimensions,
      });
      secondPercentWidthSetting();
      // setGridDimensions({ width: dimensions.width, height: dimensions.height });
    }
  };

  const Restore = (last) => {
    gridColumnApi.applyColumnState({
      state: last,
      applyOrder: true,
    });
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const gridOptions = {
    rowStyle: { background: "#F5F5F5" },
    getRowStyle: (params) => {
      if (params.node.rowIndex % 2 === 1) {
        return { background: "#FFFFFF" };
      }
    },
    rowHeight: 70,
    alwaysShowVerticalScroll: false,
    // suppressColumnMoveAnimation: true,
    applyColumnDefOrder: true,
    suppressRowTransform: true,
  };

  const columnChecked = (event, param) => {
    setColumnsActive({ ...columnsActive, [param]: event.target.checked });
    gridApi.setColumnDefs(getColDefs("check"));
  };

  const handleColumnsReset = () => {
    var columnsToReset = columnsActive;
    for (var key of Object.keys(columnsToReset)) {
      columnsToReset[key] = true;
    }
    setColumnsActive(columnsToReset);
    setColumnState(null);
    setLocalColumnState(null);
    gridApi.setColumnDefs(getColDefs("reg"));
  };

  return (
    <div>
      <ContextMenuTrigger id="ID">
        <div
          ref={divRef}
          className="ag-theme-alpine"
          style={{
            height: dimensions.height - 120,
            width: "100%",
          }}
        >
          {/* <button onClick={() => Restore()}>Restore</button>
      <button onClick={() => setSave()}>Save</button> */}
          <AgGridReact
            gridOptions={gridOptions}
            columnDefs={getColDefs("reg")}
            suppressDragLeaveHidesColumns={true}
            onGridReady={onGridReady}
            rowData={myRows}
            suppressCellSelection={true}
            onColumnResized={setSave}
            onCellClicked={(params) => actionDropdownStatus(params)}
            onColumnMoved={setSave}
          ></AgGridReact>
          <Grid container>
            <Grid item container xs={6}></Grid>
            <Grid item xs={6}>
              <TablePagination
                rowsPerPageOptions={[25, 50, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              />
            </Grid>
          </Grid>
        </div>
      </ContextMenuTrigger>
      <ContextMenu id="ID">
        <SubMenu title="Edit Columns">
          <FormControl
            style={{ maxHeight: "50vh", overflowY: "auto", paddingBottom: 10 }}
            component="fieldset"
            className={classes.formControl}
          >
            <FormLabel component="legend">Select Columns</FormLabel>
            <FormGroup>
              {usableColumns.map((col, index) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={columnsActive[col.id]}
                      onChange={(event) => columnChecked(event, col.id)}
                    />
                  }
                  label={col.label}
                />
              ))}
            </FormGroup>
          </FormControl>
        </SubMenu>
        <MenuItem onClick={handleColumnsReset}>Reset Columns</MenuItem>
        <MenuItem divider />
        <MenuItem>Close</MenuItem>
      </ContextMenu>
    </div>
  );
};

export default ActiveOrderDataGrid;
