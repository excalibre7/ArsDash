import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {
  Grid,
  IconButton,
  Paper,
  TableCell,
  TablePagination,
  Typography,
} from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import "../stylesheets/App.css";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import RemoveIcon from "@material-ui/icons/Remove";

const useRowStyles = makeStyles((theme) => ({
  rowStyle: {
    backgroundColor: "#6495ed",
  },
  rowCellH: {
    color: "#ffffff",
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
  status: {
    color: "#ffffff",
    height: "2rem",
    paddingTop: theme.spacing(1),
  },
  vendortitle: {
    paddingLeft: theme.spacing(10),
  },
  orderid: {
    paddingLeft: theme.spacing(4),
  },
  confidence: {
    color: "#000000",
    paddingTop: theme.spacing(0.9),
    fontSize: "0.75rem",
  },
}));

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

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

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
  }
};

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <StyledTableRow
      // style={{ backgroundColor: getBgColor(row.PREDICT_ON_TIME, "MAIN") }}
      >
        <StyledTableCell className={classes.orderid}>
          {row.ORDER_ID}
        </StyledTableCell>
        <StyledTableCell>{row.VENDOR}</StyledTableCell>
        <StyledTableCell>{row.BRAND}</StyledTableCell>
        <StyledTableCell>{row.ORDER_DATE}</StyledTableCell>
        <StyledTableCell>{row.QTY}</StyledTableCell>
        <StyledTableCell>{row.GRN_COMMIT_DATE}</StyledTableCell>
        <StyledTableCell align="center">
          <Paper
            className={classes.status}
            style={{ backgroundColor: getBgColor(row.PREDICT_ON_TIME, "MAIN") }}
          >
            {row.PREDICT_ON_TIME == 0 ? "Delayed" : "On Time"}
            <Typography className={classes.confidence}>
              {row.PREDICT_CONFIDENCE}
            </Typography>
          </Paper>
        </StyledTableCell>
        <StyledTableCell align="center">
          {row.LATEST_ACTIVITY_NAME}
        </StyledTableCell>
        <StyledTableCell>{row.PREDICT_DATE}</StyledTableCell>
        <StyledTableCell align="center">
          <Paper
            className={classes.status}
            style={{
              backgroundColor: getBgColor(row.PREDICT_FINAL_INSPECTION, "MAIN"),
            }}
          >
            {row.PREDICT_FINAL_INSPECTION == 0 ? "Fail" : "Pass"}
            <Typography className={classes.confidence}>
              {row.PREDICT_CONFIDENCE_FINAL_INSP}
            </Typography>
          </Paper>
        </StyledTableCell>
      </StyledTableRow>
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

export default function OrderPredTable(props) {
  const classes = useRowStyles();
  const { rows, currentSort, setCurrentSort } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(50);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer>
      <Table aria-label="customized table">
        <colgroup>
          <col width="9%" />
          <col width="14%" />
          <col width="10%" />
          <col width="8%" />
          <col width="7%" />
          <col width="8%" />
          <col width="9%" />
          <col width="11%" />
          <col width="10%" />
          <col width="10%" />
        </colgroup>

        <TableHead>
          <TableRow>
            <StyledTableCell className={` ${classes.rowCellH}`}>
              Order No
              {currentSort == "no-a" ? (
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => setCurrentSort("no-d")}
                >
                  <ArrowDownwardIcon className={classes.filter} />
                </IconButton>
              ) : currentSort == "no-d" ? (
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => setCurrentSort("no-a")}
                >
                  <ArrowUpwardIcon className={classes.filter} />
                </IconButton>
              ) : (
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => setCurrentSort("no-a")}
                >
                  <RemoveIcon className={classes.filter} />
                </IconButton>
              )}
            </StyledTableCell>
            <StyledTableCell align="left" className={`${classes.rowCellH}`}>
              Vendor
            </StyledTableCell>
            <StyledTableCell className={` ${classes.rowCellH}`}>
              Brand
            </StyledTableCell>
            <StyledTableCell className={classes.rowCellH}>
              Order
              {currentSort == "ord-a" ? (
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => setCurrentSort("ord-d")}
                >
                  <ArrowDownwardIcon className={classes.filter} />
                </IconButton>
              ) : currentSort == "ord-d" ? (
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => setCurrentSort("ord-a")}
                >
                  <ArrowUpwardIcon className={classes.filter} />
                </IconButton>
              ) : (
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => setCurrentSort("ord-a")}
                >
                  <RemoveIcon className={classes.filter} />
                </IconButton>
              )}
            </StyledTableCell>
            <StyledTableCell className={` ${classes.rowCellH}`}>
              Qty
              {currentSort == "qty-a" ? (
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => setCurrentSort("qty-d")}
                >
                  <ArrowDownwardIcon className={classes.filter} />
                </IconButton>
              ) : currentSort == "qty-d" ? (
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => setCurrentSort("qty-a")}
                >
                  <ArrowUpwardIcon className={classes.filter} />
                </IconButton>
              ) : (
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => setCurrentSort("qty-a")}
                >
                  <RemoveIcon className={classes.filter} />
                </IconButton>
              )}
            </StyledTableCell>
            <StyledTableCell className={classes.rowCellH}>
              Delivery
              {currentSort == "del-a" ? (
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => setCurrentSort("del-d")}
                >
                  <ArrowDownwardIcon className={classes.filter} />
                </IconButton>
              ) : currentSort == "del-d" ? (
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => setCurrentSort("del-a")}
                >
                  <ArrowUpwardIcon className={classes.filter} />
                </IconButton>
              ) : (
                <IconButton
                  className={classes.iconb}
                  disableRipple={true}
                  onClick={() => setCurrentSort("del-a")}
                >
                  <RemoveIcon className={classes.filter} />
                </IconButton>
              )}
            </StyledTableCell>
            <StyledTableCell align="center" className={` ${classes.rowCellH}`}>
              Status
            </StyledTableCell>
            <StyledTableCell className={` ${classes.rowCellH}`}>
              Current Stage
              {currentSort == "cs-a" ? (
                <IconButton
                  className={classes.iconstage}
                  disableRipple={true}
                  onClick={() => setCurrentSort("cs-d")}
                >
                  <ArrowDownwardIcon className={classes.filter} />
                </IconButton>
              ) : currentSort == "cs-d" ? (
                <IconButton
                  className={classes.iconstage}
                  disableRipple={true}
                  onClick={() => setCurrentSort("cs-a")}
                >
                  <ArrowUpwardIcon className={classes.filter} />
                </IconButton>
              ) : (
                <IconButton
                  className={classes.iconstage}
                  disableRipple={true}
                  onClick={() => setCurrentSort("cs-a")}
                >
                  <RemoveIcon className={classes.filter} />
                </IconButton>
              )}
            </StyledTableCell>
            <StyledTableCell className={classes.rowCellH}>
              Predicted Delivery
            </StyledTableCell>
            <StyledTableCell className={classes.rowCellH}>
              Final Inspec.
              {currentSort == "fi-a" ? (
                <IconButton
                  className={classes.iconstage}
                  disableRipple={true}
                  onClick={() => setCurrentSort("fi-d")}
                >
                  <ArrowDownwardIcon className={classes.filter} />
                </IconButton>
              ) : currentSort == "fi-d" ? (
                <IconButton
                  className={classes.iconstage}
                  disableRipple={true}
                  onClick={() => setCurrentSort("fi-a")}
                >
                  <ArrowUpwardIcon className={classes.filter} />
                </IconButton>
              ) : (
                <IconButton
                  className={classes.iconstage}
                  disableRipple={true}
                  onClick={() => setCurrentSort("fi-a")}
                >
                  <RemoveIcon className={classes.filter} />
                </IconButton>
              )}
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => (
              <Row key={row.name} row={row} />
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
