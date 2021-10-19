import React, { useEffect, useState, useRef } from "react";
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
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "../stylesheets/grid.css";
import useWindowDimensions from "../hooks/useWindowDimensions";
import "../stylesheets/App.css";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import RemoveIcon from "@material-ui/icons/Remove";
import { Sync } from "@material-ui/icons";
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
  totalqtylbl: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
  totalqty: {
    fontSize: "1rem",
  },
  totalqtybox: {
    paddingRight: theme.spacing(2),
  },
  sync: {
    fontSize: "0.8rem",
  },
  bottom: {
    fontSize: "0.7rem",
    fontWeight: "bold",
  },
  bottomForPredict: {
    fontSize: "0.8rem",
    fontWeight: "bold",
  },
  confPercent: {
    // color: "#000000",
    // paddingTop: theme.spacing(1.4),
    padding: 0,
    margin: 0,
    fontSize: "0.75rem",
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
    actions,
    summaryQtyType,
    saveColConfig,
    divRef,
    isbrand,
  } = props;
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  const [dimensions, setDimensions] = useState({ width: null, height: null });

  var myRows = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const [saveCount, setSaveCount] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [localColumnState, setLocalColumnState] = useState(null);
  const [actionDropdown, setActionDropdown] = useState(false);
  const [blur, setBlur] = useState("none");
  const [totalQty, setTotalQty] = useState(0);
  const gridRef = useRef(null);
  const [delivery, setDelivery] = useState({
    leftHeader: "LED",
    leftField: "SISR_DATE",
    rightHeader: "SCD",
    rightField: "BCDS_DATE",
  });

  const usableColumns = [
    { label: "FG Code", id: "FG_CODE" },
    { label: "Vendor", id: "VENDOR" },
    { label: "Brand", id: "BRAND" },
    { label: "Season", id: "SEASON" },
    { label: "Order Date", id: "ORDER_DATE" },
    { label: "Qty", id: "QTY" },
    { label: "Capacity Offered", id: "CAPACITY_OFFERED" },
    {
      label: delivery.leftHeader,
      id: "PO_DELIVERY_DATE",
    },
    { label: "Predicted Status", id: "PREDICT_ON_TIME" },
    { label: "Latest Completed Activity", id: "LATEST_ACTIVITY_NAME" },
    { label: delivery.rightHeader, id: "PREDICT_DATE" },
    { label: "Likely Defects", id: "DEFECTS_DETAILS" },
    { label: "Final Inspection", id: "PREDICT_FINAL_INSPECTION" },
    { label: "Actions", id: "DELAY4" },
  ];

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const commafy = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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

  const getDelayMagColor = (mag) => {
    if (parseInt(mag) == 0) {
      return "#017CFF";
    } else if (parseInt(mag) > 0) {
      return "#e60e0e";
    } else {
      return "#009103";
    }
  };

  const getConfidColor = (mag) => {
    if (mag == 0) {
      return "#017CFF";
    } else if (mag < 0) {
      return "#e60e0e";
    } else {
      return "#009103";
    }
  };

  const updateWindowDimensions = () => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
  };

  const secondPercentWidthSetting = () => {
    if (gridColumnApi != null) {
      let localCopyColumnState = gridColumnApi.getColumnState();
      localCopyColumnState.forEach((e) => {
        e.percentw = (e.width / dimensions.width) * 100;
      });
      setLocalColumnState({
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

  useEffect(() => {
    let _rows_ = JSON.parse(JSON.stringify(rows));
    let count = 0;
    _rows_.forEach((e) => {
      count += e.QTY;
    });
    setTotalQty(count);
  });

  useEffect(() => {
    if (isbrand) {
      setDelivery({
        leftHeader: "LED",
        leftField: "SISR_DATE",
        rightHeader: "SCD",
        rightField: "BCDS_DATE",
      });
    } else {
      if (summaryQtyType == "grn" || summaryQtyType == "predict") {
        setDelivery({
          leftHeader: "PO Delivery Date",
          leftField: "PO_DELIVERY_DATE",
          rightHeader: "Predicted Date",
          rightField: "PREDICT_DATE",
        });
      } else if (summaryQtyType == "SISR" || summaryQtyType == "SCD") {
        setDelivery({
          leftHeader: "LED",
          leftField: "SISR_DATE",
          rightHeader: "SCD",
          rightField: "BCDS_DATE",
        });
      }
    }
  }, [summaryQtyType]);

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

  const getColDefs = (type, changed) => {
    var _column_or = [
      {
        resizable: true,
        width: columnWidth(12),
        headerName: currentSort,
        field: "FG_CODE",
        headerComponentFramework: (params) => {
          if (currentSort == "no-a") {
            return (
              <div className="headerDiv">
                FG Code
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
                FG Code
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
                FG Code
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
        width: columnWidth(9),
        headerName: "Season",
        field: "SEASON",
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
        cellStyle: { textAlign: "right" },
        headerClass: "headerclassnumber",
        cellRendererFramework: (params) => commafy(params.data.QTY),
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
        width: columnWidth(16),
        resizable: true,
        headerName: currentSort,
        field: "CAPACITY_OFFERED",
        headerClass: "headerclassnumber",
        cellStyle: { textAlign: "right" },
        cellRendererFramework: (params) =>
          commafy(params.data.CAPACITY_OFFERED),
        headerComponentFramework: (params) => {
          if (currentSort == "capoff-a") {
            return (
              <div className="headerDiv">
                Weekly Capacity Offered
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
                Weekly Capacity Offered
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
                Weekly Capacity Offered
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
        width: columnWidth(12),
        headerName: currentSort,
        field: "PO_DELIVERY_DATE",
        cellRendererFramework: (params) => params.data[delivery.leftField],
        headerComponentFramework: (params) => {
          if (currentSort == "del-a") {
            return (
              <div className="headerDiv">
                {delivery.leftHeader}{" "}
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
                {delivery.leftHeader}{" "}
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
                {delivery.leftHeader}{" "}
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
        headerClass: "headerclass",
        headerComponentFramework: (params) => (
          <div className="headerDiv">
            {isbrand || summaryQtyType == "SCD" || summaryQtyType == "SISR" ? (
              "Status"
            ) : (
              <div>
                Predicted <br /> Status
              </div>
            )}
          </div>
        ),
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
                  isbrand || summaryQtyType == "SCD" || summaryQtyType == "SISR"
                    ? params.data.ON_TIME == 0
                      ? "MORE-THAN-ONE-WEEK"
                      : "ON-TIME"
                    : params.data.PREDICT_ON_TIME_STATUS,
                  "STATUS"
                ),
              }}
            >
              <Typography className={classes.statusTxt} align="center">
                {getStatusTag(
                  isbrand || summaryQtyType == "SCD" || summaryQtyType == "SISR"
                    ? params.data.ON_TIME == 0
                      ? "MORE-THAN-ONE-WEEK"
                      : "ON-TIME"
                    : params.data.PREDICT_ON_TIME_STATUS
                )}
              </Typography>
              {isbrand ||
              summaryQtyType == "SCD" ||
              summaryQtyType == "SISR" ? null : (
                <React.Fragment>
                  <Typography
                    style={{
                      display: "inline-block",
                    }}
                    className={classes.confidence}
                  >
                    {params.data.PREDICT_CONFIDENCE}{" "}
                  </Typography>{" "}
                  <Typography
                    style={{
                      display: "inline-block",
                      color: getConfidColor(params.data.changeInConfidence),
                    }}
                    className={classes.confPercent}
                  >
                    {`${
                      params.data.remarks == "updatedOrder"
                        ? `(${params.data.changeInConfidence < 0 ? "" : "+"}${
                            params.data.changeInConfidence
                          }%)`
                        : ""
                    }`}
                  </Typography>
                </React.Fragment>
              )}
            </Paper>
          </div>
        ),
      },
      {
        resizable: true,
        width: columnWidth(12.8),
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
            <br />
            <Typography
              className={classes.bottom}
            >{`(${params.data.LATEST_ACTIVITY_DATE})`}</Typography>
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
        width: columnWidth(12.5),
        headerName: delivery.rightHeader,
        field: "PREDICT_DATE",
        cellStyle: { "white-space": "normal", "line-height": 1.5 },
        cellRendererFramework: (params) => (
          <div
            style={{
              paddingTop: 10,
            }}
          >
            {params.data[delivery.rightField]}
            <br />
            {params.data.remarks && !isbrand == "updatedOrder" ? (
              <Typography
                style={{
                  color: getDelayMagColor(params.data.changeInDelayMag),
                }}
                className={classes.bottomForPredict}
              >{`(${params.data.changeInDelayMag < 0 ? "" : "+"}${
                params.data.changeInDelayMag
              } days)`}</Typography>
            ) : null}
          </div>
        ),
      },
      {
        width: columnWidth(10),
        headerName: "Actions",
        field: "DELAY4",
        cellRendererFramework: (params) => (
          <ActionableDropdown
            gridRef={gridRef}
            actions={actions}
            setBlur={setBlur}
            emails={{
              VENDOR: params.data.VENDOR_EMAIL,
              CATEGORY_HEAD: params.data.CATEGORY_HEAD_EMAIL,
            }}
          />
        ),
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
        headerName: "Final Inspection (First)",
        field: "PREDICT_FINAL_INSPECTION",
        headerClass: "headerclass",
        headerComponentFramework: (params) => (
          <div className="headerDiv">
            Final Inspection <br /> (First)
          </div>
        ),
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
              <Typography
                style={{ display: "inline-block" }}
                className={classes.confidence}
              >
                {params.data.PREDICT_CONFIDENCE_FINAL_INSP}{" "}
                <Typography
                  style={{
                    display: "inline-block",
                    color: getConfidColor(
                      params.data.changeFinalInspConfidence
                    ),
                  }}
                  className={classes.confPercent}
                >
                  {`${
                    params.data.remarks == "updatedOrder"
                      ? `(${
                          params.data.changeFinalInspConfidence < 0 ? "" : "+"
                        }${params.data.changeFinalInspConfidence}%)`
                      : ""
                  }`}
                </Typography>
              </Typography>
            </Paper>
          </div>
        ),
      },
    ];

    var _column_ = _column_or.filter((el) => columnsActive[el.field]);

    if (localColumnState == null && type == "reg") {
      return _column_;
    } else if (type == "reg") {
      let mainCols = _column_;
      let local_ = [];
      localColumnState.columns.forEach((element) => {
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
      localColumnState.columns.forEach((element) => {
        mainCols.forEach((item) => {
          if (item.field == element.colId) {
            // item.width = element.width;
            item.width = columnWidth(element.percentw);
            local_.push(item);
          }
        });
      });
      _column_or.forEach((element, index) => {
        if (element.field == changed) {
          local_.splice(index, 0, element);
        }
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
    var columnsToReset = JSON.parse(JSON.stringify(columnsActive));
    for (var key of Object.keys(columnsToReset)) {
      if (key == param) {
        columnsToReset[key] = event.target.checked;
      }
    }

    let locChanged = event.target.checked == true ? param : "none";

    setColumnsActive(columnsToReset);
    gridApi.setColumnDefs(getColDefs("check", locChanged));
    secondPercentWidthSetting();
  };

  const handleColumnsReset = () => {
    var columnsToReset = JSON.parse(JSON.stringify(columnsActive));
    for (var key of Object.keys(columnsToReset)) {
      columnsToReset[key] = true;
    }
    setColumnsActive(columnsToReset);
    setColumnState(null);
    setLocalColumnState(null);
    gridApi.setColumnDefs(getColDefs("reg"));
  };

  return (
    <div style={{ filter: blur }} ref={gridRef}>
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
            <Grid item container xs={6} md={2}>
              <Grid item xs={6}>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                  minHeight="100%"
                  className={classes.totalqtybox}
                  // style={{ borderStyle: "solid" }}
                >
                  <Typography className={classes.totalqty}>
                    Total Qty:
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  // style={{ borderStyle: "solid" }}
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  minHeight="100%"
                >
                  <Typography className={classes.totalqtylbl}>
                    {commafy(totalQty)}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
            <Grid item xs={9} md={3}>
              {/* <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                minHeight="100%"
                className={classes.totalqtybox}
                // style={{ borderStyle: "solid" }}
              >
                <Typography className={classes.sync}>
                  <Sync /> Last synced: {lastSync}
                </Typography>
              </Box> */}
            </Grid>
            <Grid item xs={10} md={7}>
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
      <ContextMenu onShow={() => secondPercentWidthSetting()} id="ID">
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
        <MenuItem onClick={saveColConfig}>Save State</MenuItem>
        <MenuItem onClick={handleColumnsReset}>Reset Columns</MenuItem>
        <MenuItem divider />
        <MenuItem>Close</MenuItem>
      </ContextMenu>
    </div>
  );
};

export default ActiveOrderDataGrid;
