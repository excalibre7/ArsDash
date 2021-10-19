import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Card, CardContent, Grid } from "@material-ui/core";
import { Pie } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

const useRowStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  card: {
    minHeight: "30vh",
  },
  content: {
    padding: theme.spacing(0, 0, 0, 0),
  },
  title: {
    paddingTop: theme.spacing(1),
    "&:hover": {
      fontWeight: "bold",
      cursor: "pointer",
    },
  },
}));

function Row(props) {
  const { row, index, categories, brands } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  const borderWidth = 1.5;

  const getDelayData = () => {
    var labels = [];
    var qtys = [];
    var bg = [];

    var row_ = row.DELAY.sort(function (a, b) {
      var textA = a.LABEL.toUpperCase();
      var textB = b.LABEL.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    row_.forEach((element) => {
      labels.push(element.LABEL);
      qtys.push(element.QTY);
      {
        element.LABEL == "DELAYED" ? bg.push("#e60e0e") : bg.push("#00b803");
      }
    });

    return {
      labels: labels,
      datasets: [
        {
          label: "Delay",
          data: qtys,
          backgroundColor: bg,
          borderWidth: borderWidth,
        },
      ],
    };
  };

  const getTypeData = () => {
    var labels = [];
    var qtys = [];
    var bg = [];

    var row_ = row.CATEGORY.sort(function (a, b) {
      var textA = a.LABEL.toUpperCase();
      var textB = b.LABEL.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    row_.forEach((element) => {
      // if (element.LABEL.length < 9) {
      //   labels.push(element.LABEL);
      // } else {
      //   labels.push(element.LABEL.substring(0, 8) + "...");
      // }
      labels.push(element.LABEL);
      qtys.push(element.QTY);
      {
        bg.push(categories[element.LABEL.toLowerCase()]);
      }
    });

    return {
      labels: labels,
      datasets: [
        {
          label: "Type",
          data: qtys,
          backgroundColor: bg,
          borderWidth: borderWidth,
        },
      ],
    };
  };

  const getInspectionData = () => {
    var labels = [];
    var qtys = [];
    var bg = [];

    var row_ = row.FINAL_INSPECTION.sort(function (a, b) {
      var textA = a.LABEL.toUpperCase();
      var textB = b.LABEL.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    row_.forEach((element) => {
      labels.push(element.LABEL);
      qtys.push(element.QTY);
      {
        element.LABEL == "Passed" ? bg.push("#00b803") : bg.push("#e60e0e");
      }
    });

    return {
      labels: labels,
      datasets: [
        {
          label: "Inspection",
          data: qtys,
          backgroundColor: bg,
          borderWidth: borderWidth,
        },
      ],
    };
  };

  const getBrandData = () => {
    var labels = [];
    var qtys = [];
    var bg = [];

    var row_ = row.BRAND.sort(function (a, b) {
      var textA = a.LABEL.toUpperCase();
      var textB = b.LABEL.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });

    row_.forEach((element) => {
      labels.push(element.LABEL);
      qtys.push(element.QTY);
      {
        bg.push(brands[element.LABEL.toLowerCase()]);
      }
    });

    return {
      labels: labels,
      datasets: [
        {
          label: "Brands",
          data: qtys,
          backgroundColor: bg,
          borderWidth: borderWidth,
        },
      ],
    };
  };

  return (
    <React.Fragment>
      <TableRow
        style={index % 2 ? { background: "#fff" } : { background: "#F5F5F5" }}
        className={classes.root}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {row.VENDOR}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Grid container spacing={1}>
                <Grid item xs={3}>
                  <Card className={classes.card}>
                    <CardContent className={classes.content}>
                      <Grid container>
                        <Grid align="center" xs={12}>
                          <Typography className={classes.title}>
                            DELAY
                          </Typography>
                        </Grid>
                        <Grid xs={12}>
                          <Pie
                            data={getDelayData()}
                            options={{
                              plugins: {
                                datalabels: {
                                  display: false,
                                  color: "black",
                                },
                              },
                            }}
                            legend={{
                              position: "right",
                              display: false,
                            }}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={3}>
                  <Card className={classes.card}>
                    <CardContent className={classes.content}>
                      <Grid container>
                        <Grid align="center" xs={12}>
                          <Typography className={classes.title}>
                            INSPECTION
                          </Typography>
                        </Grid>
                        <Grid xs={12}>
                          <Pie
                            data={getInspectionData()}
                            options={{
                              plugins: {
                                datalabels: {
                                  display: false,
                                  color: "black",
                                },
                              },
                            }}
                            legend={{
                              position: "right",
                              display: false,
                            }}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={3}>
                  <Card className={classes.card}>
                    <CardContent className={classes.content}>
                      <Grid container>
                        <Grid align="center" xs={12}>
                          <Typography className={classes.title}>
                            TYPE
                          </Typography>
                        </Grid>
                        <Grid xs={12}>
                          <Pie
                            data={getTypeData()}
                            options={{
                              plugins: {
                                datalabels: {
                                  display: false,
                                  color: "black",
                                },
                              },
                            }}
                            legend={{
                              position: "right",
                              display: false,
                            }}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={3}>
                  <Card className={classes.card}>
                    <CardContent className={classes.content}>
                      <Grid container>
                        <Grid align="center" xs={12}>
                          <Typography className={classes.title}>
                            BRANDS
                          </Typography>
                        </Grid>
                        <Grid xs={12}>
                          <Pie
                            data={getBrandData()}
                            options={{
                              plugins: {
                                datalabels: {
                                  display: false,
                                  color: "black",
                                },
                              },
                            }}
                            legend={{
                              position: "right",
                              display: false,
                            }}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
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

export default function AnalysisTable(props) {
  const { data, categories, brands } = props;
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableBody>
          {data.map((row, index) => (
            <Row
              key={row.name}
              index={index}
              row={row}
              categories={categories}
              brands={brands}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
