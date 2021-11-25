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
import React, { Component, useEffect, useState, useRef } from "react";
import TopBar from "../components/topbar";
import "../stylesheets/App.css";
// import "../stylesheets/activeOrders.css";
import { Redirect, Link } from "react-router-dom";
import { mdiFormatLetterCase, mdiDotsVertical } from '@mdi/js'
import Icon from '@mdi/react';
import { ResponsiveBar } from '@nivo/bar';
import "../stylesheets/progressBar.css";
import { fontWeight, margin } from "@mui/system";

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
  fontSize: 25,
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
}));

const Summary = (props) => {
  let classes = useStyles();
  const [ state, setState ] = useState({ emailID: "", password: "" })
	const [ chat, setChat ] = useState([])
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };



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





	const socketRef = useRef()
  useEffect(
		() => {
			socketRef.current = io.connect("https://zedqwsapi.bluekaktus.com/", { transports: ['websocket'] })
      socketRef.current.on("fromServer", ( msg ) => {
        // setChat([...chat, { emailID, password }])
        console.log(msg);
      })
      socketRef.current.on("validLogin", () => {
				console.log("login successful");
			})
      socketRef.current.on("invalidLogin", () => {
        console.log("login unsuccessful");
      })
			return () => socketRef.current.disconnect()
		},
		[ chat ]
	)

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

  return (
    <MuiThemeProvider theme={THEME}>
    <div className="sc5">
      <section class="one">
        <div style={{height:"10vh",width:"100%"}}></div>
          <Grid container>
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
                          </div>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      align="center"
                      
                    >
                      <div className={classes.cardB}>
                      <Typography className={classes.labelHeaderB}>
                          {"Ok Pieces"}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      align="center"
                      
                    >
                      <div className={classes.cardY}>
                      <Typography className={classes.labelHeaderY}>
                          {"Rectified Pcs"}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      align="center"
                      
                    >
                      <div className={classes.cardR}>
                      <Typography className={classes.labelHeaderR}>
                          {"Rejected Pcs"}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      align="center"
                      
                    >
                      <div className={classes.cardR}>
                      <Typography className={classes.labelHeaderR}>
                          {"Rejected %"}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      align="center"
                      
                    >
                      <div className={classes.cardO}>
                      <Typography className={classes.labelHeaderO}>
                          {"DHU%"}
                        </Typography>
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
              <div className={classes.tableI}>
                <Table stickyHeader={true} className="fixedtbl">
                  <TableHead>
                    <StyledTableRow style={{ backgroundColor: "#6495ED00" }}>
                      <StyledTableCell
                        style={{
                          padding: 0,
                          paddingLeft: 20,
                          paddingTop: 10,
                          paddingBottom: 10,
                          width: "20%",
                          backgroundColor: "#fff",
                          textAlign:"left",
                          zIndex: 1000,
                        }}
                      >
                        <Typography className={classes.superheaderTxt}>
                          Vendor
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        style={{
                          padding: 10,
                      
                          width: "10%",
                          backgroundColor: "#fff",
                          textAlign:"right",
                          zIndex: 1000,
                        }}
                      >
                        <Typography className={classes.superheaderTxt}>
                          Order Qty
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        style={{
                          padding: 10,
                      
                          width: "10%",
                          backgroundColor: "#fff",
                          textAlign:"right",
                          zIndex: 1000,
                        }}
                      >
                        <Typography className={classes.superheaderTxt}>
                          Pending
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        style={{
                          padding: 10,
                      
                          width: "10%",
                          backgroundColor: "#fff",
                          textAlign:"right",
                          zIndex: 1000,
                        }}
                      >
                        <Typography className={classes.superheaderTxt}>
                          Pcs Produced
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        style={{
                          padding: 10,
                      
                          width: "10%",
                          backgroundColor: "#fff",
                          textAlign:"right",
                          zIndex: 1000,
                        }}
                      >
                        <Typography className={classes.superheaderTxt}>
                          Ok Pieces
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        style={{
                          padding: 10,
                      
                          width: "10%",
                          backgroundColor: "#fff",
                          textAlign:"right",
                          zIndex: 1000,
                        }}
                      >
                        <Typography className={classes.superheaderTxt}>
                          Rectified Pcs
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        style={{
                          padding: 10,
                      
                          width: "10%",
                          backgroundColor: "#fff",
                          textAlign:"right",
                          zIndex: 1000,
                        }}
                      >
                        <Typography className={classes.superheaderTxt}>
                          Defects
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        style={{
                          padding: 10,
                      
                          width: "10%",
                          backgroundColor: "#fff",
                          textAlign:"right",
                          zIndex: 1000,
                        }}
                      >
                        <Typography className={classes.superheaderTxt}>
                          Rejected Pcs
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        style={{
                          padding: 10,
                      
                          width: "10%",
                          backgroundColor: "#fff",
                          textAlign:"right",
                          zIndex: 1000,
                        }}
                      >
                        <Typography className={classes.superheaderTxt}>
                          Rejection%
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        style={{
                          padding: 10,
                          width: "10%",
                          backgroundColor: "#fff",
                          textAlign:"right",
                          zIndex: 1000,
                        }}
                      >
                        <Typography className={classes.superheaderTxt}>
                          DHU%
                        </Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableHead>

                  {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
                    .map((row) => (
                      <StyledTableRow>
                        <StyledTableCell>{"Shree Raj Apparels"}</StyledTableCell>
                        <StyledTableCell>
                          <Typography  
                            style={{
                            textAlign:"right",
                          }}>
                            {"98547"}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Typography  
                            style={{
                            textAlign:"right",
                          }}>
                            {"98547"}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Typography  
                            style={{
                            textAlign:"right",
                          }}>
                            {"98547"}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Typography  
                            style={{
                            textAlign:"right",
                          }}>
                            {"98547"}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Typography  
                            style={{
                            textAlign:"right",
                          }}>
                            {"98547"}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Typography  
                            style={{
                            textAlign:"right",
                          }}>
                            {"98547"}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Typography  
                            style={{
                            textAlign:"right",
                          }}>
                            {"98547"}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Typography  
                            style={{
                            textAlign:"right",
                          }}>
                            {"3%"}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Typography  
                            style={{
                            textAlign:"right",
                          }}>
                            {"5%"}
                          </Typography>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </Table>
                </div>
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

export default Summary;
