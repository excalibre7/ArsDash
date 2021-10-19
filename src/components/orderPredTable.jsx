import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Grid, TableCell } from "@material-ui/core";
import MyTimeline from "./mytimeline";
import { EditLocationTwoTone } from "@material-ui/icons";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
      bacgroundColor: "#6495ed",
    },
  },
  rowStyle: {
    backgroundColor: "#6495ed",
  },
  rowCellH: {
    color: "#ffffff",
  },
});

function createData(
  ORDER_NO,
  VENDOR,
  BRAND,
  QTY,
  STATUS,
  ORDER_DATE,
  FAB_IN_DELAY,
  FAB_IN_COMMIT,
  FAB_IN_PREDICT,
  FAB_IN_STATUS,
  PCD_DELAY,
  PCD_COMMIT,
  PCD_PREDICT,
  PCD_STATUS,
  GPD_DELAY,
  GPD_COMMIT,
  GPD_PREDICT,
  GPD_STATUS,
  GRN_DELAY,
  GRN_COMMIT,
  GRN_PREDICT,
  GRN_STATUS
) {
  return {
    ORDER_NO,
    VENDOR,
    BRAND,
    QTY,
    STATUS,
    ORDER_DATE,
    FAB_IN_DELAY,
    FAB_IN_COMMIT,
    FAB_IN_PREDICT,
    FAB_IN_STATUS,
    PCD_DELAY,
    PCD_COMMIT,
    PCD_PREDICT,
    PCD_STATUS,
    GPD_DELAY,
    GPD_COMMIT,
    GPD_PREDICT,
    GPD_STATUS,
    GRN_DELAY,
    GRN_COMMIT,
    GRN_PREDICT,
    GRN_STATUS,
  };
}

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#6495ed",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const getBgColor = (status, code) => {
  if (code == "MAIN") {
    if (status == "On Time") {
      return "#77b897"; //COLOR77b897
    } else if (status == "Delayed") {
      return "#e2634e"; //COLOR
    }
  } else if (code == "TIMELINE") {
    if (status == "On Time") {
      return "#8ccfa1"; //COLOR
    } else if (status == "Delayed") {
      return "#ed9d90"; //COLORed9d90
    }
  }
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow style={{ backgroundColor: getBgColor(row.STATUS, "MAIN") }}>
        <StyledTableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        <StyledTableCell>{row.ORDER_NO}</StyledTableCell>
        <StyledTableCell>{row.VENDOR}</StyledTableCell>
        <StyledTableCell>{row.BRAND}</StyledTableCell>
        <StyledTableCell align="left">{row.QTY}</StyledTableCell>
        <StyledTableCell align="center">{row.STATUS}</StyledTableCell>
        <StyledTableCell>Placeholder</StyledTableCell>
      </TableRow>
      <TableRow style={{ backgroundColor: getBgColor(row.STATUS, "TIMELINE") }}>
        <StyledTableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box marginTop={5} justifyContent="center">
              <MyTimeline row={row} />
            </Box>
          </Collapse>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData(
    "USPA112",
    "AV Expo Fab",
    "USPA",
    600,
    "On Time",
    "12-Jan-2021",
    12,
    "18-Jan-2021",
    "30-Jan-2021",
    "C",
    10,
    "30-Jan-2021",
    "10-Feb-2021",
    "P",
    -12,
    "12-Feb-2021",
    "4-March-2021",
    "P",
    2,
    "14-Feb-2021",
    "6-March-2021",
    "P"
  ),
  createData(
    "USPA113",
    "AV Expo Fab",
    "USPA",
    1200,
    "On Time",
    "12-Jan-2021",
    12,
    "18-Jan-2021",
    "30-Jan-2021",
    "C",
    10,
    "30-Jan-2021",
    "10-Feb-2021",
    "P",
    -12,
    "12-Feb-2021",
    "4-March-2021",
    "P",
    2,
    "14-Feb-2021",
    "6-March-2021",
    "P"
  ),
  createData(
    "ARR122",
    "Delta Magnets",
    "Arrow",
    500,
    "Delayed",
    "12-Jan-2021",
    12,
    "18-Jan-2021",
    "30-Jan-2021",
    "C",
    10,
    "30-Jan-2021",
    "10-Feb-2021",
    "P",
    -12,
    "12-Feb-2021",
    "4-March-2021",
    "P",
    2,
    "14-Feb-2021",
    "6-March-2021",
    "P"
  ),
  createData(
    "ARR167",
    "AV Expo Fab",
    "Arrow",
    1000,
    "On Time",
    "12-Jan-2021",
    12,
    "18-Jan-2021",
    "30-Jan-2021",
    "C",
    10,
    "30-Jan-2021",
    "10-Feb-2021",
    "P",
    -12,
    "12-Feb-2021",
    "4-March-2021",
    "P",
    2,
    "14-Feb-2021",
    "6-March-2021",
    "P"
  ),
  createData(
    "ARR778",
    "Delta Magnets",
    "Arrow",
    1500,
    "Delayed",
    "12-Jan-2021",
    12,
    "18-Jan-2021",
    "30-Jan-2021",
    "C",
    10,
    "30-Jan-2021",
    "10-Feb-2021",
    "P",
    -12,
    "12-Feb-2021",
    "4-March-2021",
    "P",
    2,
    "14-Feb-2021",
    "6-March-2021",
    "P"
  ),
];

export default function OrderPredTable() {
  const classes = useRowStyles();
  <colgroup>
    <col width="5%" />
    <col width="19%" />
    <col width="19%" />
    <col width="19%" />
    <col width="4%" />
    <col width="18%" />
    <col width="16%" />
  </colgroup>;
  return (
    <TableContainer>
      <Table aria-label="collapsible table">
        <TableHead className={`${classes.root} ${classes.rowStyle}`}>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell className={` ${classes.rowCellH}`}>
              Order No
            </StyledTableCell>
            <StyledTableCell className={` ${classes.rowCellH}`}>
              Vendor
            </StyledTableCell>
            <StyledTableCell className={` ${classes.rowCellH}`}>
              Brand
            </StyledTableCell>
            <StyledTableCell align="left" className={` ${classes.rowCellH}`}>
              Qty
            </StyledTableCell>
            <StyledTableCell className={` ${classes.rowCellH}`} align="center">
              Status
            </StyledTableCell>
            <StyledTableCell className={` ${classes.rowCellH}`} align="center">
              Status
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
