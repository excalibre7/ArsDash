import React, { Component, useEffect, useRef, useState } from "react";
import TopBar from "../components/topbar";
import OrderPredTable from "../components/activeOrdersNewNotUselessTable";
import {
  Collapse,
  Typography,
  Grid,
  Button,
  TextField,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import MultiSelect from "react-multi-select-component";
import RangePicker from "../components/rangePicker";
import ResetFloating from "../components/resetfloating";
import { useLocation, Redirect } from "react-router-dom";
import BackFloating from "../components/backfloating";
import ActiveOrderDataGrid from "../components/activeOrderDataGrid";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
  },
  title: {
    fontWeight: "bold",
    // fontFamily: "Poppins",
  },
  filtergrid: {
    padding: theme.spacing(2, 2, 2, 2),
  },
  status: {
    textTransform: "none",
    color: "#ffffff",
    height: "2.2rem",
    width: "10vw",
    fontSize: "1rem",
    paddingTop: theme.spacing(0.6),
    "&:hover": {
      cursor: "pointer",
    },
  },
  childstatus: {
    textTransform: "none",
    color: "#ffffff",
    height: "2.2rem",
    width: "2vw",
    fontSize: "1rem",
    paddingTop: theme.spacing(0.6),
    "&:hover": {
      cursor: "pointer",
    },
  },
  statusbtn: {
    fontSize: "1rem",
  },
  childstatusbtn: {
    fontSize: "0.7rem",
  },
}));

const QtyPage = (props) => {
  const {
    resultBrands,
    resultVendors,
    resultSeasons,
    loggedIn,
    columnState,
    setColumnState,
    activeColumnsActiveOrderGrid,
    setActiveColumnsActiveOrderGrid,
    actions,
    isBrand,
    summaryQtyType,
    lastSync,
    comparisonData,
    saveColConfig,
  } = props;
  const statusOptions = [
    { value: "ON-TIME" },
    { value: "BEFORE" },
    { value: "MORE-THAN-ONE-WEEK" },
    { value: "ONE-WEEK" },
  ];
  const finalInspectionOptions = [{ value: 1 }, { value: 0 }];
  const comparisonOptions = [
    { value: "improved" },
    { value: "deteriorate" },
    { value: "zero" },
  ];
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [page, setPage] = useState(0);
  const location = useLocation();
  var qtydata = [];
  var backTo = "/";
  if (location.state != undefined) {
    qtydata = location.state.qtydata;
    backTo = location.state.backTo;
  }
  console.log(qtydata);
  var [showFilter, setShowFilter] = useState(false);
  const divRef = useRef(null);
  const [selectedVendors, setSelectedVendors] = useState(resultVendors); //received
  const [selectedBrands, setSelectedBrands] = useState(resultBrands); //received
  const [selectedSeasons, setSelectedSeasons] = useState(resultSeasons); //received
  const [selectedStatus, setSelectedStatus] = useState(statusOptions);
  const [selectedFinalInspection, setSelectedFinalInspection] = useState(
    finalInspectionOptions
  );
  const [selectedComparisonOptions, setSelectedComparisonOptions] =
    useState(comparisonOptions);
  const [orderDates, setOrderDates] = useState({
    startDate: new Date("1-Jan-2014"),
    endDate: new Date("1-Jan-2023"),
  });
  const [deliveryDates, setDeliveryDates] = useState({
    startDate: new Date("1-Jan-2014"),
    endDate: new Date("1-Jan-2023"),
  });
  const [qtyLower, setQtyLower] = useState(0);
  const [qtyUpper, setQtyUpper] = useState(999999);
  const [searchTerm, setSearchTerm] = useState("");
  const [redirect, setRedirect] = useState(false);

  const [currentSort, setCurrentSort] = useState("no-a");
  //null, qty-d, qty-a, qty desc or asc, ord, del, pred, no

  let lowerRef = useRef(null);
  let upperRef = useRef(null);

  let classes = useStyles();

  // useEffect(() => {
  //   if (comparisonData != null && qtydata != null) {
  //     qtydata.forEach((element, index) => {
  //       element["comparisons"] = comparisonData[index];
  //     });
  //   }
  //   console.log(qtydata);
  // }, [qtydata, comparisonData]);

  const getBool = (item, type) => {
    var isIn = false;
    if (type == "vendors") {
      selectedVendors.forEach((element) => {
        if (element.value == item) {
          isIn = true;
        }
      });
    } else if (type == "brands") {
      selectedBrands.forEach((element) => {
        if (element.value == item) {
          isIn = true;
        }
      });
    } else if (type == "status") {
      // let label_ = item == 0 ? "delayed" : "on time";
      selectedStatus.forEach((element) => {
        if (element.value == item) {
          isIn = true;
        }
      });
    } else if (type == "seasons") {
      selectedSeasons.forEach((element) => {
        if (element.value == item) {
          isIn = true;
        }
      });
    } else if (type == "finalInspection") {
      selectedFinalInspection.forEach((element) => {
        if (element.value == item) {
          isIn = true;
        }
      });
    } else if (type == "comparison") {
      if (selectedComparisonOptions.length == 3) {
        isIn = true;
      } else if (item != null) {
        if (selectedComparisonOptions[0].value == "improved") {
          if (item < 0) {
            isIn = true;
          }
        } else if (selectedComparisonOptions[0].value == "deteriorate") {
          if (item > 0) {
            isIn = true;
          }
        }
      }
    }
    return isIn;
  };

  const handleFinalInspectionClick = (status) => {
    setPage(0);
    if (status == "all") {
      setSelectedFinalInspection([{ value: 1 }, { value: 0 }]);
    } else if (status == "fail") {
      setSelectedFinalInspection([{ value: 0 }]);
    } else if (status == "pass") {
      setSelectedFinalInspection([{ value: 1 }]);
    }
  };

  const handleComparisonStatus = (status) => {
    setPage(0);
    if (status == "all") {
      setSelectedComparisonOptions([
        { value: "improved" },
        { value: "deteriorate" },
        { value: "zero" },
      ]);
    } else if (status == "deteriorate") {
      setSelectedComparisonOptions([{ value: "deteriorate" }]);
    } else if (status == "improved") {
      setSelectedComparisonOptions([{ value: "improved" }]);
    }
  };

  const handleStatusClick = (status) => {
    setPage(0);
    if (status == "ontime") {
      setSelectedStatus([{ value: "ON-TIME" }, { value: "BEFORE" }]);
    } else if (status == "delayed") {
      setSelectedStatus([
        { value: "MORE-THAN-ONE-WEEK" },
        { value: "ONE-WEEK" },
      ]);
    } else if (status == "all") {
      setSelectedStatus([
        { value: "ON-TIME" },
        { value: "BEFORE" },
        { value: "MORE-THAN-ONE-WEEK" },
        { value: "ONE-WEEK" },
      ]);
    } else if (status == "oneweekontime") {
      setSelectedStatus([{ value: "ON-TIME" }]);
    } else if (status == "before") {
      setSelectedStatus([{ value: "BEFORE" }]);
    } else if (status == "slightdelay") {
      setSelectedStatus([{ value: "ONE-WEEK" }]);
    } else if (status == "moredelay") {
      setSelectedStatus([{ value: "MORE-THAN-ONE-WEEK" }]);
    }
  };

  const handleReset = () => {
    setSelectedVendors(resultVendors);
    setSelectedBrands(resultBrands);
    setSelectedSeasons(resultSeasons);

    setOrderDates({
      startDate: new Date("1-Jan-1990"),
      endDate: new Date("1-Jan-2023"),
    });
    setDeliveryDates({
      startDate: new Date("1-Jan-1990"),
      endDate: new Date("1-Jan-2023"),
    });
    setSelectedStatus(statusOptions);
    setQtyLower(0);
    setQtyUpper(999999);
    setSelectedFinalInspection(finalInspectionOptions);
    setSelectedComparisonOptions(comparisonOptions);
    // lowerRef.current.value = "";
    // upperRef.current.value = "";
  };

  const handleBack = () => {
    setRedirect(true);
  };

  var filteredData = qtydata.filter(
    (data) =>
      getBool(data.VENDOR.toLowerCase(), "vendors") &&
      getBool(data.BRAND.toLowerCase(), "brands") &&
      getBool(data.SEASON.toLowerCase(), "seasons") &&
      getBool(data.PREDICT_ON_TIME_STATUS, "status") &&
      getBool(data.changeInDelayMag, "comparison") &&
      getBool(data.PREDICT_FINAL_INSPECTION, "finalInspection") &&
      new Date(data.ORDER_DATE) >= orderDates.startDate &&
      new Date(data.ORDER_DATE) <= orderDates.endDate &&
      new Date(data.GRN_COMMIT_DATE) >= deliveryDates.startDate &&
      new Date(data.GRN_COMMIT_DATE) <= deliveryDates.endDate &&
      parseInt(data.QTY) >= qtyLower &&
      parseInt(data.QTY) <= qtyUpper
  );

  const filterNumber = (param, ad) => {
    if (ad == "a") {
      filteredData.sort((a, b) => (a[param] > b[param] ? 1 : -1));
    } else {
      filteredData.sort((a, b) => (a[param] < b[param] ? 1 : -1));
    }
  };

  const filterDate = (param, ad) => {
    if (ad == "a") {
      filteredData.sort((a, b) =>
        new Date(a[param]) > new Date(b[param]) ? 1 : -1
      );
    } else {
      filteredData.sort((a, b) =>
        new Date(a[param]) < new Date(b[param]) ? 1 : -1
      );
    }
  };

  if (currentSort == "no-a") {
    filterNumber("FG_CODE", "a");
  } else if (currentSort == "no-d") {
    filterNumber("FG_CODE", "d");
  } else if (currentSort == "qty-a") {
    filterNumber("QTY", "a");
  } else if (currentSort == "qty-d") {
    filterNumber("QTY", "d");
  } else if (currentSort == "ord-d") {
    filterDate("ORDER_DATE", "d");
  } else if (currentSort == "ord-a") {
    filterDate("ORDER_DATE", "a");
  } else if (currentSort == "del-d") {
    filterDate("GRN_COMMIT_DATE", "d");
  } else if (currentSort == "del-a") {
    filterDate("GRN_COMMIT_DATE", "a");
  } else if (currentSort == "cs-a") {
    filterNumber("LATEST_ACTIVITY_NAME", "a");
  } else if (currentSort == "cs-d") {
    filterNumber("LATEST_ACTIVITY_NAME", "d");
  } else if (currentSort == "fi-a") {
    filterNumber("PREDICT_FINAL_INSPECTION", "a");
  } else if (currentSort == "fi-d") {
    filterNumber("PREDICT_FINAL_INSPECTION", "d");
  } else if (currentSort == "capoff-d") {
    filterNumber("CAPACITY_OFFERED", "d");
  } else if (currentSort == "capoff-a") {
    filterNumber("CAPACITY_OFFERED", "a");
  }
  const changeFilter = () => {
    setShowFilter(!showFilter);
  };

  const setDateRange = (type, data) => {
    if (type == "order") {
      setOrderDates(data);
    } else if (type == "delivery") {
      setDeliveryDates(data);
    }
  };

  const handleQtyLimitsChangeLower = (event) => {
    if (event.target.value == "") {
      setQtyUpper(999999);
    } else {
      if (isNaN(event.target.value)) {
        alert("Please enter only numbers");
      } else {
        setQtyUpper(parseInt(event.target.value));
      }
    }
  };

  const handleQtyLimitsChangeUpper = (event) => {
    if (event.target.value == "") {
      setQtyUpper(999999);
    } else {
      if (isNaN(event.target.value)) {
        alert("Please enter only numbers");
      } else {
        setQtyUpper(parseInt(event.target.value));
      }
    }
  };

  const handleOrderSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  filteredData = filteredData.filter(
    (e) =>
      e.VENDOR.toLowerCase().includes(searchTerm) ||
      e.BRAND.toLowerCase().includes(searchTerm) ||
      e.FG_CODE.toLowerCase().includes(searchTerm)
  );

  if (location.state == undefined) {
    return <div>DENIED</div>;
  } else {
    if (redirect) {
      return <Redirect to={backTo} />;
    } else {
      return (
        <div>
          <header>
            <TopBar
              showFilter={showFilter}
              lastSync={lastSync}
              changeFilter={changeFilter}
              page="qty"
              handleSearch={handleOrderSearch}
            />
          </header>
          <Collapse in={showFilter}>
            <Grid className={classes.filtergrid} spacing={2} container>
              <Grid container item xs={4}>
                <Grid style={{ textAlign: "center" }} item xs={12}>
                  <Typography className={classes.title}>Vendors</Typography>
                </Grid>
                <Grid item xs={12}>
                  <MultiSelect
                    options={resultVendors}
                    value={selectedVendors}
                    onChange={setSelectedVendors}
                    labelledBy="Select Vendors"
                  />
                </Grid>
              </Grid>
              <Grid container item xs={4}>
                <Grid style={{ textAlign: "center" }} item xs={12}>
                  <Typography className={classes.title}>Brands</Typography>
                </Grid>
                <Grid item xs={12}>
                  <MultiSelect
                    options={resultBrands}
                    value={selectedBrands}
                    onChange={setSelectedBrands}
                    labelledBy="Select Brands"
                  />
                </Grid>
              </Grid>
              <Grid container item xs={4}>
                <Grid style={{ textAlign: "center" }} item xs={12}>
                  <Typography className={classes.title}>Seasons</Typography>
                </Grid>
                <Grid item xs={12}>
                  <MultiSelect
                    options={resultSeasons}
                    value={selectedSeasons}
                    onChange={setSelectedSeasons}
                    labelledBy="Select Seasons"
                  />
                </Grid>
              </Grid>{" "}
              <Grid spacing={1} container item xs={4}>
                <Grid
                  className={classes.title}
                  style={{ textAlign: "center" }}
                  item
                  xs={12}
                >
                  Quantity
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    onChange={handleQtyLimitsChangeLower}
                    size="small"
                    variant="outlined"
                    label="From"
                    inputRef={lowerRef}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    onChange={handleQtyLimitsChangeUpper}
                    size="small"
                    variant="outlined"
                    label="To"
                    inputRef={upperRef}
                  />
                </Grid>
              </Grid>
              <Grid container item xs={4}>
                <Grid style={{ textAlign: "center" }} item xs={12}>
                  <Typography className={classes.title}>Order Date</Typography>
                </Grid>
                <Grid style={{ textAlign: "center" }} item xs={12}>
                  <RangePicker
                    initialDates={orderDates}
                    type="order"
                    setDateRange={setDateRange}
                  />
                </Grid>
              </Grid>
              {/* <Grid item xs={9} /> */}
              <Grid container item xs={4}>
                <Grid style={{ textAlign: "center" }} item xs={12}>
                  <Typography className={classes.title}>
                    Delivery Date
                  </Typography>
                </Grid>
                <Grid style={{ textAlign: "center" }} item xs={12}>
                  <RangePicker
                    initialDates={deliveryDates}
                    type="delivery"
                    setDateRange={setDateRange}
                  />
                </Grid>
              </Grid>
              <Grid container item xs={4}>
                <Grid style={{ textAlign: "center" }} item xs={12}>
                  <Typography className={classes.title}>
                    Final Inspection
                  </Typography>
                </Grid>
                <Grid container spacing={1} item xs={12}>
                  <Grid align="center" item xs={4}>
                    <Button
                      onClick={() => handleFinalInspectionClick("all")}
                      className={classes.status}
                      style={{ backgroundColor: "#0095ff" }}
                    >
                      <Typography className={classes.statusbtn}>
                        Both
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid align="center" item xs={4}>
                    <Button
                      onClick={() => handleFinalInspectionClick("fail")}
                      className={classes.status}
                      style={{ backgroundColor: "#e60e0e" }}
                    >
                      <Typography className={classes.statusbtn}>
                        Fail
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid align="center" item xs={4}>
                    <Button
                      onClick={() => handleFinalInspectionClick("pas")}
                      className={classes.status}
                      style={{ backgroundColor: "#00b803" }}
                    >
                      <Typography className={classes.statusbtn}>
                        Pass
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={4}></Grid>
                </Grid>
              </Grid>
              <Grid container item xs={4}>
                <Grid style={{ textAlign: "center" }} item xs={12}>
                  <Typography className={classes.title}>
                    Comparison Status
                  </Typography>
                </Grid>
                <Grid container spacing={1} item xs={12}>
                  <Grid align="center" item xs={4}>
                    <Button
                      onClick={() => handleComparisonStatus("all")}
                      className={classes.status}
                      style={{ backgroundColor: "#0095ff" }}
                    >
                      <Typography className={classes.statusbtn}>
                        Both
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid align="center" item xs={4}>
                    <Button
                      onClick={() => handleComparisonStatus("deteriorate")}
                      className={classes.status}
                      style={{ backgroundColor: "#e60e0e" }}
                    >
                      <Typography className={classes.statusbtn}>
                        Deteriorate
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid align="center" item xs={4}>
                    <Button
                      onClick={() => handleComparisonStatus("improved")}
                      className={classes.status}
                      style={{ backgroundColor: "#00b803" }}
                    >
                      <Typography className={classes.statusbtn}>
                        Improved
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={4}></Grid>
                </Grid>
              </Grid>
              <Grid container item xs={4}>
                <Grid style={{ textAlign: "center" }} item xs={12}>
                  <Typography className={classes.title}>Status</Typography>
                </Grid>
                <Grid container spacing={1} item xs={12}>
                  <Grid align="center" item xs={4}>
                    <Button
                      onClick={() => handleStatusClick("all")}
                      className={classes.status}
                      style={{ backgroundColor: "#0095ff" }}
                    >
                      <Typography className={classes.statusbtn}>All</Typography>
                    </Button>
                  </Grid>
                  <Grid align="center" item xs={4}>
                    <Button
                      onClick={() => handleStatusClick("delayed")}
                      className={classes.status}
                      style={{ backgroundColor: "#e60e0e" }}
                    >
                      <Typography className={classes.statusbtn}>
                        Delayed
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid align="center" item xs={4}>
                    <Button
                      onClick={() => handleStatusClick("ontime")}
                      className={classes.status}
                      style={{ backgroundColor: "#00b803" }}
                    >
                      <Typography className={classes.statusbtn}>
                        OnTime
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={4}></Grid>
                  <Grid item xs={2}>
                    <Button
                      onClick={() => handleStatusClick("slightdelay")}
                      className={classes.childstatus}
                      style={{ backgroundColor: "#FFC107" }}
                    >
                      <Typography className={classes.childstatusbtn}>
                        SlightDelay
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      onClick={() => handleStatusClick("moredelay")}
                      className={classes.childstatus}
                      style={{ backgroundColor: "#e60e0e" }}
                    >
                      <Typography className={classes.childstatusbtn}>
                        Delay
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      onClick={() => handleStatusClick("before")}
                      className={classes.childstatus}
                      style={{ backgroundColor: "#009103" }}
                    >
                      <Typography className={classes.childstatusbtn}>
                        Before
                      </Typography>
                    </Button>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      onClick={() => handleStatusClick("oneweekontime")}
                      className={classes.childstatus}
                      style={{ backgroundColor: "#30b833" }}
                    >
                      <Typography className={classes.childstatusbtn}>
                        OnTime
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Collapse>
          {/* Paste from topaste.txt in dump folder */}
          <ActiveOrderDataGrid
            divRef={divRef}
            currentSort={currentSort}
            saveColConfig={saveColConfig}
            setCurrentSort={setCurrentSort}
            lastSync={lastSync}
            rows={filteredData}
            columnState={columnState}
            setColumnState={setColumnState}
            page={page}
            isbrand={isBrand}
            setPage={setPage}
            summaryQtyType={summaryQtyType}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            columnsActive={activeColumnsActiveOrderGrid}
            setColumnsActive={setActiveColumnsActiveOrderGrid}
            actions={actions}
          />
          {showFilter ? (
            <ResetFloating page="qty" handleClick={handleReset} />
          ) : null}
          <BackFloating handleClick={handleBack} />
        </div>
      );
    }
  }
};

export default QtyPage;
