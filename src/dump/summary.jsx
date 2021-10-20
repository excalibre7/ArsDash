import {
  Typography,
  makeStyles,
  Table,
  TableCell,
  TableRow,
  TableHead,
  Grid,
  Paper,
  Button,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, { Component, useState } from "react";
import TopBar from "../components/topbar";
import "../stylesheets/App.css";
import { Link, Route } from "react-router-dom";
import QtyPage from "../pages/qtypage";

const useStyles = makeStyles((theme) => ({
  row: {},
  superheader: {},
  superheaderTxt: {
    color: "white",
  },
  dates: {
    border: "none",
  },
  qtycard: {
    color: "#ffffff",
    height: "2rem",
    width: 75,
    paddingTop: theme.spacing(0.9),
    cursor: "pointer",
    "&:hover": {
      color: "#ffffff",
    },
  },
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#6495ed",
    color: theme.palette.common.white,
    fontSize: "0.75rem",
  },
  body: {
    fontSize: "0.75rem",
  },
}))(TableCell);

const Summary = (props) => {
  const { data } = props;
  const toMap = [null, null, null, null];
  let classes = useStyles();

  if (data.length == 0) {
    return (
      <div>
        <Grid container>
          <Grid align="center" xs={12}>
            Fetching...
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return (
      <div>
        <header>
          <TopBar page="summary" />
        </header>
        <body>
          <div className="wrapper">
            <Table className="fixedtbl">
              <col width="200px" />
              <col width="200px" />
              <col width="500px" />
              <col width="500px" />
              <col width="500px" />
              <col width="500px" />
              <StyledTableRow style={{ backgroundColor: "#6495ED" }}>
                <StyledTableCell />
                <StyledTableCell />
                <StyledTableCell align="center" className={classes.superheader}>
                  <Typography className={classes.superheaderTxt}>
                    {data[0].months[0].month}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="center" className={classes.superheader}>
                  <Typography className={classes.superheaderTxt}>
                    {data[0].months[1].month}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="center" className={classes.superheader}>
                  <Typography className={classes.superheaderTxt}>
                    {data[0].months[2].month}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="center" className={classes.superheader}>
                  <Typography className={classes.superheaderTxt}>
                    {data[0].months[3].month}
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow>
                <StyledTableCell>Brand</StyledTableCell>
                <StyledTableCell>Category</StyledTableCell>
                {toMap.map((row) => (
                  <StyledTableCell>
                    <Grid container>
                      <Grid item align="center" xs={3}>
                        Before Time
                      </Grid>
                      <Grid item align="center" xs={3}>
                        On Time
                      </Grid>
                      <Grid item align="center" xs={3}>
                        1 Week Delay
                      </Grid>
                      <Grid item align="center" xs={3}>
                        More Delay
                      </Grid>
                    </Grid>
                  </StyledTableCell>
                ))}
              </StyledTableRow>
              {data.map((row) => (
                <StyledTableRow>
                  <StyledTableCell>{row.brand}</StyledTableCell>
                  <StyledTableCell>{row.category}</StyledTableCell>
                  {row.months.map((month) => (
                    <StyledTableCell>
                      <Grid container>
                        <Grid item align="center" xs={3}>
                          <Button
                            component={Link}
                            to={{
                              pathname: "/qty",
                              state: {
                                qtydata: month.monthDetails.before.details,
                              },
                            }}
                            className={classes.qtycard}
                            style={{ backgroundColor: "#007BFF" }}
                          >
                            {month.monthDetails.before.qty}
                          </Button>
                        </Grid>
                        <Grid item align="center" xs={3}>
                          <Button
                            component={Link}
                            to={{
                              pathname: "/qty",
                              state: {
                                qtydata: month.monthDetails.onTime.details,
                              },
                            }}
                            className={classes.qtycard}
                            style={{ backgroundColor: "#00b803" }}
                          >
                            {month.monthDetails.onTime.qty}
                          </Button>
                        </Grid>
                        <Grid item align="center" xs={3}>
                          <Button
                            component={Link}
                            to={{
                              pathname: "/qty",
                              state: {
                                qtydata: month.monthDetails.oneWeek.details,
                              },
                            }}
                            className={classes.qtycard}
                            style={{ backgroundColor: "#ffc800" }}
                          >
                            {month.monthDetails.oneWeek.qty}
                          </Button>
                        </Grid>
                        <Grid item align="center" xs={3}>
                          <Button
                            component={Link}
                            to={{
                              pathname: "/qty",
                              state: {
                                qtydata:
                                  month.monthDetails.moreThanOneWeek.details,
                              },
                            }}
                            className={classes.qtycard}
                            style={{ backgroundColor: "#e60e0e" }}
                          >
                            {month.monthDetails.moreThanOneWeek.qty}
                          </Button>
                        </Grid>
                      </Grid>
                    </StyledTableCell>
                  ))}
                </StyledTableRow>
              ))}
            </Table>
          </div>
        </body>
      </div>
    );
  }
};

export default Summary;
