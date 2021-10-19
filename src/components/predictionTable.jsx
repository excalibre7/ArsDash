import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { ProgressBar } from "react-bootstrap";
import { Typography } from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#6495ed",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(vendor, onTime) {
  return {
    vendor,
    onTime,
  };
}

const rows = [createData("AV Expo Fab", 22), createData("AV Creations", 45)];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  percent: {
    fontWeight: "bold",
    fontSize: "0.8rem",
  },
});

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

export default function PredictionTable(props) {
  const { data } = props;
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
          <col width="50%" />
          <col width="50%" />
        </colgroup>
        <TableHead>
          <TableRow>
            <StyledTableCell>Vendor Name</StyledTableCell>
            <StyledTableCell>On Time Probability</StyledTableCell>
            {/* <StyledTableCell>Vendor Responsiveness</StyledTableCell>
            <StyledTableCell>On Time Performance</StyledTableCell>
            <StyledTableCell>Quality</StyledTableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow>
              <StyledTableCell>{row.name}</StyledTableCell>
              <StyledTableCell>
                <Typography className={classes.percent}>
                  {" "}
                  {row.data.onTimeTrue + "%"}
                </Typography>
                <ProgressBar
                  variant={getColor(row.data.onTimeTrue)}
                  now={row.data.onTimeTrue}
                  // label={}
                />
              </StyledTableCell>
              {/* <StyledTableCell>
                <ProgressBar
                  variant={getColor(row.responsiveness)}
                  now={row.responsiveness}
                  label={row.responsiveness + "%"}
                />
              </StyledTableCell>
              <StyledTableCell>
                <ProgressBar
                  variant={getColor(row.performance)}
                  now={row.performance}
                  label={row.performance + "%"}
                />
              </StyledTableCell>
              <StyledTableCell>
                <ProgressBar
                  variant={getColor(row.quality)}
                  now={row.quality}
                  label={row.quality + "%"}
                />
              </StyledTableCell> */}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
