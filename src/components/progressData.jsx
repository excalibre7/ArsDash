import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { ProgressBar } from "react-bootstrap";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  bargrid: {
    color: "black",
    "&:hover": {
      fontWeight: "bold",
      cursor: "pointer",
      textDecoration: "none",
    },
  },
  visibilityicon: {
    padding: theme.spacing(0, 0, 0, 0),
  },
  percentMonth: {
    fontSize: "0.8rem",
  },
  percentWeek: {
    paddingTop: theme.spacing(0.5),
    fontSize: "0.5rem",
  },
  qtyMonth: {
    fontSize: "12px",
  },
  qtyWeek: {
    paddingTop: theme.spacing(0.5),
    fontSize: "8px",
  },
  progress: {
    marginTop: theme.spacing(0.3),
  },
}));

const ProgressData = (props) => {
  let classes = useStyles();
  const { det, backTo, wom, totalQty, preTotalQty, options } = props;

  const calcPercent = (data, param) => {
    if (options == "Qty") {
      if (
        data.before.qty +
          data.onTime.qty +
          data.oneWeek.qty +
          data.moreThanOneWeek.qty ==
        0
      ) {
        return 0;
      } else {
        return (
          (data[param].qty /
            (data.before.qty +
              data.onTime.qty +
              data.oneWeek.qty +
              data.moreThanOneWeek.qty)) *
          100
        );
      }
    } else {
      if (
        data.before.options +
          data.onTime.options +
          data.oneWeek.options +
          data.moreThanOneWeek.options ==
        0
      ) {
        return 0;
      } else {
        return (
          (data[param].options /
            (data.before.options +
              data.onTime.options +
              data.oneWeek.options +
              data.moreThanOneWeek.options)) *
          100
        );
      }
    }
  };

  return (
    <Grid container>
      <Grid
        className={classes.bargrid}
        component={Link}
        to={{
          pathname: "/qty",
          state: {
            qtydata: det.before.details,
            backTo: backTo,
          },
        }}
        container
        spacing={1}
        item
        xs={12}
      >
        <Grid className={classes.percentage} item xs={3}>
          <Typography
            className={
              wom == "month" ? classes.percentMonth : classes.percentWeek
            }
          >
            {Math.round(calcPercent(det, "before"))}%
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <ProgressBar
            className={wom == "week" ? classes.progress : "none"}
            style={{ cursor: "pointer" }}
            variant={"primary"}
            now={calcPercent(det, "before")}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography
            className={wom == "month" ? classes.qtyMonth : classes.qtyWeek}
          >
            {options == "Qty" ? det.before.qty : det.before.options}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        className={classes.bargrid}
        component={Link}
        to={{
          pathname: "/qty",
          state: {
            qtydata: det.onTime.details,
            backTo: backTo,
          },
        }}
        container
        spacing={1}
        item
        xs={12}
      >
        <Grid className={classes.percentage} item xs={3}>
          <Typography
            className={
              wom == "month" ? classes.percentMonth : classes.percentWeek
            }
          >
            {Math.round(calcPercent(det, "onTime"))}%
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <ProgressBar
            className={wom == "week" ? classes.progress : "none"}
            style={{ cursor: "pointer" }}
            variant={"success"}
            now={calcPercent(det, "onTime")}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography
            className={wom == "month" ? classes.qtyMonth : classes.qtyWeek}
          >
            {options == "Qty" ? det.onTime.qty : det.onTime.options}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        className={classes.bargrid}
        component={Link}
        to={{
          pathname: "/qty",
          state: {
            qtydata: det.oneWeek.details,
            backTo: backTo,
          },
        }}
        container
        spacing={1}
        item
        xs={12}
      >
        <Grid className={classes.percentage} item xs={3}>
          <Typography
            className={
              wom == "month" ? classes.percentMonth : classes.percentWeek
            }
          >
            {Math.round(calcPercent(det, "oneWeek"))}%
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <ProgressBar
            className={wom == "week" ? classes.progress : "none"}
            style={{ cursor: "pointer" }}
            variant={"warning"}
            now={calcPercent(det, "oneWeek")}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography
            className={wom == "month" ? classes.qtyMonth : classes.qtyWeek}
          >
            {options == "Qty" ? det.oneWeek.qty : det.oneWeek.options}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        className={classes.bargrid}
        component={Link}
        to={{
          pathname: "/qty",
          state: {
            qtydata: det.moreThanOneWeek.details,
            backTo: backTo,
          },
        }}
        container
        spacing={1}
        item
        xs={12}
      >
        <Grid className={classes.percentage} item xs={3}>
          <Typography
            className={
              wom == "month" ? classes.percentMonth : classes.percentWeek
            }
          >
            {Math.round(calcPercent(det, "moreThanOneWeek"))}%
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <ProgressBar
            className={wom == "week" ? classes.progress : "none"}
            style={{ cursor: "pointer" }}
            variant={"danger"}
            now={calcPercent(det, "moreThanOneWeek")}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography
            className={wom == "month" ? classes.qtyMonth : classes.qtyWeek}
          >
            {options == "Qty"
              ? det.moreThanOneWeek.qty
              : det.moreThanOneWeek.options}
          </Typography>
        </Grid>
      </Grid>
      <Grid style={{ paddingTop: 5 }} item xs={12}>
        {preTotalQty}
        <b>{totalQty}</b>
      </Grid>
    </Grid>
  );
};

export default ProgressData;
