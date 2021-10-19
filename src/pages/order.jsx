import React, { Component, useState } from "react";
import SearchableInput from "../components/searchableinput";
import { makeStyles } from "@material-ui/styles";
import {
  AppBar,
  Grid,
  Toolbar,
  Typography,
  IconButton,
  Button,
  LinearProgress,
} from "@material-ui/core";
import { ArrowBack, Close } from "@material-ui/icons";
import { Link, Redirect } from "react-router-dom";
import TextInput from "../components/textInput";

const useStyles = makeStyles((theme) => ({
  prog: {
    color: "green",
  },
  padDiv: {
    paddingLeft: "6vh",
    paddingTop: "3vh",
    paddingBottom: "3vh",
    paddingRight: "6vh",
  },
  bar: {
    height: "7",
  },
  barTxt: {
    fontWeight: "bold",
    color: "white",
    fontSize: "1.2rem",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white",
  },
  closeButton: {
    // fontSize: "3rem",
  },
  submit: {
    width: "100%",
    height: "75%",
    color: "white",
  },
  rightToolbar: {
    marginLeft: "auto",
  },
}));

const Order = (props) => {
  const {
    categoryData,
    brandData,
    getPrediction,
    handleClose,
    clientID,
    bearer,
  } = props;

  const [loading, setLoading] = useState(false); //loading state used to display loader & change button text when data is being processed
  const [showScreen, changeScreen] = useState(true); //boolean state to toggle whether to show the screen or redirect to prediction result
  const [data, setData] = useState({
    typeOfGarment: null,
    complexity: null,
    brand: null,
    season: null,
    gender: null,
    piecesRaw: null,
    orderTimeRaw: null,
  });
  const complexity = [
    { complexity: "High" },
    { complexity: "Medium" },
    { complexity: "Low" },
  ];
  const season = [
    { season: "Summer" },
    { season: "Winter" },
    { season: "All-year" },
  ];
  const genders = [
    { gender: "Mens" },
    { gender: "Womens" },
    { gender: "Boys" },
    { gender: "Girls" },
  ];

  const setting = (param, paramPassed) => {
    //preparing the received data to submit to API to get predictions
    let locData = data;
    locData[param] = paramPassed;
    setData(locData);
  };

  const submitData = () => {
    //posting data to API to get predictions
    setLoading(true); //loading

    fetch(`https://vendorratingapi.bluekaktus.com/api/predictRating`, {
      method: "POST",
      body: JSON.stringify({
        clientID: clientID,
        predictionParams: {
          typeOfGarment: data.typeOfGarment,
          complexity: data.complexity,
          brand: data.brand,
          season: data.season,
          gender: data.gender,
          piecesRaw: data.piecesRaw,
          orderTimeRaw: data.orderTimeRaw,
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + bearer,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        getPrediction(data);
        setLoading(false); //loading stops
        changeScreen(false); //screenchanged
      });
  };

  let classes = useStyles();
  if (showScreen) {
    return (
      <div>
        <header>
          <AppBar className={classes.bar} position="static">
            <Toolbar>
              <Link to="/">
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="open drawer"
                >
                  <ArrowBack />
                </IconButton>
              </Link>
              <Typography className={classes.barTxt}>
                CREATE NEW ORDER
              </Typography>
              <section className={classes.rightToolbar}>
                <IconButton
                  onClick={handleClose}
                  className={`${classes.menuButton} ${classes.closeButton}`}
                >
                  <Close />
                </IconButton>
              </section>
            </Toolbar>
          </AppBar>
          {loading ? <LinearProgress className={classes.prog} /> : null}
        </header>
        <body>
          <div className={classes.padDiv}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <SearchableInput
                  setting={setting}
                  data={categoryData}
                  lbl="Type of Garment"
                  sub="TYPE_OF_GARMENT"
                  par="typeOfGarment"
                />
              </Grid>
              <Grid item xs={4}>
                <SearchableInput
                  setting={setting}
                  data={brandData}
                  lbl="Brand name"
                  sub="BRAND_NAME"
                  par="brand"
                />
              </Grid>
              <Grid item xs={4}>
                <SearchableInput
                  setting={setting}
                  data={complexity}
                  lbl="Complexity"
                  sub="complexity"
                  par="complexity"
                />
              </Grid>
              <Grid item xs={4}>
                <SearchableInput
                  setting={setting}
                  data={season}
                  lbl="Season"
                  sub="season"
                  par="season"
                />
              </Grid>
              <Grid item xs={4}>
                <TextInput lbl="Order Qty" par="piecesRaw" setting={setting} />
              </Grid>
              <Grid item xs={4}>
                <TextInput
                  lbl="Order Duration (in days)"
                  par="orderTimeRaw"
                  setting={setting}
                />
              </Grid>
              <Grid item xs={4}>
                <SearchableInput
                  setting={setting}
                  data={genders}
                  lbl="Gender"
                  sub="gender"
                  par="gender"
                />
              </Grid>
              <Grid item xs={4} />
              <Grid item xs={4}>
                <Button
                  className={classes.submit}
                  variant="contained"
                  onClick={() => submitData()}
                  color="primary"
                >
                  <Typography>
                    {loading ? "Predicting..." : "Submit"}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </div>
        </body>
      </div>
    );
  } else {
    return <Redirect to="/predict" />;
  }
};

export default Order;
