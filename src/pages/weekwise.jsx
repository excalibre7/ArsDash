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
  IconButton,
  Collapse,
  TablePagination,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, { Component, useState } from "react";
import TopBar from "../components/topbar";
import "../stylesheets/App.css";
import { ProgressBar } from "react-bootstrap";
import { Link, Redirect, Route } from "react-router-dom";
import QtyPage from "./qtypage";
import StopIcon from "@material-ui/icons/Stop";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import VisibilityIcon from "@material-ui/icons/Visibility";
import ProgressData from "../components/progressData";
import { useLocation } from "react-router-dom";
import BackFloating from "../components/backfloating";

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
  visibilityicon: {
    padding: theme.spacing(0, 0, 0, 0),
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

const WeekWise = (props) => {
  const { weekWiseLast, monthLast, brandOrVendor } = props;
  const [showLegend, setShowLegend] = useState(true);
  let classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const location = useLocation();
  var data = weekWiseLast;
  var month = monthLast;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  if (location.state != undefined) {
    data = location.state.data;
    month = location.state.month;
  }

  const handleBack = () => {
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={"/summary"} />;
  } else if (data.length == 0) {
    return (
      <div>
        <header>
          <TopBar page="summary" />
        </header>
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
          <TopBar weekWise={true} page="summary" />
        </header>
        <body>
          <Collapse in={showLegend}>
            <div style={{ paddingTop: 5 }}>
              <Grid container>
                <Grid item xs={2}>
                  <StopIcon style={{ color: "#017CFF", fontSize: "35px" }} />{" "}
                  Before Time
                </Grid>
                <Grid item xs={2}>
                  <StopIcon style={{ color: "#29A746", fontSize: "35px" }} /> On
                  Time
                </Grid>
                <Grid item xs={2}>
                  <StopIcon style={{ color: "#FFC108", fontSize: "35px" }} /> 1
                  Week Delay
                </Grid>
                <Grid item xs={3}>
                  <StopIcon style={{ color: "#DC3646", fontSize: "35px" }} />{" "}
                  More than 1 Week Delay
                </Grid>
                <Grid style={{ paddingRight: 15 }} align="right" item xs={3}>
                  <IconButton
                    onClick={() => setShowLegend(false)}
                    className={classes.visibilityicon}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </div>
          </Collapse>
          <div className="wrapper">
            <Table className="fixedtbl">
              <col width="110px" />
              <col width="120px" />
              <col width="192.5px" />
              <col width="192.5px" />
              <col width="192.5px" />
              <col width="192.5px" />
              <col width="192.5px" />
              <StyledTableRow style={{ backgroundColor: "#6495ED" }}>
                <StyledTableCell className={classes.superheader}>
                  <Typography className={classes.superheaderTxt}>
                    {brandOrVendor == "brand" ? "Brand" : "Vendor"}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell className={classes.superheader}>
                  <Typography className={classes.superheaderTxt}>
                    Category
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="center" className={classes.superheader}>
                  <Typography className={classes.superheaderTxt}>
                    Week 1
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="center" className={classes.superheader}>
                  <Typography className={classes.superheaderTxt}>
                    Week 2
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="center" className={classes.superheader}>
                  <Typography className={classes.superheaderTxt}>
                    Week 3
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="center" className={classes.superheader}>
                  <Typography className={classes.superheaderTxt}>
                    Week 4
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="center" className={classes.superheader}>
                  <Typography className={classes.superheaderTxt}>
                    <Grid container>
                      <Grid item xs={10}>
                        Week 5
                      </Grid>
                      <Grid item xs={2}>
                        {showLegend ? null : (
                          <IconButton
                            onClick={() => setShowLegend(true)}
                            className={classes.visibilityicon}
                          >
                            <VisibilityOffIcon />
                          </IconButton>
                        )}
                      </Grid>
                    </Grid>
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <StyledTableRow>
                    <StyledTableCell>{row[brandOrVendor]}</StyledTableCell>
                    <StyledTableCell>{row.category}</StyledTableCell>
                    {row.months[month].weeksParent.weeks.map((week, index) => (
                      <StyledTableCell TableCell>
                        <ProgressData
                          wom="week"
                          backTo={"/weekwise"}
                          det={week.weekDetails}
                        />
                      </StyledTableCell>
                    ))}
                  </StyledTableRow>
                ))}
            </Table>
            <TablePagination
              rowsPerPageOptions={[10, 20, 30]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </div>
        </body>
        <BackFloating handleClick={handleBack} />
      </div>
    );
  }
};

export default WeekWise;
