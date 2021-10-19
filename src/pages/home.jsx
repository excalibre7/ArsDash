import React, { Component, useState, useRef } from "react";
import MyTable from "../components/mytable";
import OrderPop from "../components/orderpop";
import { Redirect } from "react-router-dom";
import OrderPredTable from "../components/orderPredTable";
import { AppBar, Toolbar, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import TopBar from "../components/topbar";
import ScaleLoader from "react-spinners/ScaleLoader";

const useStyles = makeStyles((theme) => ({
  spinner: {
    marginTop: theme.spacing(7),
  },
  root: {
    overflow: "overlay",
  },
}));

const Home = (props) => {
  const {
    data,
    categoryData,
    brandData,
    getPrediction,
    loggedIn,
    clientID,
    bearer,
  } = props;
  const classes = useStyles();
  const mainDivRef = useRef(); //ref in order to anchor popover
  const [blur, setBlur] = useState(false); //blur state so that page blurs when user clicks popover
  const [currentSort, setCurrentSort] = useState("otp-d");
  const [searchTerm, setSearchTerm] = useState("");

  const filterNumber = (param, ad) => {
    if (ad == "a") {
      data.sort((a, b) => (parseInt(a[param]) > parseInt(b[param]) ? 1 : -1));
    } else {
      data.sort((a, b) => (parseInt(a[param]) < parseInt(b[param]) ? 1 : -1));
    }
  };

  if (currentSort == "otp-a") {
    filterNumber("ON_TIME_PERFORMANCE", "a");
  } else if (currentSort == "otp-d") {
    filterNumber("ON_TIME_PERFORMANCE", "d");
  } else if (currentSort == "capu-a") {
    filterNumber("CAPACITY_UTILIZED", "a");
  } else if (currentSort == "capu-d") {
    filterNumber("CAPACITY_UTILIZED", "d");
  } else if (currentSort == "capo-a") {
    filterNumber("CAPACITY_OFFERED", "a");
  } else if (currentSort == "capo-d") {
    filterNumber("CAPACITY_OFFERED", "d");
  } else if (currentSort == "pcspending-a") {
    filterNumber("PCS_PENDING", "a");
  } else if (currentSort == "pcspending-d") {
    filterNumber("PCS_PENDING", "d");
  } else if (currentSort == "pcsproduced-a") {
    filterNumber("PCS_PRODUCED", "a");
  } else if (currentSort == "pcsproduced-d") {
    filterNumber("PCS_PRODUCED", "d");
  }

  let filteredData = data.filter(
    (e) =>
      e.VENDOR_NAME.toLowerCase().includes(searchTerm) ||
      e.PRIMARY_CATEGORY.toLowerCase().includes(searchTerm)
  );

  const handleVendorSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const getBlur = () => {
    //function to return blur style
    if (blur) {
      return "blur(5px)";
    } else {
      return "none";
    }
  };

  const handlePopOpenClose = () => {
    //toggles blur whenever popover opens or clsoes
    setBlur(!blur);
  };

  if (loggedIn) {
    //only renders page if user is logged in
    if (data.length == 0) {
      return (
        <div>
          <header>
            <TopBar page="vendor_rating" />
          </header>
          <Grid className={classes.spinner} container>
            <Grid align="center" xs={12}>
              <ScaleLoader color={"#6495ed"} loading={true} size={150} />
            </Grid>
            <Grid align="center" xs={12}>
              Trying to fetch...
            </Grid>
          </Grid>
        </div>
      );
    } else {
      return (
        <div ref={mainDivRef}>
          <header>
            <TopBar handleSearch={handleVendorSearch} page={"vendor_rating"} />
          </header>
          <OrderPop
            bearer={bearer}
            categoryData={categoryData}
            brandData={brandData}
            getPrediction={getPrediction}
            mainDivRef={mainDivRef}
            handlePopOpenClose={handlePopOpenClose}
            clientID={clientID}
          />
          <div style={{ filter: getBlur() }}>
            <MyTable
              setCurrentSort={setCurrentSort}
              currentSort={currentSort}
              style={{ paddingBottom: "100px" }}
              data={filteredData}
            />
          </div>
        </div>
      );
    }
  } else {
    return <Redirect to="/" />;
  }
};

export default Home;
