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
import React, { useState, useEffect, useRef } from "react";
import TopBar from "../components/topbar";
import "../stylesheets/App.css";
// import "../stylesheets/activeOrders.css";
import { Redirect, Link } from "react-router-dom";
import { mdiFormatLetterCase, mdiDotsVertical, mdiMagnify, mdiCloseThick  } from '@mdi/js';
import Icon from '@mdi/react';
import { ResponsiveBar } from '@nivo/bar';
import "../stylesheets/progressBar.css";
import CountUp from "react-countup";
import { borderColor, borderRadius, fontWeight, margin } from "@mui/system";
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker,KeyboardDatePicker, MuiPickersUtilsProvider  } from "@material-ui/pickers";
import Moment from 'moment';
import VendorTable from "../components/vendorTable.jsx";
import FactoryTable from "../components/factoryTable.jsx";
import CircularProgress from '@mui/material/CircularProgress';
import VendorGraph from "../components/vendorGraph";
import Button from "@mui/material/Button";
import FgCards from "../components/fgCards";
import AuditTable from "../components/auditTable";
import Multiselect from 'multiselect-react-dropdown';
import Loader from "react-loader-spinner";

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
  "NO_OF_PCS": 0,
  "AUDITS_FAILED":0,
  "AUDITS_PASSED":0,
  "AUDITS_DONE":0,
  "ACTIVE_LINES":0,  
  "INACTIVE_LINES":0,
})

  //const [ topCards, setTopCards ] = useState({})
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
    setEnableAnimation(false)
    clearTimeout(timer);
  };
  const [startDate, setStartDate] = useState(Moment(new Date()).format('DD-MMM-yyyy'));
  const [endDate, setEndDate] = useState(Moment(new Date()).format('DD-MMM-yyyy'));
  const [selectedDate, setSelectedDate] = useState("today");
  const [searchText, setSearchText] = useState("");
  const [fgCodeList, setFgCodeList] = useState([]);
  const [selectedFgCode, setSelectedFgCode] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enableAnimation, setEnableAnimation] = useState(true);
  const [msg, setMsg] = useState({});
  const [msgH, setMsgH] = useState({});
  const [auditRawData, setAuditRawData] = useState({});
  const [vendorTableDetails, setVendorTableDetails] = useState(
    {visible: true, 
      topCards: {
    "ORDER_QTY": 0,
    "PENDING_PIECES": 0,
    "STITCHED_PIECES": 0,
    "PRODUCED_PIECES":0,
    "OK_PIECES": {value:0},
    "TOT_PCS": {value:0},
    "ALTERED_PIECES":{value:0},
    "PCS_IN_ALTERATION": 0,
    "REJECTED_PIECES":{value:0},
    "NO_OF_DEFECTS":{value:0},
    "AUDITS_FAILED":0,
    "AUDITS_PASSED":0,
    "NO_OF_PCS":0,
    "AUDITS_DONE":{value:0},
    "ACTIVE_LINES":0,  
    "INACTIVE_LINES":0,
    "ACTIVE_LOCATIONS":0,
    "INACTIVE_LOCATIONS":0,
    
  }, topCardsH:{
    "ORDER_QTY": 0,
    "PENDING_PIECES": 0,
    "STITCHED_PIECES": 0,
    "PRODUCED_PIECES":0,
    "OK_PIECES": {value:0},
    "TOT_PCS": {value:0},
    "ALTERED_PIECES":{value:0},
    "PCS_IN_ALTERATION": 0,
    "REJECTED_PIECES":{value:0},
    "NO_OF_DEFECTS":{value:0},
    "AUDITS_FAILED":0,
    "AUDITS_PASSED":0,
    "NO_OF_PCS":0,
    "AUDITS_DONE":{value:0},
    "ACTIVE_LINES":0,  
    "INACTIVE_LINES":0,
    "ACTIVE_LOCATIONS":0,
    "INACTIVE_LOCATIONS":0,
  }, graphData: {}, lineGraph:[], tableData: [], tableDataH: [], inupt: {}}); // input will take the data for next screen API
  const [factoryTableDetails, setFactoryTableDetails] = useState({visible: false, topCards: {}, topCardsH:{}, graphData: {}, lineGraph: [], tableData: [], tableDataH: [], input: {}});
  const [nextTableDetails, setNextTableDetails] = useState({currentTable : "", nextTable: "", details: {}}); 
  const [currentTable, setCurrentTable] = useState("vendor");
  const [ searchWidthPh, setSearchWidthPh] = useState({width: "0px", ph: "Search Brand or FG Code"});
  var timer;
  const [sequenceType, setSequenceType] = useState({recent: "", orderQty: -1, pending: -1, pcsProduced: -1, okPcs: -1, rectifiedPcs: -1, pcsInAlter: -1, rejectedPcs: -1, rejectPer: -1, dhuPer: -1});
  const [updateHistory, setUpdateHistory] = useState({newMsg : 0, data : 1});
  const [defectsHeatMap, setDefectsHeatMap] = useState([]);
  const [fgCodeKPIdata, setFgCodeKPIdata] = useState([]);
  const [auditTable, setAuditTable] = useState(false);
  const [auditTableData, setAuditTableData] = useState([]);
  const socketRef = props.data.socketRef;
  const multiselectRef = React.useRef();

  useEffect(() => {
    if(props.data.loginState === 1)
    {
      socketRef.current.on("fromServer", ( msg1 ) => {
        console.log("message summary!!",msg1);
        var startTime = performance.now()
        const size = Buffer.byteLength(JSON.stringify(msg1))
        
        const kiloBytes = size / 1024;
        const megaBytes = kiloBytes / 1024;
        // console.log(size,kiloBytes,megaBytes)
        let temp = msg1;
        temp.vendorGraphData.producedPieces.sort((a,b) => a["Produced Pieces"] - b["Produced Pieces"]).reverse();
        temp.vendorGraphData.okPieces.sort((a,b) => a["Ok Pieces"] - b["Ok Pieces"]).reverse();
        temp.vendorGraphData.alteredPieces.sort((a,b) => a["Altered Pieces"] - b["Altered Pieces"]).reverse();
        temp.vendorGraphData.rejectedPieces.sort((a,b) => a["Rejected Pieces"] - b["Rejected Pieces"]).reverse();
        temp.vendorGraphData.allPieces.sort((a,b) => a["All Pieces"] - b["All Pieces"]).reverse();
        temp.vendorGraphData.dhu.pop(0)
        temp.vendorGraphData.dhu.sort((a,b) => a["DHU"] - b["DHU"]).reverse();
        temp.topCards.TOT_PCS.tooltip.sort((a,b) => a["frequency"] - b["frequency"]).reverse();
        temp.topCards.OK_PIECES.tooltip.sort((a,b) => a["frequency"] - b["frequency"]).reverse();
        temp.topCards.ALTERED_PIECES.tooltip.sort((a,b) => a["frequency"] - b["frequency"]).reverse();
        temp.topCards.REJECTED_PIECES.tooltip.sort((a,b) => a["frequency"] - b["frequency"]).reverse();
        temp.topCards.NO_OF_DEFECTS.tooltip.sort((a,b) => a["frequency"] - b["frequency"]).reverse();
        temp.topCards.REJECTED_PIECES.defects.sort((a,b) => a["frequency"] - b["frequency"]).reverse();
        var endTime = performance.now()

        console.log(`check1 ${endTime - startTime} milliseconds`)
        setMsg((arg)=>{
          setMsgH(JSON.parse(JSON.stringify({...arg})))
          return(temp)})
          var endTime2 = performance.now()
          console.log(`checkw ${endTime2 - startTime} milliseconds`)
      })
      socketRef.current.on("filterObjects", ( msg ) => {
        // //console.log("message summary!!",msg);
        //console.log("filter list is!!!!!!!!!!!!!!!!", msg)
        let temp = msg;
        // //console.log("data is", data.result);
        for(let i = 0; i< temp.length; i++)
        {
          temp[i].cat = temp[i].filterID;
          temp[i].key = temp[i].filterValue;
        }
        setFgCodeList(temp);
      });
      socketRef.current.on("connect", () => {
        // //console.log("socket id summary!!!!!",socketRef.current.id); 
      });

      socketRef.current.on("rawData", (msg3) => {
        console.log(msg3)
        setAuditRawData(msg3)
      });
      props.data.socketRef.current.emit("getRawExportData");
		}}
  ,
		[]
	)

  useEffect(() => {

    if(enableAnimation){
      //console.log("enableAnimation")
    timer = setTimeout(() => {
      if(updateHistory.newMsg === 0)
      {
        setUpdateHistory({...updateHistory, data: 0});
      }
      switch(age)
      {
        case "": setAge("Ok"); break;
        case "Ok":  setAge("Alter"); break;
        case "Alter" : setAge("Rejected"); break;
        case "Rejected": setAge("All"); break;
        case "All": setAge("DHU"); break;
        case "DHU": setAge(""); break;
      }
    }, 15000);
  }else{
    //console.log("DisableAnimation")
    clearTimeout(timer);
  }
  },[age])

  useEffect (() =>{
    if(sequenceType.recent !== "")
    sequenceChange();
  }, [sequenceType])

  useEffect(() =>{
    let temp = []
    if(msg.vendorLineGraph && msg.vendorLineGraph.length != 0)
    {
      temp = msg.vendorLineGraph[0].locationDetails;
    }
    switch(currentTable)
    {
      case "vendor": setVendorTableDetails({...vendorTableDetails, topCardsH: vendorTableDetails.topCards,  topCards: msg.topCards, graphData: msg.vendorGraphData, lineGraph: temp, tableDataH: msgH.vendorTableData ? msgH.vendorTableData : vendorTableDetails.tableData, tableData: msg.vendorTableData}); break;
      case "factory": setFactoryTableDetails({...factoryTableDetails,  topCardsH: factoryTableDetails.topCards, topCards: msg.topCards, graphData: msg.vendorGraphData, lineGraph: temp, tableDataH: msgH.vendorTableData ? msgH.vendorTableData : vendorTableDetails.tableData, tableData: msg.vendorTableData}); break;
      default: setVendorTableDetails({...vendorTableDetails, topCardsH: vendorTableDetails.topCards, topCards: msg.topCards, graphData: msg.vendorGraphData, lineGraph: temp, tableDataH: msgH.vendorTableData ? msgH.vendorTableData : vendorTableDetails.tableData, tableData: msg.vendorTableData}); break;
    }
    setDefectsHeatMap(msg.defectsHeatMap);
    setFgCodeKPIdata(msg.fgCodeKPIData);
    if(msg.topCards)
    {setAuditTableData(msg.topCards.AUDITS_DONE.tooltip);}
    setUpdateHistory({...updateHistory, newMsg : 1});
    sequenceChange();
    setLoading(false);
  },[msg])

  useEffect(()=>{
    //make useEffect or call a function here for each table data.
    switch(nextTableDetails.currentTable){
      case "vendor" : setVendorTableDetails({...vendorTableDetails, visible:false}); break;
      case "factory" : setFactoryTableDetails({...factoryTableDetails, visible:false}); break;
      default: setVendorTableDetails({...vendorTableDetails, visible:false}); break;
    }
    switch(nextTableDetails.nextTable){
      case "vendor" : setCurrentTable("vendor"); setVendorTableDetails({...vendorTableDetails, visible: true, input: nextTableDetails.details}); break;
      case "factory" : setCurrentTable("factory"); setFactoryTableDetails({...factoryTableDetails, visible: true, input: nextTableDetails.details}); break;
      default: setVendorTableDetails({...vendorTableDetails, visible: true, input: nextTableDetails.details}); break;
    }
  },[nextTableDetails.nextTable]);


  const sequenceChange = () =>{
    let key = "", message = JSON.parse(JSON.stringify(msg));
    switch(sequenceType.recent){
      case "orderQty": key = "orderQty"; break;
      case "pending": key = "pendingPieces"; break;
      case "pcsProduced": key = "producedPieces"; break;
      case "okPcs": key = "okPieces"; break;
      case "rectifiedPcs": key = "alteredPieces"; break;
      case "pcsInAlter": key = "pcsInAlteration"; break;
      case "rejectedPcs": key = "rejectedPieces"; break;
      case "rejectPer": key = "rejPerc"; break;
      case "dhuPer": key = "dhu"; break;
    }
    if(key !== "")
    {
      if(sequenceType[sequenceType.recent] === 1)
      {
        
        if(key !== "rejPerc" && key !== "dhu")    
        message.vendorTableData.sort((a,b) => {if(a["locationName"] !== "Total") {return a[key] - b[key]} else{return -10000}}).reverse(); // last value should not be less than -10000 or else total will be above it
        else
        message.vendorTableData.sort((a,b) => {if(a["locationName"] !== "Total") {return parseFloat(a[key].slice(0, a[key].length - 1)) - parseFloat(b[key].slice(0, b[key].length - 1))} else{return -10000}}).reverse(); // last value should not be less than -10000 or else total will be above it
      }
      switch(currentTable)
    {
      case "vendor": setVendorTableDetails({...vendorTableDetails, tableDataH: msgH.vendorTableData, tableData: message.vendorTableData}); break;
      case "factory": setFactoryTableDetails({...factoryTableDetails, tableDataH: msgH.vendorTableData, tableData: message.vendorTableData}); break;
      default: setVendorTableDetails({...vendorTableDetails, tableDataH: msgH.vendorTableData, tableData: message.vendorTableData}); break;
    }
    }
    if(sequenceType[sequenceType.recent] === 1)
    {
      setUpdateHistory({...updateHistory, data: 0});
    }
    else
    {
      setUpdateHistory({...updateHistory, data: 1});
    }
  }

  //console.log(socketRef)

const handleTimeChange = (event) => {
  setSelectedDate(event.target.value);
  props.data.socketRef.current.emit("setDateRangeFilter", event.target.value);
  // //console.log("date range changed", event.target.value);
  setLoading(true);
  props.data.socketRef.current.emit("getRawExportData");
};

const handleFgCodeChange = (event) => {
  setLoading(true);
  let temp = event[0]; // Ideally temp should be an array and this line should throw error but code works fine with this and if temp is converted to and array, it gives error.
  setSelectedFgCode(temp); //  remove when want multi
  if(event[0].filterType === "")
  {
  setSearchWidthPh({width: "0px", ph: "Search Brand or FG Code"})

  }
  else
  {
  setSearchWidthPh({...searchWidthPh, ph: event[0].filterType + ": "+ event[0].filterValue})
  }
  //console.log("event!!!!!!!!!!!!1", event);
  multiselectRef.current.resetSelectedValues(event);
//  if(event.length > 0)
  props.data.socketRef.current.emit("setFilters", [event[0]]);
  props.data.socketRef.current.emit("getRawExportData");
// else
 // props.data.socketRef.current.emit("setFilters", []);
}

if (props.data.loginState !== 1) {
  return <Redirect to="/" />;
}

console.log(vendorTableDetails)

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
            {/* <MenuItem value="custom">Custom</MenuItem> */}
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
                      onChange={date => {console.log("date is !!!!!!!!!!!!", Moment(date).format('DD-MMM-yyyy hh:mm:ss'));setStartDate(Moment(date).format('DD-MMM-yyyy'))}}
                      InputAdornmentProps={{ position: "start" }}
                      maxDate={endDate}
                    />
    </MuiPickersUtilsProvider>
}
{loading?
  <div class="continuous-4"></div>:null}

{selectedDate === "custom" &&
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
              autoOk
              variant="inline"
              inputVariant="outlined"
              label="End Date"
              format="dd-MMM-yyyy"
              value={endDate}
              onChange={date => { console.log("date is !!!!!!!!!!!!", Moment(date).format('DD-MMM-yyyy'));setEndDate(Moment(date).format('DD-MMM-yyyy'));}}
              InputAdornmentProps={{ position: "start" }}
              minDate={startDate}
            />
    </MuiPickersUtilsProvider>
}
<div>
{/* <Multiselect
  displayValue="key"
  id="css_custom"
  //onKeyPressFn={function noRefCheck(){}}
  onRemove={(e) => handleFgCodeChange(e)}
  onSearch={(e) => //console.log ("searcheed", e)}
  onSelect={(e) => handleFgCodeChange(e)}
  options={fgCodeList}
  placeholder="Search Brand or FgCode"
  style={{
    chips: {
      background: 'red'
    },
    multiselectContainer: {
      color: 'red'
    },
    searchBox: {
      border: 'none',
      'border-bottom': '1px solid blue',
      'border-radius': '0px',
      marginLeft: 20,
      marginRight: 20,
    //  float:"left",
      transition: "0.4s",
      width: searchWidthPh.width,
    }
  }}
/> */}
</div>
    {/* <input placeholder="Search..." style={{    border: "0px solid #00000044",
    borderRadius: "3px",
    padding:"8px 10px",
    verticalAlign: "middle",
    outline: "none",}}onChange={event => setSearchText(event.target.value)} /> */}
    <div style ={{display: 'flex', maxWidth: "600px", marginLeft: 20, marginRight: 20 }}                         
    onMouseEnter={() => setSearchWidthPh({ ... searchWidthPh, width: "550px"})}
    onMouseLeave={() => {if(selectedFgCode.length === 0)
                          setSearchWidthPh({...searchWidthPh, width: "50px"})
                        }}>
    <Icon path={mdiMagnify}
                        size={2}
                        style={{alignSelf: 'center', marginLeft: 20}}
                        color="blue"
                    />
    <Multiselect
      displayValue="key"
      id="css_custom"
      //onKeyPressFn={function noRefCheck(){}}
    //  onRemove={(e) => handleFgCodeChange(e)}
      // onSearch={(e) => //console.log ("searched", e)}
      onSelect={(e) => setTimeout(() => handleFgCodeChange(e), 300)} // state take a little time to update event hence added some delay
      options={fgCodeList}
    //  singleSelect={true}
    //selectionLimit={1}
    selectedValues={selectedFgCode} // remove when want multi
      placeholder={searchWidthPh.ph} 
      ref={multiselectRef}
      style={{
        chips: {
          background: 'blue'
        },
        multiselectContainer: {
          color: 'blue',
        },
        searchBox: 
        {
          border:"none",
          'border-bottom': '1px solid blue',
          'border-radius': '0px',
        //  float:"left", // this gives error
          transition: "0.4s",
          minWidth:200,
          width: searchWidthPh.width,
      }
      }}
      />
      {searchWidthPh.width !== "0px" ? 
        <Icon path={mdiCloseThick} size={2} color="blue" onClick={() =>{handleFgCodeChange([{ filterID: 0, filterType: "", filterValue: ""}])}}  /> : null }
</div>
    <div>
      <Button   onClick={() => {
      // //console.log("socket.current", socketRef.current);
    //  socketRef.current.disconnect();
      props.data.setLoginState(-1);
    //  props.data.setSocketID("");
  }}>SignOut</Button> 
  </div>
        </Grid>
        {vendorTableDetails.visible ? <VendorGraph age={age} handleChange={handleChange} topCardsH={vendorTableDetails.topCardsH} topCards={vendorTableDetails.topCards} graphData={vendorTableDetails.graphData} lineGraph={vendorTableDetails.lineGraph} setAuditTable={setAuditTable}/>:null}
        {factoryTableDetails.visible ? <VendorGraph age={age} handleChange={handleChange} topCardsH={factoryTableDetails.topCardsH} topCards={factoryTableDetails.topCards} graphData={factoryTableDetails.graphData} lineGraph={factoryTableDetails.lineGraph} setAuditTable={setAuditTable}/>:null}
      </section>
      {auditTable ?
      <section className="two">
        <AuditTable setAuditTable={setAuditTable} auditTableData={auditTableData} auditRawData={auditRawData}/>
      </section>
      : null}
      {fgCodeKPIdata && fgCodeKPIdata.length >0 ?
      <section className="two">
        <FgCards fgCodeKPIdata={fgCodeKPIdata} defectsHeatMap={defectsHeatMap}/>
      </section>
      : null}
      <section className="three">
      <div className="wrapper">

              <div className={classes.tableO}>
              {vendorTableDetails.visible ? <VendorTable data={vendorTableDetails.tableData} nextTableFunc={setNextTableDetails} tableDataH={vendorTableDetails.tableDataH} setSequenceType={setSequenceType} sequenceType={sequenceType} setUpdateHistory={setUpdateHistory} updateHistory1={updateHistory} searchWidthPh={searchWidthPh}/> : null}
              {factoryTableDetails.visible ? <FactoryTable data={factoryTableDetails.tableData} nextTableFunc={setNextTableDetails}  tableDataH={factoryTableDetails.tableDataH} setSequenceType={setSequenceType} sequenceType={sequenceType} setUpdateHistory={setUpdateHistory} updateHistory1={updateHistory} searchWidthPh={searchWidthPh}/> : null}
              </div>
            </div>
      </section>

      {/* <section className="two">

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
      </section> */}
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
graph:{
  height: 365 ,
   width: "20%",
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
fgCard2:{
  marginTop: 80,
  height: 365 ,
   width: "55%",
  alignContent:'center',
  display: "flex",
  justifyContent: "center",
  borderRadius:10,
  marginLeft:25,
  fontWeight: "bold",
  backgroundColor: '#ffffffcc',
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
      height:"4.5rem",
      width:"98%", 
      position: 'fixed ',
      top: 10, left: 10,right:10,
      zIndex:1200,
      padding: 10, 
      // margin:10,
      borderRadius:10,
      backgroundColor: 'white',
      display: "flex",
      alignContent: "space-between",
      alignItems: "center",
      justifyContent: "space-between",
    },
    fgCard1: {
      marginTop: 80,
      backgroundColor: '#ffffffcc',
      alignContent: 'center',
      borderRadius: 10,
      padding: 10,
      justifyContent: 'center'
    },
}));
export default Summary;
