import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { ProgressBar } from "react-bootstrap";
import { Typography, IconButton } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import RemoveIcon from "@material-ui/icons/Remove";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#6495ed",
    color: theme.palette.common.white,
    fontSize: "0.85rem",
  }, //default fontsize: 14
  body: {
    fontSize: "0.85rem",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(
  vendor,
  category,
  offered,
  produced,
  utilised,
  pending,
  reliability,
  responsiveness,
  performance,
  quality
) {
  return {
    vendor,
    category,
    offered,
    produced,
    utilised,
    pending,
    reliability,
    responsiveness,
    performance,
    quality,
  };
}

const rows = [
  createData("AV Expo Fab", "Shirts", 1000, 85, 870, 130, 95, 54, 15, 22),
  createData("AV Creations", "Trousers", 100, 75, 900, 180, 85, 45, 74, 45),
  createData("Sahu Exports", "Shirts", 800, 80, 747, 190, 65, 80, 75, 80),
  createData("PEmpro", "Shirts", 750, 70, 640, 125, 72, 60, 27, 82),
  createData("Delta Magnets", "Pants", 1200, 65, 900, 280, 85, 55, 80, 68),
];

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  percent: {
    fontWeight: "bold",
    fontSize: "0.8rem",
  },
  iconb: {
    padding: theme.spacing(0, 0, 0, 1),
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0)",
    },
  },
  filter: {
    color: "#ffffff",
    height: "3.5vh",
  },
}));

const getColor = (percent) => {
  if (percent > 30) {
    if (percent < 70) {
      return "warning";
    } else {
      return "success";
    }
  } else {
    return "danger";
  }
};

const commafy = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function MyTable(props) {
  const { data, setCurrentSort, currentSort } = props;
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="customized table">
        {/* <colgroup>
          <col width="10%" />
          <col width="10%" />
          <col width="5%" />
          <col width="5%" />
          <col width="5%" />
          <col width="10%" />
          <col width="13.75%" />
          <col width="13.75%" />
          <col width="13.75%" />
          <col width="13.75%" />
        </colgroup> */}
        <colgroup>
          <col width="16.875%" />
          <col width="14.875%" />
          <col width="11.875%" />
          <col width="14%" />
          <col width="11.875%" />
          <col width="12.875%" />
          <col width="26.625%" />
        </colgroup>
        <TableHead>
          <TableRow>
            <StyledTableCell>Vendor Name</StyledTableCell>
            <StyledTableCell>Primary Category</StyledTableCell>
            <StyledTableCell align="right">
              Monthly Capacity Offered
              {currentSort == "capo-a" ? (
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => setCurrentSort("capo-d")}
                >
                  <ArrowDownwardIcon className={classes.filter} />
                </IconButton>
              ) : currentSort == "capo-d" ? (
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => setCurrentSort("capo-a")}
                >
                  <ArrowUpwardIcon className={classes.filter} />
                </IconButton>
              ) : (
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => setCurrentSort("capo-a")}
                >
                  <RemoveIcon className={classes.filter} />
                </IconButton>
              )}
            </StyledTableCell>
            <StyledTableCell align="right">
              Pcs Produced
              {currentSort == "pcsproduced-a" ? (
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => setCurrentSort("pcsproduced-d")}
                >
                  <ArrowDownwardIcon className={classes.filter} />
                </IconButton>
              ) : currentSort == "pcsproduced-d" ? (
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => setCurrentSort("pcsproduced-a")}
                >
                  <ArrowUpwardIcon className={classes.filter} />
                </IconButton>
              ) : (
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => setCurrentSort("pcsproduced-a")}
                >
                  <RemoveIcon className={classes.filter} />
                </IconButton>
              )}
            </StyledTableCell>
            <StyledTableCell align="right">
              Monthly Capacity Utilised
              {currentSort == "capu-a" ? (
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => setCurrentSort("capu-d")}
                >
                  <ArrowDownwardIcon className={classes.filter} />
                </IconButton>
              ) : currentSort == "capu-d" ? (
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => setCurrentSort("capu-a")}
                >
                  <ArrowUpwardIcon className={classes.filter} />
                </IconButton>
              ) : (
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => setCurrentSort("capu-a")}
                >
                  <RemoveIcon className={classes.filter} />
                </IconButton>
              )}
            </StyledTableCell>
            <StyledTableCell align="right">
              Pcs Pending
              {currentSort == "pcspending-a" ? (
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => setCurrentSort("pcspending-d")}
                >
                  <ArrowDownwardIcon className={classes.filter} />
                </IconButton>
              ) : currentSort == "pcspending-d" ? (
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => setCurrentSort("pcspending-a")}
                >
                  <ArrowUpwardIcon className={classes.filter} />
                </IconButton>
              ) : (
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => setCurrentSort("pcspending-a")}
                >
                  <RemoveIcon className={classes.filter} />
                </IconButton>
              )}
            </StyledTableCell>
            {/*Bars*/}
            <StyledTableCell>
              On-time Performance
              {currentSort == "otp-a" ? (
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => setCurrentSort("otp-d")}
                >
                  <ArrowDownwardIcon className={classes.filter} />
                </IconButton>
              ) : currentSort == "otp-d" ? (
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => setCurrentSort("otp-a")}
                >
                  <ArrowUpwardIcon className={classes.filter} />
                </IconButton>
              ) : (
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => setCurrentSort("otp-a")}
                >
                  <RemoveIcon className={classes.filter} />
                </IconButton>
              )}
            </StyledTableCell>
            {/* <StyledTableCell>Vendor Responsiveness</StyledTableCell>
            <StyledTableCell>On Time Performance</StyledTableCell>
            <StyledTableCell>Quality</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow>
              <StyledTableCell>{row.VENDOR_NAME}</StyledTableCell>
              <StyledTableCell>{row.PRIMARY_CATEGORY}</StyledTableCell>
              <StyledTableCell align="right">
                {commafy(row.CAPACITY_OFFERED)}
              </StyledTableCell>
              <StyledTableCell align="right">
                {commafy(row.PCS_PRODUCED)}
              </StyledTableCell>
              <StyledTableCell align="right">
                {commafy(row.CAPACITY_UTILIZED)}
              </StyledTableCell>
              <StyledTableCell align="right">
                {commafy(row.PCS_PENDING)}
              </StyledTableCell>
              <StyledTableCell>
                <Typography className={classes.percent}>
                  {row.ON_TIME_PERFORMANCE + "%"}
                </Typography>
                <ProgressBar
                  variant={getColor(row.ON_TIME_PERFORMANCE)}
                  now={row.ON_TIME_PERFORMANCE}
                  // label={}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
