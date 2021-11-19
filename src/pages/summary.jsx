import {
  Typography,
  makeStyles,
  Grid,
  Button,
  TextField,
  IconButton,
  Collapse,
  CircularProgress,
  Switch,
  Card,
  Radio,
  CardContent,
} from "@material-ui/core";
import io from "socket.io-client";
import { withStyles } from "@material-ui/styles";
import React, { Component, useEffect, useState, useRef } from "react";
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
import { margin } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "100%",
    marginTop: "20px",
    overflow: 'hidden'
},
cardG: {
  height: 110,
  width: "100%",
  backgroundColor: "#cafbd5AA",
  boxShadow: "0px 17px 17px -10px #8ff5ac",
  transition: "all .2s ease-in-out",
  borderRadius: 8,
  "&:hover": {
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "none",
    backgroundColor: "#cafbd5",
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
  backgroundColor: "#c9dcffAA",
  boxShadow: "0px 17px 17px -10px #6ea1ff",
  transition: "all .2s ease-in-out",
  borderRadius: 8,
  "&:hover": {
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "none",
    backgroundColor: "#c9dcff",
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
  backgroundColor: "#fff9cdAA",
  boxShadow: "0px 17px 17px -10px #ffe949",
  transition: "all .2s ease-in-out",
  borderRadius: 8,
  "&:hover": {
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "none",
    backgroundColor: "#fff9cd",
    transform: "scale(1.1)"
  },
},
labelHeaderY: {
  fontSize: 20,
  fontFamily: "Work",
  margin: 2,
  marginLeft:10,
  padding: 2,
  color: "#ffce00",
  fontWeight:800,
  textAlign:"left",
  letterSpacing:"-1px"
},
cardR: {
  height: 110,
  width: "100%",
  backgroundColor: "#ffdfdbAA",
  boxShadow: "0px 17px 17px -10px #ffb2a6",
  transition: "all .2s ease-in-out",
  borderRadius: 8,
  "&:hover": {
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "none",
    backgroundColor: "#ffdfdb",
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
cardR: {
  height: 110,
  width: "100%",
  backgroundColor: "#ffdfdbAA",
  boxShadow: "0px 17px 17px -10px #ffb2a6",
  transition: "all .2s ease-in-out",
  borderRadius: 8,
  "&:hover": {
    fontWeight: "bold",
    cursor: "pointer",
    textDecoration: "none",
    backgroundColor: "#ffdfdb",
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
  backgroundColor: "#ffedd9AA",
  boxShadow: "0px 17px 17px -10px #ffc88e",
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
  wrapper: {
   width:"100%",
  },
  tableHeaderFont: {
    backgroundColor: "#f8bcd0",
    },
}));

const Summary = (props) => {
  let classes = useStyles();
  const [ state, setState ] = useState({ message: "", name: "" })
	const [ chat, setChat ] = useState([])

	const socketRef = useRef()
  useEffect(
		() => {
			socketRef.current = io.connect("http://localhost:3492")
			socketRef.current.on("login", ({ emailID, password }) => {
				setChat([ ...chat, { emailID, password } ])
			})
			return () => socketRef.current.disconnect()
		},
		[ chat ]
	)

	const onTextChange = (e) => {
		setState({ ...state, [e.target.name]: e.target.value })
	}

	const onMessageSubmit = (e) => {
		const { name, message } = state
		socketRef.current.emit("message", { name, message })
		e.preventDefault()
		setState({ message: "", name })
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

  return (
    <div style={{ padding: 10, 
                  backgroundImage: "linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(246,246,246,1) 47%, rgba(237,237,237,1) 100%)" }}>
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
        <div style={{height: 400 , width: "60%", alignContent:'center'}}>
        {/* <ResponsiveBar
         data={[
          {
            "vendor": "Metro Clothing",
            "pcs": 32895,
          },
          {
            "vendor": "Om Creations",
            "pcs": 28982,
          },
          {
            "vendor": "Punit Creations",
            "pcs": 24758,
          },
          {
            "vendor": "ShyamTex",
            "pcs": 20082,
          },
          {
            "vendor": "ShyamTex",
            "pcs": 20082,
          },
          {
            "vendor": "Texwear",
            "pcs": 18998,
          },
          {
            "vendor": "B Tex",
            "pcs": 12998,
          },
          {
            "vendor": "RCR",
            "pcs": 10005,
          },
          {
            "j": "RR",
            "pcs": 0,
          },
        ]}
        keys={[ 'pcs' ]}
        indexBy="vendor"
        margin={{ top: 50, right: 20, bottom: 50, left: 60 }}
        padding={0.3}
        // width={600}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={["#25be3188"]}
        borderRadius={3}
        axisTop={null}
        axisRight={null}
        axisLeft={null}
        enableGridY={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 113,
                itemHeight: 29,
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
        motionConfig="wobbly"
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
    /> */}
      <ResponsiveBar
        data={[
          {
            "country": "Metro Clothing",
            "Ok Pieces": 13400,
          },
          {
            "country": "Om Creations",
            "Ok Pieces": 12698,
          },
          {
            "country": "CRI Indus",
            "Ok Pieces": 11508,
          },
          {
            "country": "RCR Exports",
            "Ok Pieces": 9866,
          },
          {
            "country": "Punit Creation",
            "Ok Pieces": 8745,
          },
          {
            "country": "Garland Apparels",
            "Ok Pieces": 7854,
          },
          {
            "country": "Girish Eports",
            "Ok Pieces": 5007,
          }
        ]}
        keys={[ 'Ok Pieces' ]}
        indexBy="country"
        margin={{ top: 50, right: 30, bottom: 40, left: 60 }}
        padding={0.5}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={["#49b667"]}
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
                anchor: 'right',
                direction: 'row',
                justify: false,
                translateX: 40,
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
    />
    </div>
    </Grid>
    <div className="card">
			<form onSubmit={onMessageSubmit}>
				<h1>Messenger</h1>
				<div className="name-field">
					<TextField name="name" onChange={(e) => onTextChange(e)} value={state.name} label="Name" />
				</div>
				<div>
					<TextField
						name="message"
						onChange={(e) => onTextChange(e)}
						value={state.message}
						id="outlined-multiline-static"
						variant="outlined"
						label="Message"
					/>
				</div>
				<button>Send Message</button>
			</form>
			<div className="render-chat">
				<h1>Chat Log</h1>
				{renderChat()}
			</div>
		</div>

    </div>
  );
};

export default Summary;
