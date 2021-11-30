import {
  Typography,
  makeStyles,
  Grid,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  OutlinedInput,
  MuiThemeProvider,
   createMuiTheme,
   Table,
   TableCell,
   TableRow,
   TableHead,
   TableContainer
} from "@material-ui/core";
import io from "socket.io-client";
import { withStyles } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import TopBar from "../components/topbar";
import "../stylesheets/App.css";
// import "../stylesheets/activeOrders.css";
import { Redirect, Link } from "react-router-dom";
import { mdiFormatLetterCase, mdiDotsVertical } from '@mdi/js'
import Icon from '@mdi/react';
import { ResponsiveBar } from '@nivo/bar';
import "../stylesheets/progressBar.css";
import CountUp from "react-countup";
import { fontWeight, margin } from "@mui/system";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker,KeyboardDatePicker, MuiPickersUtilsProvider  } from "@material-ui/pickers";
import Moment from 'moment';
import VendorTable from "../components/vendorTable.jsx";
import FactoryTable from "../components/factoryTable.jsx";
import CircularProgress from '@mui/material/CircularProgress';


const Summary = (props) => {
  let classes = useStyles();
  const [ state, setState ] = useState({ emailID: "", password: "" })
//	const [ chat, setChat ] = useState([])
const {chat} = props.data;
const {topCards} = props.data; 
  //const [ topCards, setTopCards ] = useState({})
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [startDate, setStartDate] = useState(Moment(new Date()).format('DD-MMM-yyyy'));
  const [endDate, setEndDate] = useState(Moment(new Date()).format('DD-MMM-yyyy'));
  const [selectedDate, setSelectedDate] = useState("today");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [vendorTableDetails, setVendorTableDetails] = useState({visible: true, data:[], inupt: {}}); // input will take the data for next screen API
  const [factoryTableDetails, setFactoryTableDetails] = useState({visible: false, data: [], input: {}});
  const [nextTableDetails, setNextTableDetails] = useState({currentTable : "vendor", nextTable: "", details: {}}); 

  useEffect(()=>{
    setLoading(true);
    //make useEffect or call a function here for each table data.
    switch(nextTableDetails.currentTable){
      case "vendor" : console.log("vendor!!!!!!", nextTableDetails.currentTable);setVendorTableDetails({...vendorTableDetails, visible:false}); break;
      case "factory" :console.log("factory!!!!!!", nextTableDetails.currentTable); setFactoryTableDetails({...factoryTableDetails, visible:false}); break;
      default: setVendorTableDetails({...vendorTableDetails, visible:false}); break;
    }
    switch(nextTableDetails.nextTable){
      case "vendor" : console.log("vendor next!!!!!!", nextTableDetails.currentTable);setVendorTableDetails({...vendorTableDetails, visible: true, input: nextTableDetails.details}); break;
      case "factory" :console.log("factory next!!!!!!", nextTableDetails.currentTable); setFactoryTableDetails({...factoryTableDetails, visible: true, input: nextTableDetails.details}); break;
      default: setVendorTableDetails({...vendorTableDetails, visible: true, input: nextTableDetails.details}); break;
    }
    setLoading(false);

  },[nextTableDetails.nextTable]);
  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  const StyledTableCell = withStyles((theme) => ({
    head: {
      color: theme.palette.common.white,
      fontSize: "0.75rem",
    },
    body: {
      fontSize: "0.75rem",
      padding: 0,
    },
  }))(TableCell);





  const socketRef = props.data.socketRef;
	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {
		const { emailID, password } = state
    console.log(emailID,password)
		socketRef.current.emit("login", { emailID, password })
		e.preventDefault()
		// setState({ message: "", name })
	}

	const renderChat = () => {
		return chat.map(({ name, message }, index) => (
			<div key={index}>
				<h3>
					{name}: <span>{message}</span>
				</h3>
			</div>
		))
	}

  const CustomTick = (tick: AxisTickProps<string>) => {

    return (
        <g transform={`translate(${tick.x},${tick.y + 22})`}>
            {/* <rect x={-14} y={-6} rx={3} ry={3} width={28} height={24} fill="rgba(0, 0, 0, .05)" />
            <rect x={-12} y={-12} rx={2} ry={2} width={24} height={24} fill="#25be3188" /> */}
            <line stroke="#0000" strokeWidth={1.5} y1={-22} y2={-12} />
            <text
                textAnchor="middle"
                dominantBaseline="middle"
                style={{
                    fontWeight:500,
                    font:"Work",
                    fill: '#25be31',
                    fontSize: 14,
                }}
            >
                {tick.value}
            </text>
        </g>
    )
}


const CustomTick2 = (tick: AxisTickProps<string>) => {

  return (
      <g transform={`translate(${tick.x},${tick.y + 22})`}>
          {/* <rect x={-14} y={-6} rx={3} ry={3} width={28} height={24} fill="rgba(0, 0, 0, .05)" />
          <rect x={-12} y={-12} rx={2} ry={2} width={24} height={24} fill="#25be3188" /> */}
          <line stroke="#0000" strokeWidth={1.5} y1={-22} y2={-12} />
          <text
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                  fontWeight:500,
                  font:"Work",
                  fill: '#0a6aff',
                  fontSize: 14,
              }}
          >
              {tick.value}
          </text>
      </g>
  )
}

const CustomTick3 = (tick: AxisTickProps<string>) => {

  return (
      <g transform={`translate(${tick.x},${tick.y + 22})`}>
          {/* <rect x={-14} y={-6} rx={3} ry={3} width={28} height={24} fill="rgba(0, 0, 0, .05)" />
          <rect x={-12} y={-12} rx={2} ry={2} width={24} height={24} fill="#25be3188" /> */}
          <line stroke="#0000" strokeWidth={1.5} y1={-22} y2={-12} />
          <text
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                  fontWeight:500,
                  font:"Work",
                  fill: '#ffce00',
                  fontSize: 14,
              }}
          >
              {tick.value}
          </text>
      </g>
  )
}

const CustomTick4 = (tick: AxisTickProps<string>) => {

  return (
      <g transform={`translate(${tick.x},${tick.y + 22})`}>
          {/* <rect x={-14} y={-6} rx={3} ry={3} width={28} height={24} fill="rgba(0, 0, 0, .05)" />
          <rect x={-12} y={-12} rx={2} ry={2} width={24} height={24} fill="#25be3188" /> */}
          <line stroke="#0000" strokeWidth={1.5} y1={-22} y2={-12} />
          <text
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                  fontWeight:500,
                  font:"Work",
                  fill: '#ed5269',
                  fontSize: 14,
              }}
          >
              {tick.value}
          </text>
      </g>
  )
}

const CustomTick5 = (tick: AxisTickProps<string>) => {

  return (
      <g transform={`translate(${tick.x},${tick.y + 22})`}>
          {/* <rect x={-14} y={-6} rx={3} ry={3} width={28} height={24} fill="rgba(0, 0, 0, .05)" />
          <rect x={-12} y={-12} rx={2} ry={2} width={24} height={24} fill="#25be3188" /> */}
          <line stroke="#0000" strokeWidth={1.5} y1={-22} y2={-12} />
          <text
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                  fontWeight:500,
                  font:"Work",
                  fill: '#ff9800',
                  fontSize: 14,
              }}
          >
              {tick.value}
          </text>
      </g>
  )
}

const handleTimeChange = (event) => {
  setSelectedDate(event.target.value);
};

if (loading)
return <CircularProgress color="inherit"/>
else
  return (
    <MuiThemeProvider theme={THEME}>
    <div className="sc5">
      <section class="one">
        <Grid className={classes.header}>
    <Select
                                style={{ width: 200,marginLeft: 10}}
                                value={selectedDate}
                                onChange={handleTimeChange}
                                name="country"
                                displayEmpty
                                autoWidth
                                className={classes.selectEmpty}
                            >
                                <MenuItem value="today">Today</MenuItem>
                                <MenuItem value="yesterday">Yesterday</MenuItem>
                                <MenuItem value="lastSevenDays">
                                    Last 7 Days
                                </MenuItem>
                                <MenuItem value="lastThirtyDays">
                                    Last 30 Days
                                </MenuItem>
                                <MenuItem value="custom">Custom</MenuItem>
                            </Select>
                            {selectedDate === "custom" &&
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
<KeyboardDatePicker
        autoOk
        variant="inline"
        inputVariant="outlined"
        label="Start Date"
        format="dd-MMM-yyyy"
        value={startDate}
        onChange={date => setStartDate(Moment(date).format('DD-MMM-yyyy'))}
        InputAdornmentProps={{ position: "start" }}
        maxDate={endDate}
      />
    </MuiPickersUtilsProvider>
}
{selectedDate === "custom" &&
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
<KeyboardDatePicker
        autoOk
        variant="inline"
        inputVariant="outlined"
        label="End Date"
        format="dd-MMM-yyyy"
        value={endDate}
        onChange={date => setEndDate(Moment(date).format('DD-MMM-yyyy'))}
        InputAdornmentProps={{ position: "start" }}
        minDate={startDate}
      />
    </MuiPickersUtilsProvider>
}
    <input placeholder="Search" style={{    border: "1px solid #00000044",
    borderRadius: "3px",
    padding:"8px 10px",
    verticalAlign: "middle",
    outline: "none",}}onChange={event => setSearchText(event.target.value)} />
        </Grid>
          <Grid container style={{marginTop: 80}}>
            <Grid item xs={4}>
            <Grid
              container
              justifyContent="center"
              spacing={2}
              // style={{ margin: 16 }}
            >
                    <Grid
                      item
                      xs={6}
                      align="center"
                      
                    >
                      <div className={classes.cardG}>
                        <Grid container>
                          <Grid item xs={8}>
                            <Typography className={classes.labelHeaderG}>
                              {"Pcs Produced"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={4}>
                            </Grid>
                            <Grid item xs={8}>
                            {topCards.NO_OF_PCS != null ? (
                                <CountUp
                                  start={0}
                                  end={topCards.NO_OF_PCS}
                                  duration={1}
                                  separator={","}
                                  className={classes.topRightG}
                                />
                              ) :    
                              <CountUp
                              start={0}
                              end={5000}
                              duration={1}
                              separator={","}
                              className={classes.topRightG}
                            />}
                            </Grid>
                        </Grid>
                          </div>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      align="center"
                      
                    >
                      <div className={classes.cardB}>
                      <Grid container>
                          <Grid item xs={8}>
                            <Typography className={classes.labelHeaderB}>
                              {"OK Pieces"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={4}>
                            </Grid>
                            <Grid item xs={8}>
                            {topCards.OK_PIECES != null ? (
                                <CountUp
                                  start={0}
                                  end={topCards.OK_PIECES}
                                  duration={1}
                                  separator={","}
                                  className={classes.topRightB}
                                />
                              ) :    
                              <CountUp
                              start={0}
                              end={5000}
                              duration={1}
                              separator={","}
                              className={classes.topRightB}
                            />}
                            </Grid>
                        </Grid>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      align="center"
                      
                    >
                      <div className={classes.cardY}>
                      <Grid container>
                          <Grid item xs={8}>
                            <Typography className={classes.labelHeaderY}>
                              {"Rectified Pcs"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={4}>
                            </Grid>
                            <Grid item xs={8}>
                            {topCards.ALTERED_PIECES != null ? (
                                <CountUp
                                  start={0}
                                  end={topCards.ALTERED_PIECES}
                                  duration={1}
                                  separator={","}
                                  className={classes.topRightY}
                                />
                              ) :    
                              <CountUp
                              start={0}
                              end={5000}
                              duration={1}
                              separator={","}
                              className={classes.topRightY}
                            />}
                            </Grid>
                        </Grid>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      align="center"
                      
                    >
                      <div className={classes.cardR}>
                      <Grid container>
                          <Grid item xs={8}>
                            <Typography className={classes.labelHeaderR}>
                              {"Rejected Pcs"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={4}>
                            </Grid>
                            <Grid item xs={8}>
                            {topCards.REJECTED_PIECES != null ? (
                                <CountUp
                                  start={0}
                                  end={topCards.REJECTED_PIECES}
                                  duration={1}
                                  separator={","}
                                  className={classes.topRightR}
                                />
                              ) :    
                              <CountUp
                              start={0}
                              end={5000}
                              duration={1}
                              separator={","}
                              className={classes.topRightR}
                            />}
                            </Grid>
                        </Grid>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      align="center"
                      
                    >
                      <div className={classes.cardR}>
                      <Grid container>
                          <Grid item xs={8}>
                            <Typography className={classes.labelHeaderR}>
                              {"Rejected %"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={4}>
                            </Grid>
                            <Grid item xs={8}>
                            {topCards.REJECTED_PIECES != null ? (
                                <CountUp
                                  start={0}
                                  end={topCards.REJECTED_PIECES*100/topCards.NO_OF_PCS}
                                  duration={1}
                                  separator={","}
                                  decimals={2}
                                  suffix={" %"}
                                  className={classes.topRightR}
                                />
                              ) :    
                              <CountUp
                              start={0}
                              end={0}
                              duration={1}
                              decimals={2}
                              suffix={" %"}
                              className={classes.topRightR}
                            />}
                            </Grid>
                        </Grid>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      align="center"
                      
                    >
                      <div className={classes.cardO}>
                      <Grid container>
                          <Grid item xs={8}>
                            <Typography className={classes.labelHeaderO}>
                              {"DHU %"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={4}>
                            </Grid>
                            <Grid item xs={8}>
                            {topCards.NO_OF_DEFECTS != null ? (
                                <CountUp
                                  start={0}
                                  end={topCards.NO_OF_DEFECTS*100/topCards.NO_OF_PCS}
                                  duration={1}
                                  separator={","}
                                  decimals={2}
                                  suffix={" %"}
                                  className={classes.topRightO}
                                />
                              ) :    
                              <CountUp
                              start={0}
                              end={0}
                              duration={1}
                              decimals={2}
                              suffix={" %"}
                              className={classes.topRightO}
                            />}
                            </Grid>
                        </Grid>
                      </div>
                    </Grid>

                  </Grid>
                </Grid>
        <div className={classes.graph}
              style={{backgroundColor:age==""?"#eefef1":age=="Ok"?"#edf3ff":age=="Alter"?"#fffce6":age=="Rejected"?"#fff0f5":age=="DHU"?"#ffedd9":age=="All"?"#edf3ff":"#fff"}}
                      >
        <FormControl variant="outlined" className={classes.formControl}>
       
          <Select
            value={age}
            onChange={handleChange}
            displayEmpty
            className={classes.dropdown}
            // input={
            //   <OutlinedInput
            //     labelWidth={40}
            //     name="age"
            //     id="outlined-age-simple"
            //   />
            // }
          >
            <MenuItem value="">
            Pcs Produced
            </MenuItem>
            <MenuItem value={"Ok"}>Ok Pcs</MenuItem>
            <MenuItem value={"Alter"}>Alter Pcs</MenuItem>
            <MenuItem value={"Rejected"}>Rejected Pcs</MenuItem>
            <MenuItem value={"All"}>All Pieces</MenuItem>
            <MenuItem value={"DHU"}>DHU%</MenuItem>
          </Select>
        </FormControl>
              {(age=="All")?
              <ResponsiveBar
              data={[
                {
                  "country": "Metro Clothing",
                  "Pcs Produced":14933,
                  "Ok Pieces": 13400,
                  "Altered Pieces":1533,
                  "Rejected Pieces":53,
                  "DHU%":4
                },
                {
                  "country": "Om Creations",
                  "Pcs Produced":13933,
                  "Ok Pieces": 12698,
                  "Altered Pieces":1235,
                  "Rejected Pieces":45,
                  "DHU%":3.8
                },
                {
                  "country": "CRI Indus",
                  "Pcs Produced":11960,
                  "Ok Pieces": 11508,
                  "Altered Pieces":452,
                  "DHU%":3.5,
                  "Rejected Pieces":33
                },
                {
                  "country": "RCR Exports",
                  "Pcs Produced":10651,
                  "Ok Pieces": 9866,
                  "Altered Pieces":785,
                  "DHU%":3.3,
                  "Rejected Pieces":27
                },
                {
                  "country": "Punit Creation",
                  "Pcs Produced":9100,
                  "Ok Pieces": 8745,
                  "Altered Pieces":355,
                  "DHU%":3,
                  "Rejected Pieces":24
                },
                {
                  "country": "Garland Apparels",
                  "Pcs Produced":8179,
                  "Ok Pieces": 7854,
                  "Altered Pieces":325,
                  "DHU%":2.9,
                  "Rejected Pieces":21
                },
                {
                  "country": "Girish Eports",
                  "Pcs Produced":5529,
                  "Ok Pieces": 5007,
                  "Altered Pieces":522,
                  "DHU%":2.7,
                  "Rejected Pieces":19
                }
              ]}
              keys={[ 'Ok Pieces',"Altered Pieces","Rejected Pieces" ]}
              indexBy="country"
              margin={{ top: 10, right: 30, bottom: 40, left: 0 }}
                  padding={0.6}
                       
              height={300}
              valueScale={{ type: 'linear' }}
              indexScale={{ type: 'band', round: true }}
              colors={["#6ea1ff","#ffe949","#ed5269"]}
              borderRadius={1}
              borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                  renderTick: CustomTick2,
              }}
              axisLeft={null}
              labelSkipWidth={12}
              labelSkipHeight={12}
              labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.8 ] ] }}
              legends={[
                  {
                      dataFrom: 'keys',
                      anchor: 'right',
                      direction: 'column',
                      justify: false,
                      translateX: 10,
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
              motionConfig="wobbly"
              ariaLabel="Nivo bar chart demo"
              barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
          />:(age=="Ok")?
        <ResponsiveBar
        data={[
          {
            "country": "Metro Clothing",
            "Pcs Produced":14933,
            "Ok Pieces": 13400,
            "Altered Pieces":1533,
            "Rejected Pieces":53,
            "DHU%":4
          },
          {
            "country": "Om Creations",
            "Pcs Produced":13933,
            "Ok Pieces": 12698,
            "Altered Pieces":1235,
            "Rejected Pieces":45,
            "DHU%":3.8
          },
          {
            "country": "CRI Indus",
            "Pcs Produced":11960,
            "Ok Pieces": 11508,
            "Altered Pieces":452,
            "DHU%":3.5,
            "Rejected Pieces":33
          },
          {
            "country": "RCR Exports",
            "Pcs Produced":10651,
            "Ok Pieces": 9866,
            "Altered Pieces":785,
            "DHU%":3.3,
            "Rejected Pieces":27
          },
          {
            "country": "Punit Creation",
            "Pcs Produced":9100,
            "Ok Pieces": 8745,
            "Altered Pieces":355,
            "DHU%":3,
            "Rejected Pieces":24
          },
          {
            "country": "Garland Apparels",
            "Pcs Produced":8179,
            "Ok Pieces": 7854,
            "Altered Pieces":325,
            "DHU%":2.9,
            "Rejected Pieces":21
          },
          {
            "country": "Girish Eports",
            "Pcs Produced":5529,
            "Ok Pieces": 5007,
            "Altered Pieces":522,
            "DHU%":2.7,
            "Rejected Pieces":19
          }
        ]}
          keys={[ 'Ok Pieces' ]}
          indexBy="country"
          margin={{ top: 10, right: 30, bottom: 40, left: 0 }}
              padding={0.6}
                       height={300}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={["#6ea1ff"]}
          borderRadius={3}
          borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
              renderTick: CustomTick2,
          }}
          axisLeft={null}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.8 ] ] }}
          legends={[
              {
                  dataFrom: 'keys',
                  anchor: 'top-right',
                  direction: 'row',
                  justify: false,
                  translateX: 10,
                  translateY: 10,
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
          motionConfig="wobbly"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
      />:(age=="Alter")?
          <ResponsiveBar
          data={[
            {
              "country": "Metro Clothing",
              "Pcs Produced":14933,
              "Ok Pieces": 13400,
              "Altered Pieces":1533,
              "Rejected Pieces":53,
              "DHU%":4
            },
            {
              "country": "Om Creations",
              "Pcs Produced":13933,
              "Ok Pieces": 12698,
              "Altered Pieces":1235,
              "Rejected Pieces":45,
              "DHU%":3.8
            },
            {
              "country": "CRI Indus",
              "Pcs Produced":11960,
              "Ok Pieces": 11508,
              "Altered Pieces":452,
              "DHU%":3.5,
              "Rejected Pieces":33
            },
            {
              "country": "RCR Exports",
              "Pcs Produced":10651,
              "Ok Pieces": 9866,
              "Altered Pieces":785,
              "DHU%":3.3,
              "Rejected Pieces":27
            },
            {
              "country": "Punit Creation",
              "Pcs Produced":9100,
              "Ok Pieces": 8745,
              "Altered Pieces":355,
              "DHU%":3,
              "Rejected Pieces":24
            },
            {
              "country": "Garland Apparels",
              "Pcs Produced":8179,
              "Ok Pieces": 7854,
              "Altered Pieces":325,
              "DHU%":2.9,
              "Rejected Pieces":21
            },
            {
              "country": "Girish Eports",
              "Pcs Produced":5529,
              "Ok Pieces": 5007,
              "Altered Pieces":522,
              "DHU%":2.7,
              "Rejected Pieces":19
            }
          ]}
          keys={[ 'Altered Pieces' ]}
          indexBy="country"
          margin={{ top: 10, right: 30, bottom: 40, left: 0 }}
              padding={0.6}
                       height={300}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={["#ffe949"]}
          borderRadius={3}
          borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
              renderTick: CustomTick3,
          }}
          axisLeft={null}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.8 ] ] }}
          legends={[
            {
                dataFrom: 'keys',
                anchor: 'top-right',
                direction: 'row',
                justify: false,
                translateX: 10,
                translateY: 10,
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
          motionConfig="wobbly"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
      />:(age=="")?
      <ResponsiveBar
          data={[
            {
              "country": "Metro Clothing",
              "Pcs Produced":14933,
              "Ok Pieces": 13400,
              "Altered Pieces":1533,
              "Rejected Pieces":53,
              "DHU%":4
            },
            {
              "country": "Om Creations",
              "Pcs Produced":13933,
              "Ok Pieces": 12698,
              "Altered Pieces":1235,
              "Rejected Pieces":45,
              "DHU%":3.8
            },
            {
              "country": "CRI Indus",
              "Pcs Produced":11960,
              "Ok Pieces": 11508,
              "Altered Pieces":452,
              "DHU%":3.5,
              "Rejected Pieces":33
            },
            {
              "country": "RCR Exports",
              "Pcs Produced":10651,
              "Ok Pieces": 9866,
              "Altered Pieces":785,
              "DHU%":3.3,
              "Rejected Pieces":27
            },
            {
              "country": "Punit Creation",
              "Pcs Produced":9100,
              "Ok Pieces": 8745,
              "Altered Pieces":355,
              "DHU%":3,
              "Rejected Pieces":24
            },
            {
              "country": "Garland Apparels",
              "Pcs Produced":8179,
              "Ok Pieces": 7854,
              "Altered Pieces":325,
              "DHU%":2.9,
              "Rejected Pieces":21
            },
            {
              "country": "Girish Eports",
              "Pcs Produced":5529,
              "Ok Pieces": 5007,
              "Altered Pieces":522,
              "DHU%":2.7,
              "Rejected Pieces":19
            }
          ]}
          keys={[ 'Pcs Produced' ]}
          indexBy="country"
          margin={{ top: 10, right: 30, bottom: 40, left: 0 }}
              padding={0.6}
                       height={300}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={["#25be31"]}
          borderRadius={3}
          borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
              renderTick: CustomTick,
          }}
          axisLeft={null}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.8 ] ] }}
          legends={[
            {
                dataFrom: 'keys',
                anchor: 'top-right',
                direction: 'row',
                justify: false,
                translateX: 10,
                translateY: 10,
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
          motionConfig="wobbly"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
      />:(age=="Rejected")?
      <ResponsiveBar
      data={[
        {
          "country": "Metro Clothing",
          "Pcs Produced":14933,
          "Ok Pieces": 13400,
          "Altered Pieces":1533,
          "Rejected Pieces":53,
          "DHU%":4
        },
        {
          "country": "Om Creations",
          "Pcs Produced":13933,
          "Ok Pieces": 12698,
          "Altered Pieces":1235,
          "Rejected Pieces":45,
          "DHU%":3.8
        },
        {
          "country": "CRI Indus",
          "Pcs Produced":11960,
          "Ok Pieces": 11508,
          "Altered Pieces":452,
          "DHU%":3.5,
          "Rejected Pieces":33
        },
        {
          "country": "RCR Exports",
          "Pcs Produced":10651,
          "Ok Pieces": 9866,
          "Altered Pieces":785,
          "DHU%":3.3,
          "Rejected Pieces":27
        },
        {
          "country": "Punit Creation",
          "Pcs Produced":9100,
          "Ok Pieces": 8745,
          "Altered Pieces":355,
          "DHU%":3,
          "Rejected Pieces":24
        },
        {
          "country": "Garland Apparels",
          "Pcs Produced":8179,
          "Ok Pieces": 7854,
          "Altered Pieces":325,
          "DHU%":2.9,
          "Rejected Pieces":21
        },
        {
          "country": "Girish Eports",
          "Pcs Produced":5529,
          "Ok Pieces": 5007,
          "Altered Pieces":522,
          "DHU%":2.7,
          "Rejected Pieces":19
        }
      ]}
      keys={[ 'Rejected Pieces' ]}
      indexBy="country"
      margin={{ top: 10, right: 30, bottom: 40, left: 0 }}
          padding={0.6}
                       height={300}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={["#ed5269"]}
      borderRadius={3}
      borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
          renderTick: CustomTick4,
      }}
      axisLeft={null}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.8 ] ] }}
      legends={[
        {
            dataFrom: 'keys',
            anchor: 'top-right',
            direction: 'row',
            justify: false,
            translateX: 10,
            translateY: 10,
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
      motionConfig="wobbly"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
  />: (age=="DHU")?
        <ResponsiveBar
        data={[
          {
            "country": "Metro Clothing",
            "Pcs Produced":14933,
            "Ok Pieces": 13400,
            "Altered Pieces":1533,
            "Rejected Pieces":53,
            "DHU%":4
          },
          {
            "country": "Om Creations",
            "Pcs Produced":13933,
            "Ok Pieces": 12698,
            "Altered Pieces":1235,
            "Rejected Pieces":45,
            "DHU%":3.8
          },
          {
            "country": "CRI Indus",
            "Pcs Produced":11960,
            "Ok Pieces": 11508,
            "Altered Pieces":452,
            "DHU%":3.5,
            "Rejected Pieces":33
          },
          {
            "country": "RCR Exports",
            "Pcs Produced":10651,
            "Ok Pieces": 9866,
            "Altered Pieces":785,
            "DHU%":3.3,
            "Rejected Pieces":27
          },
          {
            "country": "Punit Creation",
            "Pcs Produced":9100,
            "Ok Pieces": 8745,
            "Altered Pieces":355,
            "DHU%":3,
            "Rejected Pieces":24
          },
          {
            "country": "Garland Apparels",
            "Pcs Produced":8179,
            "Ok Pieces": 7854,
            "Altered Pieces":325,
            "DHU%":2.9,
            "Rejected Pieces":21
          },
          {
            "country": "Girish Eports",
            "Pcs Produced":5529,
            "Ok Pieces": 5007,
            "Altered Pieces":522,
            "DHU%":2.7,
            "Rejected Pieces":19
          }
        ]}
        keys={[ 'DHU%' ]}
        indexBy="country"
        margin={{ top: 10, right: 30, bottom: 40, left: 0 }}
            padding={0.6}
                      
        height={300}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={["#ff9800"]}
        borderRadius={3}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            renderTick: CustomTick5,
        }}
        axisLeft={null}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.8 ] ] }}
        legends={[
          {
              dataFrom: 'keys',
              anchor: 'top-right',
              direction: 'row',
              justify: false,
              translateX: 10,
              translateY: 10,
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
        motionConfig="wobbly"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
      />:null
      }
    </div>
    </Grid>
      </section>
      <section className="two">
      <div className="wrapper">
              <div className={classes.tableO}>
              {/* <div className="tableI sc5"> */}
              {vendorTableDetails.visible && <VendorTable data={vendorTableDetails.data} nextTableFunc={setNextTableDetails}/>}
              {factoryTableDetails.visible && <FactoryTable data={factoryTableDetails.data} nextTableFunc={setNextTableDetails} />}
              </div>
            </div>
      </section>

      <section className="two">
        <div className="card">
        <form onSubmit={onMessageSubmit}>
          <h1>Messenger</h1>
          <div className="name-field">
            <TextField name="emailID" onChange={(e) => onTextChange(e)} value={state.emailID} label="emailID" />
          </div>
          <div>
            <TextField
              name="password"
              onChange={(e) => onTextChange(e)}
              value={state.password}
              id="outlined-multiline-static"
              variant="outlined"
              label="password"
            />
          </div>
          <button>Send Message</button>
        </form>
        <div className="render-chat">
          <h1>Chat Log</h1>
          {renderChat()}
        </div>
      </div>
      </section>
    </div>
    </MuiThemeProvider>
  );
};

const THEME = createMuiTheme({
  typography: {
   fontFamily: "Work",
  //  "fontSize": 14,
  //  "fontWeightLight": 300,
  //  "fontWeightRegular": 400,
  //  "fontWeightMedium": 500
  }
});

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    marginTop: "20px",
    overflow: 'hidden'
},
formControl: {
  marginLeft:60,
  marginTop:10,
  alignContent:"center",
  justifyContent:"center",
  minWidth: 120,
},
dropdown:{
  border:"1px #6ea1ff"
},
cardG: {
  height: 110,
  width: "100%",
  backgroundColor: "#eefef1",
  boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  transition: "all .2s ease-in-out",
  borderRadius: 8,
  "&:hover": {
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "none",
    backgroundColor: "#eefef1",
    transform: "scale(1.1)"
  },
},
labelHeaderG: {
  fontSize: 22,
  fontFamily: "Work",
  margin: 2,
  marginLeft:10,
  padding: 2,
  color: "#49b667",
  fontWeight:800,
  textAlign:"left",
  letterSpacing:"-1px"
},
labelValG: {
  fontSize: 45,
  fontFamily: "Work",
  margin:5,
  color: "#49b667",
  fontWeight:800,
  textAlign:"right",
  letterSpacing:"-1px"
},
cardB: {
  height: 110,
  width: "100%",
  backgroundColor: "#edf3ff",
  boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  transition: "all .2s ease-in-out",
  borderRadius: 8,
  "&:hover": {
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "none",
    backgroundColor: "#edf3ff",
    transform: "scale(1.1)"
  },
},
labelHeaderB: {
  fontSize: 22,
  fontFamily: "Work",
  margin: 2,
  marginLeft:10,
  padding: 2,
  color: "#0a6aff",
  fontWeight:800,
  textAlign:"left",
  letterSpacing:"-1px"
},
cardY: {
  height: 110,
  width: "100%",
  backgroundColor: "#fffce6",
  boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  transition: "all .2s ease-in-out",
  borderRadius: 8,
  "&:hover": {
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "none",
    backgroundColor: "#fffce6",
    transform: "scale(1.1)"
  },
},
labelHeaderY: {
  fontSize: 20,
  fontFamily: "Work",
  margin: 2,
  marginLeft:10,
  padding: 2,
  color: "#ebc033",
  fontWeight:800,
  textAlign:"left",
  letterSpacing:"-1px"
},
cardR: {
  height: 110,
  width: "100%",
  backgroundColor: "#fff0f5",
  boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  transition: "all .2s ease-in-out",
  borderRadius: 8,
  "&:hover": {
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "none",
    backgroundColor: "#fff0f5",
    transform: "scale(1.1)"
  },
},
labelHeaderR: {
  fontSize: 23,
  fontFamily: "Work",
  margin: 2,
  marginLeft:10,
  padding: 2,
  color: "#ff0025",
  fontWeight:800,
  textAlign:"left",
  letterSpacing:"-1px"
},
cardO: {
  height: 110,
  width: "100%",
  backgroundColor: "#ffedd9",
  boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
  transition: "all .2s ease-in-out",
  borderRadius: 8,
  "&:hover": {
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "none",
    backgroundColor: "#ffedd9",
    transform: "scale(1.1)"
  },
},
labelHeaderO: {
  fontSize: 25,
  fontFamily: "Work",
  margin: 2,
  marginLeft:10,
  padding: 2,
  color: "#ff9800",
  fontWeight:800,
  textAlign:"left",
  letterSpacing:"-1px"
},
graph:{
  height: 365 ,
   width: "62%",
  alignContent:'center',
  borderRadius:10,
  marginLeft:25,
  fontWeight: "bold",
  // transition: "all .5s ease-in-out",
  // "&:hover": {
  //   fontWeight: "bold",
  //   cursor: "pointer",
  //   textDecoration: "none",
  //   transform: "scale(1.05)"
  // },
  boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
},
tableO:{
  alignContent:'center',
  borderRadius:10,
  height:"90vh",
  margin:15,
  backgroundColor:"#ffffffCC",
  overflow:"hidden",
  boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
},
tableI:{
  alignContent:'center',
  height:"90vh",
  overflowX:"scroll",
  "&::-webkit-scrollbar": {   
    width: "11px",
    height: "11px" },
  "&::-webkit-scrollbar-thumb": {   
    backgroundImage: "linear-gradient(45deg, #00aeffAA, #a68effAA)",
    borderRadius:"10px", },
  "&::-webkit-scrollbar-track": {   
      borderRadius:"10px",
      backgroundColor: "rgba(255, 255, 255, 0.1)" }
    
},
topRightG: {
  fontSize: 40,
  fontWeight: "bold",
  justifyContent:"flex-end",
  textAlign: "right",
  alignSelf: "flex-end",
  fontFamily: "Work",
  margin:5,
  color: "#49b667",
  fontWeight:800,
  textAlign:"right",
  letterSpacing:"-1px"
},
topRightB: {
  fontSize: 40,
  fontWeight: "bold",
  justifyContent:"flex-end",
  textAlign: "right",
  alignSelf: "flex-end",
  fontFamily: "Work",
  margin:5,
  color: "#0a6aff",
  fontWeight:800,
  textAlign:"right",
  letterSpacing:"-1px"
},
topRightY: {
  fontSize: 40,
  fontWeight: "bold",
  justifyContent:"flex-end",
  textAlign: "right",
  alignSelf: "flex-end",
  fontFamily: "Work",
  margin:5,
  color: "#ebc033",
  fontWeight:800,
  textAlign:"right",
  letterSpacing:"-1px"
},
topRightR: {
  fontSize: 40,
  fontWeight: "bold",
  justifyContent:"flex-end",
  textAlign: "right",
  alignSelf: "flex-end",
  fontFamily: "Work",
  margin:5,
  color: "#ff0025",
  fontWeight:800,
  textAlign:"right",
  letterSpacing:"-1px"
},
topRightO: {
  fontSize: 40,
  fontWeight: "bold",
  justifyContent:"flex-end",
  textAlign: "right",
  alignSelf: "flex-end",
  fontFamily: "Work",
  margin:5,
  color: "#ff9800",
  fontWeight:800,
  textAlign:"right",
  letterSpacing:"-1px"
},
  wrapper: {
   width:"100%",
  },
  tableHeaderFont: {
    backgroundColor: "#f8bcd0",
    },
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    superheader: {},
    superheaderTxt: {
      color: "#000000AA",
      fontFamily:"Work",
      fontWeight:"800"
    },
    dates: {
      border: "none",
    },
    header: {
      height:"10vh",
      width:"100%", 
      position: 'fixed ',
      top: 0, right: 0,
      zIndex:200,
      paddingTop: 10, 
      backgroundColor: 'white',
      display: "flex",
      alignContent: "space-between",
      alignItems: "center",
      justifyContent: "space-evenly",

    }
}));
export default Summary;
