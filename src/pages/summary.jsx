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
  CircularProgress,
  TablePagination,
  Switch,
  Card,
  Radio,
  CardContent,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, { Component, useEffect, useState } from "react";
import TopBar from "../components/topbar";
import "../stylesheets/App.css";
import "../stylesheets/activeOrders.css";
import { Redirect } from "react-router-dom";
import { mdiFormatLetterCase, mdiDotsVertical } from '@mdi/js'
import Icon from '@mdi/react';
import { ResponsiveBar } from '@nivo/bar';

const useStyles = makeStyles((theme) => ({
  row: {},
  superheader: {},
  superheaderTxt: {
    color: "white",
  },
  dates: {
    border: "none",
  },
  spinner: {
    marginTop: theme.spacing(7),
  },
  qtycard: {
    color: "#ffffff",
    height: "2rem",
    width: 85,
    paddingTop: theme.spacing(0.9),
    backgroundColor: "#DC3646",
    cursor: "pointer",
    "&:hover": {
      color: "#ffffff",
      backgroundColor: "#74141d",
      textDecoration: "none",
    },
  },
  dropdown: {
    boxShadow: "2px 4px 8px 2px rgba(0,0,0,0.2)",
    TransitionEvent: "0.3s",
    borderColor: "transparent",
    marginLeft: 40,
    "&:hover": {
      boxShadow: "4px 8px 16px 4px rgba(0,0,0,0.2)",
    },
  },
  card: {
    boxShadow: "2px 4px 8px 2px rgba(0,0,0,0.2)",
    TransitionEvent: "0.3s",
    borderColor: "transparent",
    marginLeft: 40,

    "&:hover": {
      boxShadow: "4px 8px 16px 4px rgba(0,0,0,0.2)",
    },
  },
  visibilityicon: {
    padding: theme.spacing(0, 0, 0, 0),
  },
  percent: {
    fontSize: "10px",
  },
  switch: {
    marginLeft: theme.spacing(2),
  },
  switchCard: {
    padding: theme.spacing(2, 2, 2, 2),
  },
  cardcontent: {
    padding: theme.spacing(1, 1, 1, 1),
    "&:last-child": {
      paddingBottom: 0,
    },
  },
}));

const PurpleSwitch = withStyles({
  switchBase: {
    color: "#ff9e8f",
    "&$checked": {
      color: "#fc2403",
    },
    "&:not($checked)": {
      color: "#fc2403",
    },
    "&$checked + $track": {
      backgroundColor: "#fc2403",
    },
    "&$not(checked) + $track": {
      backgroundColor: "#fc2403",
    },
  },
  checked: {},
  track: {},
})(Switch);

const RadioSelector = withStyles({
  root: {
    color: "#fc2403",
    "&$checked": {
      color: "#fc2403",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

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
    padding: 0,
  },
}))(TableCell);

const Summary = (props) => {
  let classes = useStyles();
  const [selected, setSelected] = useState({
    dateRange: "",
    vendor: "",
    brand: "",
    subBrand: "",
    season: "",
  });
  const[fgCode, setFGCode] = useState("");

  function handleChange(event, key) {
    let tempObj = selected;
    tempObj[key] = event.target.value;
    setSelected({ ...tempObj });
  }

  function handleFGCodeChange(event) {
    setFGCode(event.target.value)
  }

  function handleCaseChange(event) {
    console.log("change case");
  }

  function handleMenuChange(event) {
    console.log("change menu");
  }

  return (
    <div>
      <header>
        <TopBar page="summary" />
      </header>
      <Grid container style={{ marginTop: 20 }}>
        <select
          value={
            selected.dateRange != "" ? selected.dateRange : "Select Date Range"
          }
          onChange={(e) => handleChange(e, "dateRange")}
          autoWidth
          className={classes.dropdown}
        >
          <option value="Orange">Orange</option>
          <option value="Radish">Radish</option>
          <option value="Cherry">Cherry</option>
        </select>
        <select
          value={selected.vendor != "" ? selected.vendor : "Select Date Range"}
          onChange={(e) => handleChange(e, "vendor")}
          autoWidth
          className={classes.dropdown}
        >
          <option value="Orange">Orange</option>
          <option value="Radish">Radish</option>
          <option value="Cherry">Cherry</option>
        </select>
        <select
          value={selected.brand != "" ? selected.brand : "Select Date Range"}
          onChange={(e) => handleChange(e, "brand")}
          autoWidth
          className={classes.dropdown}
        >
          <option value="Orange">Orange</option>
          <option value="Radish">Radish</option>
          <option value="Cherry">Cherry</option>
        </select>
        <select
          value={
            selected.subBrand != "" ? selected.subBrand : "Select Date Range"
          }
          onChange={(e) => handleChange(e, "subBrand")}
          autoWidth
          className={classes.dropdown}
        >
          <option value="Orange">Orange</option>
          <option value="Radish">Radish</option>
          <option value="Cherry">Cherry</option>
        </select>
        <select
          value={selected.season != "" ? selected.season : "Select Date Range"}
          onChange={(e) => handleChange(e, "season")}
          autoWidth
          className={classes.dropdown}
        >
          <option value="Orange">Orange</option>
          <option value="Radish">Radish</option>
          <option value="Cherry">Cherry</option>
        </select>
      </Grid>
      <Grid
        style={{
          alignItems: "center",
          marginTop: 20,
          alignContent: "space-between",
          justifyContent: "space-evenly",
        }}
        container
      >
        <div className={classes.card}>
          <p>Pending</p>
          <h4>
            <b>ValueP</b>
          </h4>
        </div>
        <div className={classes.card}>
          <p>Alteration</p>
          <h4>
            <b>ValueA</b>
          </h4>
        </div>
        <div className={classes.card}>
          <p>OK Pcs</p>
          <h4>
            <b>ValueOk</b>
          </h4>
        </div>
        <div className={classes.card}>
          <p>DHU%</p>
          <h4>
            <b>ValueDHU</b>
          </h4>
        </div>
        <div className={classes.card}>
          <p>Rejection</p>
          <h4>
            <b>rejection</b>
          </h4>
        </div>
        <div className={classes.card}>
          <p>Rejection %</p>
          <h4>
            <b>Rejection %</b>
          </h4>
        </div>
        <div className={classes.card}>
          <p>FG code</p>
          <div style={{display: "flex"}}>
          <input value={fgCode} onChange={handleFGCodeChange} style={{border: "none", boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.05)" }}/>
          <Icon path={mdiFormatLetterCase}
                        title="change case"
                        size={1}
                        //horizontal
                        //vertical
                        //rotate={90}
                        style={{alignSelf: 'center'}}
                        onClick={handleCaseChange}
                        color="black"
                    />
                    <Icon path={mdiDotsVertical}
                        title="change case"
                        size={1}
                        //horizontal
                        //vertical
                        //rotate={90}
                        style={{alignSelf: 'center'}}
                        onClick={handleMenuChange}
                        color="black"
                    />
          </div>
        </div>
      </Grid>
      <div style={{height: "100hv"}}>
      <ResponsiveBar
        data={[
          {
            "country": "AD",
            "hot dog": 134,
            "hot dogColor": "hsl(180, 70%, 50%)",
          },
          {
            "country": "AE",
            "hot dog": 136,
            "hot dogColor": "hsl(349, 70%, 50%)",
          },
          {
            "country": "AF",
            "hot dog": 102,
            "hot dogColor": "hsl(164, 70%, 50%)",
          },
          {
            "country": "AG",
            "hot dog": 118,
            "hot dogColor": "hsl(323, 70%, 50%)",
          },
          {
            "country": "AI",
            "hot dog": 196,
            "hot dogColor": "hsl(274, 70%, 50%)",
          },
          {
            "country": "AL",
            "hot dog": 197,
            "hot dogColor": "hsl(110, 70%, 50%)",
          },
          {
            "country": "AM",
            "hot dog": 71,
            "hot dogColor": "hsl(231, 70%, 50%)",
          }
        ]}
        keys={[ 'hot dog' ]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 1,
            tickRotation: -45,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendPosition: 'middle',
            legendOffset: -15
        }}
        labelSkipWidth={12}
        labelTextColor={{ theme: 'background' }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'top-left',
                direction: 'row',
                justify: false,
                translateX: -30,
                translateY: -41,
                itemsSpacing: 2,
                itemWidth: 95,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
    />
    </div>
      <Grid className={classes.spinner} container>
        <Grid align="center" xs={12}>
          {/* <ScaleLoader color={"#6495ed"} loading={true} size={150} /> */}
        </Grid>
        <Grid align="center" xs={12}>
          No records to show
        </Grid>
      </Grid>
    </div>
  );
};

export default Summary;
