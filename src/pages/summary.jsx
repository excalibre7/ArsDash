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
import VendorGraph from "../components/vendorGraph";


const Summary = (props) => {
  let classes = useStyles();
  const [ state, setState ] = useState({ emailID: "", password: "" });
const {chat} = props.data;
const [ topCards, setTopCards ] = useState({
  "ORDER_QTY": 0,
  "PENDING_PIECES": 0,
  "STITCHED_PIECES": 0,
  "PRODUCED_PIECES": 0,
  "OK_PIECES": 0,
  "TOT_PCS": 0,
  "ALTERED_PIECES": 0,
  "PCS_IN_ALTERATION": 0,
  "REJECTED_PIECES": 0,
  "NO_OF_DEFECTS": 0,
  "NO_OF_PCS": 0
})

  //const [ topCards, setTopCards ] = useState({})
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [startDate, setStartDate] = useState(Moment(new Date()).format('DD-MMM-yyyy'));
  const [endDate, setEndDate] = useState(Moment(new Date()).format('DD-MMM-yyyy'));
  const [selectedDate, setSelectedDate] = useState("today");
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [vendorTableDetails, setVendorTableDetails] = useState(
    {visible: true, 
      topCards: {
    "ORDER_QTY": 0,
    "PENDING_PIECES": 0,
    "STITCHED_PIECES": 0,
    "PRODUCED_PIECES": 0,
    "OK_PIECES": 0,
    "TOT_PCS": 0,
    "ALTERED_PIECES": 0,
    "PCS_IN_ALTERATION": 0,
    "REJECTED_PIECES": 0,
    "NO_OF_DEFECTS": 0,
    "NO_OF_PCS": 0
  }, topCardsH:{}, graphData: {}, tableData: [], inupt: {}}); // input will take the data for next screen API
  const [factoryTableDetails, setFactoryTableDetails] = useState({visible: false, topCards: {}, topCardsH:{}, graphData: {}, tableData: [], input: {}});
  const [nextTableDetails, setNextTableDetails] = useState({currentTable : "", nextTable: "", details: {}}); 
  const [currentTable, setCurrentTable] = useState("vendor");
  const socketRef = props.data.socketRef;

 
  useEffect(() => {
    console.log("props.data.loginStat!!!!!!",props.data.loginState, props.data.loginState === 1)
    if(props.data.loginState === 1)
    {
      socketRef.current.on("fromServer", ( msg ) => {
        console.log("message summary!!",msg);
        updateData(msg);
      })
      socketRef.current.on("connect", () => {
        console.log("socket id summary!!!!!",socketRef.current.id); 
      });
		}}
  ,
		[]
	)

  useEffect(()=>{
    //make useEffect or call a function here for each table data.
    switch(nextTableDetails.currentTable){
      case "vendor" : console.log("vendor!!!!!!", nextTableDetails.currentTable);setVendorTableDetails({...vendorTableDetails, visible:false}); break;
      case "factory" :console.log("factory!!!!!!", nextTableDetails.currentTable); setFactoryTableDetails({...factoryTableDetails, visible:false}); break;
      default: setVendorTableDetails({...vendorTableDetails, visible:false}); break;
    }
    switch(nextTableDetails.nextTable){
      case "vendor" : setCurrentTable("vendor"); setVendorTableDetails({...vendorTableDetails, visible: true, input: nextTableDetails.details}); break;
      case "factory" : setCurrentTable("factory"); setFactoryTableDetails({...factoryTableDetails, visible: true, input: nextTableDetails.details}); break;
      default: setVendorTableDetails({...vendorTableDetails, visible: true, input: nextTableDetails.details}); break;
    }
  },[nextTableDetails.nextTable]);

  const updateData = (msg) => {
    switch(currentTable)
    {
      case "vendor": setVendorTableDetails({...vendorTableDetails, topCardsH: vendorTableDetails.topCards,  topCards: msg.topCards, graphData: msg.vendorGraphData, tableData: msg.vendorTableData}); break;
      case "factory": setFactoryTableDetails({...factoryTableDetails,  topCardsH: factoryTableDetails.topCards, topCards: msg.topCards, graphData: msg.vendorGraphData, tableData: msg.vendorTableData}); break;
      default: setVendorTableDetails({...vendorTableDetails, topCardsH: vendorTableDetails.topCards, topCards: msg.topCards, graphData: msg.vendorGraphData, tableData: msg.vendorTableData}); break;
    }
    setLoading(false);
  }

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


const handleTimeChange = (event) => {
  setSelectedDate(event.target.value);
  props.data.socketRef.current.emit("setDateRangeFilter", event.target.value);
  console.log("date range changed");
  setLoading(true);
  event.preventDefault();

};

if (props.data.loginState !== 1) {
  return <Redirect to="/" />;
}
if (loading)
return <CircularProgress color="inherit" />
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
        {vendorTableDetails.visible ? <VendorGraph age={age} handleChange={handleChange} topCardsH={vendorTableDetails.topCardsH} topCards={vendorTableDetails.topCards} graphData={vendorTableDetails.graphData} />:null}
        {factoryTableDetails.visible ? <VendorGraph age={age} handleChange={handleChange} topCardsH={factoryTableDetails.topCardsH} topCards={factoryTableDetails.topCards} graphData={factoryTableDetails.graphData} />:null}
      </section>
      <section className="two">
      <div className="wrapper">
              <div className={classes.tableO}>
              {/* <div className="tableI sc5"> */}
              {vendorTableDetails.visible && <VendorTable data={vendorTableDetails.tableData} nextTableFunc={setNextTableDetails}/>}
              {factoryTableDetails.visible && <FactoryTable data={factoryTableDetails.tableData} nextTableFunc={setNextTableDetails} />}
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
  marginTop: 70,
  height:"85vh",
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
      height:"8vh",
      width:"95%", 
      position: 'fixed ',
      top: 10, left: 10,
      zIndex:200,
      paddingTop: 10, 
      margin:10,
      borderRadius:10,
      backgroundColor: 'white',
      display: "flex",
      alignContent: "space-between",
      alignItems: "center",
      justifyContent: "space-evenly",

    }
}));
export default Summary;
