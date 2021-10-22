import {
  Typography,
  makeStyles,
  Grid,
  Button,
  IconButton,
  Collapse,
  CircularProgress,
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
import { Redirect, Link } from "react-router-dom";
import { mdiFormatLetterCase, mdiDotsVertical } from '@mdi/js'
import Icon from '@mdi/react';
import { ResponsiveBar } from '@nivo/bar';
import { ResponsiveLine } from '@nivo/line';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ProgressBar } from "react-bootstrap";
import "../stylesheets/progressBar.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    marginTop: "20px",
    overflow: 'hidden'
},
  dropdown: {
    boxShadow: "1px 2px 2px 1px rgba(0,0,0,0.2)",
    TransitionEvent: "0.3s",
    borderColor: "transparent",
    marginLeft: 40,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    border: 0,
    "&:hover": {
      boxShadow: "2px 4px 4px 2px rgba(0,0,0,0.2)",
    },
    "&:focus" : {
      TransitionEvent: "0.3s",
    borderColor: "transparent",
    }
  },
  card: {
    boxShadow: "1px 2px 2px 1px rgba(0,0,0,0.2)",
    TransitionEvent: "0.3s",
    borderColor: "transparent",
    marginLeft: 10,
    marginTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5, 
    "&:hover": {
      boxShadow: "2px 4px 4px 2px rgba(0,0,0,0.2)",
    },
  },
  tableHeaderFont: {
    backgroundColor: "#f8bcd0",
    },
}));

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
      <Grid container style={{ marginTop: 10, justifyContent: 'space-evenly' }}>
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
      <Grid style={{alignItems: 'center'}} container>
      <Grid
        style={{
          marginTop: 10,
          justifyContent: "space-evenly",
          width: "50%"
        }}
        container
      >
        <div className={classes.card}>
          <p>Pending</p>
          <h5>
            <b>ValueP</b>
          </h5>
        </div>
        <div className={classes.card}>
          <p>Alteration</p>
          <h5>
            <b>ValueA</b>
          </h5>
        </div>
        <div className={classes.card}>
          <p>OK Pcs</p>
          <h5>
            <b>ValueOk</b>
          </h5>
        </div>
        <div className={classes.card}>
          <p>DHU%</p>
          <h5>
            <b>ValueDHU</b>
          </h5>
        </div>
        <div className={classes.card}>
          <p>Rejection</p>
          <h5>
            <b>rejection</b>
          </h5>
        </div>
        <div className={classes.card}>
          <p>Rejection %</p>
          <h5>
            <b>Rejection %</b>
          </h5>
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
        <div style={{height: 230 , width: "50%", alignContent:'center'}}>
      <ResponsiveBar
        data={[
          {
            "country": "AD",
            "hot dog": 134,
          },
          {
            "country": "AE",
            "hot dog": 136,
          },
          {
            "country": "AF",
            "hot dog": 102,
          },
          {
            "country": "AG",
            "hot dog": 118,
          },
          {
            "country": "AI",
            "hot dog": 196,
          },
          {
            "country": "AL",
            "hot dog": 197,
          },
          {
            "country": "AM",
            "hot dog": 71,
          }
        ]}
        keys={[ 'hot dog' ]}
        indexBy="country"
        margin={{ top: 50, right: 30, bottom: 40, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={["#25be31aa"]}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: "#25be31",
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: "#25be31",
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'hot dog'
                },
                id: 'dots'
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
        axisLeft={null}
        labelSkipWidth={12}
        labelTextColor={{ theme: 'background' }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'top-left',
                direction: 'row',
                justify: false,
                translateX: 20,
                translateY: -30,
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
        enableGridY={false}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
    />
    </div>
    </Grid>
     <Paper className={classes.paper}>
                         <TableContainer
                            sx={{ maxHeight: 490}}
                        >
                            <Table
                                aria-label="sticky table"
                                stickyHeader
                            >
                                <TableHead>
                                    <TableRow style={{height: 10}}>
                                        <TableCell style={{backgroundColor:"#f8bcd0", fontWeight: 'bold'}} className={classes.tableHeaderFont}>Vendor</TableCell>
                                        <TableCell align="right" style={{backgroundColor:"#f8bcd0", fontWeight: 'bold'}} className={classes.tableHeaderFont}>
                                            Total Lines
                                        </TableCell>
                                        <TableCell align="right" style={{backgroundColor:"#f8bcd0", fontWeight: 'bold'}} className={classes.tableHeaderFont}>
                                            Active Lines
                                        </TableCell>
                                        <TableCell align="right" style={{backgroundColor:"#f8bcd0", fontWeight: 'bold'}} className={classes.tableHeaderFont}>
                                            Order Qty
                                        </TableCell>
                                        <TableCell align="right" style={{backgroundColor:"#f8bcd0", fontWeight: 'bold'}} className={classes.tableHeaderFont}>
                                            Pending
                                        </TableCell>
                                        <TableCell align="right" style={{backgroundColor:"#f8bcd0", fontWeight: 'bold'}} className={classes.tableHeaderFont}>
                                            Pcs Stitched{"\n"}(cumulative)
                                        </TableCell>
                                        <TableCell align="right" style={{backgroundColor:"#f8bcd0", fontWeight: 'bold'}} className={classes.tableHeaderFont}>
                                            Pcs Produced{"\n"}(cumulative)
                                        </TableCell>
                                        <TableCell align="right" style={{backgroundColor:"#f8bcd0", fontWeight: 'bold'}} className={classes.tableHeaderFont}>
                                            Pcs Checked{"\n"}({selected === "today" ? "Today": null}
                                            {selected === "yesterday" ? "Yesterday": null}
                                            {selected === "lastSevenDays" ? "Last 7 Days": null}
                                            {selected === "lastThirtyDays" ? "Last 30 Days": null}
                                            {selected === "custom" ? "Custom": null})
                                        </TableCell>
                                        <TableCell align="right" style={{backgroundColor:"#f8bcd0", fontWeight: 'bold'}} className={classes.tableHeaderFont}>
                                            OK Pcs{"\n"}({selected === "today" ? "Today": null}
                                            {selected === "yesterday" ? "Yesterday": null}
                                            {selected === "lastSevenDays" ? "Last 7 Days": null}
                                            {selected === "lastThirtyDays" ? "Last 30 Days": null}
                                            {selected === "custom" ? "Custom": null})
                                        </TableCell>
                                        <TableCell align="right" style={{backgroundColor:"#f8bcd0", fontWeight: 'bold'}} className={classes.tableHeaderFont}>
                                            Rectified Pcs{"\n"}({selected === "today" ? "Today": null}
                                            {selected === "yesterday" ? "Yesterday": null}
                                            {selected === "lastSevenDays" ? "Last 7 Days": null}
                                            {selected === "lastThirtyDays" ? "Last 30 Days": null}
                                            {selected === "custom" ? "Custom": null})
                                        </TableCell>
                                        <TableCell align="right" style={{backgroundColor:"#f8bcd0", fontWeight: 'bold'}} className={classes.tableHeaderFont} >
                                            Pcs in Alter{"\n"}({selected === "today" ? "Today": null}
                                            {selected === "yesterday" ? "Yesterday": null}
                                            {selected === "lastSevenDays" ? "Last 7 Days": null}
                                            {selected === "lastThirtyDays" ? "Last 30 Days": null}
                                            {selected === "custom" ? "Custom": null})
                                        </TableCell>
                                        <TableCell align="right" style={{backgroundColor:"#f8bcd0", fontWeight: 'bold'}} className={classes.tableHeaderFont} >
                                            Rejected{"\n"}({selected === "today" ? "Today": null}
                                            {selected === "yesterday" ? "Yesterday": null}
                                            {selected === "lastSevenDays" ? "Last 7 Days": null}
                                            {selected === "lastThirtyDays" ? "Last 30 Days": null}
                                            {selected === "custom" ? "Custom": null})
                                        </TableCell>
                                        <TableCell align="right" style={{backgroundColor:"#f8bcd0", fontWeight: 'bold'}} className={classes.tableHeaderFont}>
                                            DHU%
                                        </TableCell>
                                        <TableCell align="right" style={{backgroundColor:"#f8bcd0", fontWeight: 'bold'}} className={classes.tableHeaderFont}>
                                            Yesterday DHU%
                                        </TableCell> 
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {true ? 
                                    [0,0,0,0,0,0,0,0,0,0,0].map((i) => (
                                              <TableRow>
                                                  <TableCell style={{padding: 5}}>
                                                      
                                                      {/* {Details.locationID != 0 ?  */}
                                                          <Link
                                                      onClick={()=> {console.log("link clicked")}}
                                                    style={{ textDecoration: 'none', color: 'white'}}
                                                        //   to={{
                                                        //       pathname:
                                                        //           "/report",
                                                        //       // search: '?query=abc',
                                                        //       state: {
                                                        //           companyID:Details.companyID,
                                                        //               time: state ? state.DateRange.vendorScreen : "today",
                                                        //               path: Details.companyName
                                                        //       },
                                                        //   }}
                                                      >
                                                          <div style={{backgroundColor: "#3f51b5", borderRadius: 5, padding: 10}}>
                                                          {'Details.locationName'}
                                                          </div>
                                                      </Link> 
                                                      {/* : 'Details.locationName'} */}
                                                  </TableCell>
                                                  <TableCell align="right" style={{flexDirection: 'row'}}>
                                                      <p> 'Details'</p>
                                                      <ProgressBar
                                                      className="custom-progress-bar1"
                                                          variant="custom"
                                                          now={20}
                                                      />
                                                  </TableCell>
                                                  <TableCell align="right">
                                                  <p> 'activeLines'</p>
                                                      <ProgressBar
                                                      className="custom-progress-bar2"
                                                          variant="custom"
                                                          now={20}
                                                      />
                                                  </TableCell>
                                                  <TableCell align="right">
                                                  <p> 'orderQty'</p>
                                                      <ProgressBar
                                                      className="custom-progress-bar3"
                                                          variant="custom"
                                                          now={20}
                                                      />
                                                  </TableCell>
                                                  <TableCell align="right">
                                                  <p> 'pendingPieces'</p>
                                                      <ProgressBar
                                                      className="custom-progress-bar4"
                                                          variant="custom"
                                                          now={20}
                                                      />
                                                  </TableCell>
                                                  <TableCell align="right">
                                                  <p> 'stitchedPieces'</p>
                                                      <ProgressBar
                                                      className="custom-progress-bar5"
                                                          variant="custom"
                                                          now={20}
                                                      />
                                                  </TableCell>
                                                  <TableCell align="right">
                                                  <p> 'producedPieces'</p>
                                                      <ProgressBar
                                                      className="custom-progress-bar6"
                                                          variant="custom"
                                                          now={20}
                                                      />
                                                  </TableCell>
                                                  <TableCell align="right">
                                                  <p> 'okPieces'</p>
                                                      <ProgressBar
                                                      className="custom-progress-bar7"
                                                          variant="custom"
                                                          now={20}
                                                      />{
                                                       // 'Details.locationDetails[0].okPieces'
                                                          // parseInt(Details.locationDetails[0].okPieces) +
                                                          // parseInt(Details.locationDetails[0].alteredPieces) +
                                                          // parseInt(Details.locationDetails[0].pcsInAlteration) +
                                                          // parseInt(Details.locationDetails[0].rejectedPieces)
                                                      }
                                                  </TableCell>
                                                  <TableCell align="right">
                                                  <p> 'okPieces'</p>
                                                      <ProgressBar
                                                      className="custom-progress-bar8"
                                                          variant="custom"
                                                          now={20}
                                                      />
                                                  </TableCell>
                                                  <TableCell align="right">
                                                  <p> 'alteredPieces'</p>
                                                      <ProgressBar
                                                      className="custom-progress-bar9"
                                                          variant="custom"
                                                          now={20}
                                                      />
                                                  </TableCell>
                                                  <TableCell align="right">
                                                  <p> 'pcsInAlteration'</p>
                                                      <ProgressBar
                                                      className="custom-progress-bar10"
                                                          variant="custom"
                                                          now={20}
                                                      />
                                                  </TableCell>
                                                  <TableCell align="right">
                                                  <p> 'rejectedPieces'</p>
                                                      <ProgressBar
                                                      className="custom-progress-bar11"
                                                          variant="custom"
                                                          now={20}
                                                      />
                                                  </TableCell>
                                                  <TableCell align="right">
                                                  <p> 'dhu'</p>
                                                      <ProgressBar
                                                      className="custom-progress-bar12"
                                                          variant="custom"
                                                          now={20}
                                                      />
                                                  </TableCell>
                                                  <TableCell align="right">
                                                  <p> 'y_dhu'</p>
                                                      <ProgressBar
                                                      className="custom-progress-bar13"
                                                          variant="custom"
                                                          now={20}
                                                      />
                                                  </TableCell> 
                                              </TableRow>
                                           ))
                                            : ""} 
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
      <Grid className={classes.spinner} container>
        <Grid align="center" xs={12}>
          {/* <ScaleLoader color={"#6495ed"} loading={true} size={150} /> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default Summary;
