import React, {useState, useEffect} from "react";
import {
    Typography,
    makeStyles,
     Table,
     TableHead,
     TableCell,
     TableRow,
     Grid,
     FormControl,
     Select,
     MenuItem
  } from "@material-ui/core";
  import { withStyles } from "@material-ui/styles";
  import CountUp from "react-countup";
  import { ResponsiveBar } from '@nivo/bar';
  import { ResponsiveLine } from '@nivo/line';
  import ReactTooltip from "react-tooltip";

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
    height: "15vh",
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
    fontSize: "1.5rem",
    fontFamily: "Work",
    margin: 2,
    marginLeft:10,
    padding: 2,
    color: "#49b667",
    fontWeight:800,
    textAlign:"left",
    letterSpacing:"-1px"
  },
  labelHeaderGX: {
    fontSize: "2vh",
    fontFamily: "Work",
    margin: 2,
    padding: 2,
    color: "#49b667",
    fontWeight:800,
    textAlign:"center",
    letterSpacing:"-1px"
  },
  cardCB: {
    height: "16vh",
    width: "100%",
    backgroundColor: "#e1ecf8",
    boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
    transition: "all .2s ease-in-out",
    borderRadius: 8,
    "&:hover": {
      fontWeight: "bold",
      cursor: "pointer",
      textDecoration: "none",
      backgroundColor: "#e1ecf8",
      transform: "scale(1.05)"
    },
  },
  labelHeaderCB: {
    fontSize: "2.5vh",
    fontFamily: "Work",
    margin: 2,
    marginLeft:10,
    padding: 2,
    color: "#0090d4",
    fontWeight:800,
    textAlign:"left",
    letterSpacing:"-1px"
  },
  labelHeaderCBX: {
    fontSize: "2.5vh",
    fontFamily: "Work",
    margin: 2,
    padding: 2,
    color: "#0090d4",
    fontWeight:800,
    textAlign:"center",
    letterSpacing:"-1px"
  },

  cardCG: {
    height: "16vh",
    width: "100%",
    backgroundColor: "#d7e8e5",
    boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
    transition: "all .2s ease-in-out",
    borderRadius: 8,
    "&:hover": {
      fontWeight: "bold",
      cursor: "pointer",
      textDecoration: "none",
      backgroundColor: "#d7e8e5",
      transform: "scale(1.05)"
    },
  },
  labelHeaderCG: {
    fontSize: "2.5vh",
    fontFamily: "Work",
    margin: 2,
    marginLeft:10,
    padding: 2,
    paddingBottom:-10,
    lineHeight:1.1,
    color: "#036e67",
    fontWeight:800,
    textAlign:"center",
    letterSpacing:"-1px"
  },
  labelHeaderCGX: {
    fontSize: "2.5vh",
    fontFamily: "Work",
    margin: 2,
    padding: 2,
    color: "#036e67",
    fontWeight:800,
    textAlign:"center",
    letterSpacing:"-1px"
  },

  labelValG: {
    fontSize: "25vh",
    fontFamily: "Work",
    margin:5,
    color: "#49b667",
    fontWeight:800,
    textAlign:"right",
    letterSpacing:"-1px"
  },
  cardB: {
    height: "15vh",
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
    fontSize: "1.5rem",
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
    height: "15vh",
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
    fontSize: "2.8vh",
    fontFamily: "Work",
    margin: 2,
    marginLeft:10,
    padding: 2,
    color: "#ebc033",
    fontWeight:800,
    textAlign:"left",
    letterSpacing:"-1px"
  },
  labelHeaderYX: {
    fontSize: "3.1vh",
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
    height: "15vh",
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
    fontSize: "2.8vh",
    fontFamily: "Work",
    margin: 2,
    marginLeft:10,
    padding: 2,
    color: "#ff0025",
    fontWeight:800,
    textAlign:"left",
    letterSpacing:"-1px"
  },
  labelHeaderRA: {
    fontSize: "1.4rem",
    fontFamily: "Work",
    margin: 2,
    marginLeft:10,
    padding: 2,
    color: "#ff0025",
    fontWeight:800,
    textAlign:"left",
    letterSpacing:"-1px"
  },
  labelHeaderRX: {
    fontSize: "2.5vh",
    fontFamily: "Work",
    margin: 2,
    padding: 2,
    color: "#ff0025",
    fontWeight:800,
    textAlign:"center",
    letterSpacing:"-1px"
  },
  cardO: {
    height: "15vh",
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
    fontSize: "3.1vh",
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
    height: "47vh" ,
     width: "65%",
    alignContent:'center',
    borderRadius:10,
    marginLeft:15,
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
  graph2:{
    height: "35vh" ,
     width: "65%",
     marginRight:15,
    alignContent:'center',
    borderRadius:10,
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
    fontSize: "2.5rem",
    fontWeight: "bold",
    justifyContent:"flex-end",
    textAlign: "right",
    alignSelf: "flex-end",
    fontFamily: "Work",
    margin:5,
    marginTop:"2rem",
    color: "#49b667",
    fontWeight:800,
    textAlign:"right",
    letterSpacing:"-1px"
  },
  topRightGX: {
    fontSize: "2.6vw",
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
  topRightCB: {
    fontSize: "2.6vw",
    fontWeight: "bold",
    justifyContent:"flex-end",
    textAlign: "right",
    alignSelf: "flex-end",
    fontFamily: "Work",
    margin:5,
    color: "#0090d4",
    fontWeight:800,
    textAlign:"right",
    letterSpacing:"-1px"
  },
  topRightCG: {
    fontSize: "2.8vw",
    fontWeight: "bold",
    justifyContent:"flex-end",
    textAlign: "right",
    alignSelf: "flex-end",
    fontFamily: "Work",
    margin:5,
    color: "#036e67",
    fontWeight:800,
    textAlign:"right",
    letterSpacing:"-1px"
  },
  topRightB: {
    fontSize: "2.5rem",
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
    fontSize: "3vw",
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
  topRightYX: {
    fontSize: "2.7rem",
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
    fontSize: "3vw",
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
  topRightRA: {
    fontSize: "2.7rem",
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
  topRightRX: {
    fontSize: "2.6vw",
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
    fontSize: "2.7rem",
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
  

export default function VendorGraph(props) {
  const [data,setData] = useState([]);
  const { topCards, topCardsH, age, handleChange, graphData, lineGraph, setAuditTable} = props;
  const classes = useStyles();
  const [width, setWidth]   = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const updateDimensions = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
  }
  useEffect(() => {
      window.addEventListener("resize", updateDimensions);
      return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() =>{
   // if(age !== "All")
  //  {
    let temp = [], start =0, end = 0;
    switch(age)
    {
      case "": temp =  lineGraph.producedPieces; break;
      case "Ok" : temp = lineGraph.okPieces;break;
      case "Alter" : temp = lineGraph.alteredPieces;break;
      case "Rejected" : temp = lineGraph.rejectedPieces;break;
      case "DHU" : temp = lineGraph.dhu;break;
      case "All" : temp = lineGraph.producedPieces; break;
    }
     if(age === "DHU")
     {
      end = temp.length;
       for(let i = 0; i < lineGraph.dhu.length; i++)
       {
         temp[i].y = parseFloat(temp[i].y);
       }
     }
      if(temp)
      {
        end = temp.length;
      for(let i = 0; i < temp.length; i++)
      {
        if(temp[i].y !== 0 )
        {
          start = i;
          break;
        }
      }
      for(let i = temp.length - 1; i >= 0; i--)
      {
        if(temp[i].y !== 0 )
        {
          end = i + 1;
          break;
        }
      }
      if(start === 0)
      {
      setData(temp.slice(start, end));
      }
      else
      {
        setData(temp.slice(start - 1, end));
      }
      }
  //  }
  // else{
  //   let start = 0, end = 0;
  //   if(lineGraph.okPieces)
  //   {
  //     end = lineGraph.okPieces.length;
  //   for(let i = 0; i < lineGraph.okPieces.length; i++)
  //   {
  //     if(parseInt(lineGraph.okPieces[i].y) !== 0 )
  //     {
  //       start = i;
  //       break;
  //     }
  //   }
  //   for(let i = 0; i < lineGraph.alteredPieces.length; i++)
  //   {
  //     if(parseInt(lineGraph.alteredPieces[i].y) !== 0 )
  //     {
  //       if(i < start){
  //       start = i;
  //       }
  //       break;
  //     }
  //   }
  //   for(let i = 0; i < lineGraph.rejectedPieces.length; i++)
  //   {
  //     if(parseInt(lineGraph.rejectedPieces[i].y) !== 0 )
  //     {
  //       if(i < start){
  //       start = i;
  //       }
  //       break;
  //     }
  //   }
  //   for(let i = lineGraph.okPieces.length - 1; i >= 0; i--)
  //   {
  //     if(parseInt(lineGraph.okPieces[i].y) !== 0 )
  //     {
  //       end = i;
  //       break;
  //     }
  //   }
  //   for(let i = lineGraph.alteredPieces.length - 1; i >= 0; i--)
  //   {
  //     if(parseInt(lineGraph.alteredPieces[i].y) !== 0 )
  //     {
  //       if(i > end){
  //       end = i;
  //       }
  //       break;
  //     }
  //   }
  //   for(let i = lineGraph.rejectedPieces.length - 1; i >= 0; i--)
  //   {
  //     if(parseInt(lineGraph.rejectedPieces[i].y) !== 0 )
  //     {
  //       if(i > end){
  //       end = i;
  //       }
  //       break;
  //     }
  //   }
  //   }

  //   if(start === 0)
  //   {
  //   setData([{id: "Ok Pieces", color: 'red', data: lineGraph.okPieces.slice(start, end + 1)},{id: "Altered Pieces", color: 'blue', data: lineGraph.alteredPieces.slice(start, end + 1)},{id: "Rejected Pieces", color: 'green', data: lineGraph.rejectedPieces.slice(start, end + 1)}])
  //   }
  //   else
  //   {
  //   setData([{id: "Ok Pieces", color: 'red', data: lineGraph.okPieces.slice(start - 1, end + 1)},{id: "Altered Pieces", color: 'blue', data: lineGraph.alteredPieces.slice(start - 1, end + 1)},{id: "Rejected Pieces", color: 'green', data: lineGraph.rejectedPieces.slice(start - 1, end + 1)}])
  //   }
  // }
  }, [age, lineGraph])
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

  const CustomTick = (tick: AxisTickProps<string>) => {

    return (
     <foreignObject
       width={80}
       height={60}
       transform={`translate(${tick.x - 40},${tick.y})`}
     >
       <div stlye={{justifyContent:"center"}}>
         <Typography style={{textAlign:"center",
                             color: '#25be31',
                             fontWeight:800,
                             fontSize:"1.4vh",
                             height:60,
                             letterSpacing:"-1px"}}>
           {tick.value}
         </Typography>
       </div>
     </foreignObject>
   );
}

const CustomTickX = (tick: AxisTickProps<string>) => {

  return (
    <foreignObject
      width={80}
      height={90}
      transform={`translate(${tick.x - 40},${tick.y})`}
    >
      <div stlye={{justifyContent:"center"}}>
        <Typography style={{textAlign:"center",
                             color: '#25be31',
                            fontWeight:800,
                            fontSize:"2vh",
                            height:60,
                            marginTop:5,
                            letterSpacing:"-1px"}}>
          {tick.value}
        </Typography>
      </div>
    </foreignObject>
  );
}


const CustomTick2 = (tick: AxisTickProps<string>) => {

  return (
    <foreignObject
      width={80}
      height={60}
      transform={`translate(${tick.x - 40},${tick.y})`}
    >
      <div stlye={{justifyContent:"center"}}>
        <Typography style={{textAlign:"center",
                            color: "#6ea1ff",
                            fontWeight:800,
                            fontSize:"1.4vh",
                            height:60,
                            letterSpacing:"-1px"}}>
          {tick.value}
        </Typography>
      </div>
    </foreignObject>
  );
}

const CustomTick2X = (tick: AxisTickProps<string>) => {

  return (
    <foreignObject
      width={80}
      height={90}
      transform={`translate(${tick.x - 40},${tick.y})`}
    >
      <div stlye={{justifyContent:"center"}}>
        <Typography style={{textAlign:"center",
                            color: "#6ea1ff",
                            fontWeight:800,
                            fontSize:"2vh",
                            height:60,
                            marginTop:5,
                            letterSpacing:"-1px"}}>
          {tick.value}
        </Typography>
      </div>
    </foreignObject>
  );
}

const CustomTick3 = (tick: AxisTickProps<string>) => {

  return (
        <foreignObject
        width={80}
        height={60}
        transform={`translate(${tick.x - 40},${tick.y})`}
      >
        <div stlye={{justifyContent:"center"}}>
          <Typography style={{textAlign:"center",
                              color: '#ffce00',
                              fontWeight:800,
                              fontSize:"1.4vh",
                              height:60,
                              letterSpacing:"-1px"}}>
            {tick.value}
          </Typography>
        </div>
      </foreignObject>
  )
}
const CustomTick3X = (tick: AxisTickProps<string>) => {

  return (
    <foreignObject
      width={80}
      height={90}
      transform={`translate(${tick.x - 40},${tick.y})`}
    >
      <div stlye={{justifyContent:"center"}}>
        <Typography style={{textAlign:"center",
                            color: '#ffce00',
                            fontWeight:800,
                            fontSize:"2vh",
                            height:60,
                            marginTop:5,
                            letterSpacing:"-1px"}}>
          {tick.value}
        </Typography>
      </div>
    </foreignObject>
  );
}


const CustomTick4 = (tick: AxisTickProps<string>) => {

  return (
    <foreignObject
      width={80}
      height={60}
      transform={`translate(${tick.x - 40},${tick.y})`}
    >
      <div stlye={{justifyContent:"center"}}>
        <Typography style={{textAlign:"center",
                            color: "#ff0025",
                            fontWeight:800,
                            fontSize:"1.4vh",
                            height:60,
                            letterSpacing:"-1px"}}>
          {tick.value}
        </Typography>
      </div>
    </foreignObject>
  );
}

const CustomTick4X = (tick: AxisTickProps<string>) => {

  return (
    <foreignObject
      width={80}
      height={90}
      transform={`translate(${tick.x - 40},${tick.y})`}
    >
      <div stlye={{justifyContent:"center"}}>
        <Typography style={{textAlign:"center",
                            color: "#ff0025",
                            fontWeight:800,
                            fontSize:"2vh",
                            height:60,
                            marginTop:5,
                            letterSpacing:"-1px"}}>
          {tick.value}
        </Typography>
      </div>
    </foreignObject>
  );
}

const CustomTick5 = (tick: AxisTickProps<string>) => {

  return (
       <foreignObject
       width={80}
       height={60}
       transform={`translate(${tick.x - 40},${tick.y})`}
     >
       <div stlye={{justifyContent:"center"}}>
         <Typography style={{textAlign:"center",
                             color: '#ff9800',
                             fontWeight:800,
                             fontSize:"1.4vh",
                             height:60,
                             letterSpacing:"-1px"}}>
           {tick.value}
         </Typography>
       </div>
     </foreignObject>
  )
}

const CustomTick5X = (tick: AxisTickProps<string>) => {

  return (
    <foreignObject
      width={80}
      height={90}
      transform={`translate(${tick.x - 40},${tick.y})`}
    >
      <div stlye={{justifyContent:"center"}}>
        <Typography style={{textAlign:"center",
                             color: '#ff9800',
                            fontWeight:800,
                            fontSize:"2vh",
                            height:60,
                            marginTop:5,
                            letterSpacing:"-1px"}}>
          {tick.value}
        </Typography>
      </div>
    </foreignObject>
  );
}


const CustomSymbol = ({ size, color, borderWidth, borderColor }) => (
  <g>
      <circle fill="#fff" r={size / 2} strokeWidth={borderWidth} stroke={borderColor} />
      <circle
          r={size / 5}
          strokeWidth={borderWidth}
          stroke={borderColor}
          fill={color}
          fillOpacity={0.35}
      />
  </g>
)
 return (
    <Grid>
            <Grid container style={{marginTop: "9vh"}}>
            <Grid item xs={4}>
            <Grid
              container
              justifyContent="center"
              spacing={"1"}
               
            >
                    <Grid
                      item
                      xs={6}
                      align="center"           
                    >
                      <div className={classes.cardG} data-tip data-for={"Pcs-Produced"}>
                        <Grid container>
                          <Grid item xs={10}>
                            <Typography className={classes.labelHeaderG}>
                              {"Pcs Produced"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container style={{marginTop:"2rem"}}>
                          <Grid item xs={4}>
                            </Grid>
                            <Grid item xs={8}>
                            {topCards.TOT_PCS.value!= null ? (
                                <CountUp
                                  start={topCardsH.TOT_PCS.value}
                                  end={topCards.TOT_PCS.value}
                                  duration={.6}
                                  separator={","}
                                  className={classes.topRightG}
                                />
                              ) :    
                              <CountUp
                              start={0}
                              end={5000}
                              duration={.6}
                              separator={","}
                              className={classes.topRightG}
                            />}
                            </Grid>
                        </Grid>
                          </div>
                          {topCards.TOT_PCS.tooltip!=null?
                          <ReactTooltip id={"Pcs-Produced"} effect={"solid"} place={"bottom"} delayShow={"350"} backgroundColor={"#eefef1"}>
                            {topCards.TOT_PCS.tooltip.slice(0,10).map((item) =>
                            <Grid container>
                              <Grid item xs={10}>
                                <Typography style={{color:"#000",textAlign:"left",width:"12vw"}}>{item.label}</Typography>    
                              </Grid>
                              <Grid item xs={2}>
                                <Typography style={{color:"#000",textAlign:"right",fontWeight:"bold"}}>{item.frequency}</Typography>    
                              </Grid>
                              </Grid>
                            )}
                            </ReactTooltip>:null}
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      align="center"
                      
                    >
                      <div className={classes.cardB} data-tip data-for={"OK-Pieces"}>
                      <Grid container>
                          <Grid item xs={10}>
                            <Typography className={classes.labelHeaderB}>
                              {"OK Pieces"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container style={{marginTop:"2rem"}}>
                          <Grid item xs={4}>
                            </Grid>
                            <Grid item xs={8}>
                            {topCards.OK_PIECES.value != null ? (
                                <CountUp
                                  start={topCardsH.OK_PIECES.value}
                                  end={topCards.OK_PIECES.value}
                                  duration={.6}
                                  separator={","}
                                  className={classes.topRightB}
                                />
                              ) :    
                              <CountUp
                              start={0}
                              end={5000}
                              duration={.6}
                              separator={","}
                              className={classes.topRightB}
                            />}
                            </Grid>
                        </Grid>
                      </div>
                      {topCards.OK_PIECES.tooltip!=null?
                          <ReactTooltip id={"OK-Pieces"} effect={"solid"} place={"bottom"} delayShow={"350"} backgroundColor={"#edf3ff"}>
                            {topCards.OK_PIECES.tooltip.slice(0,10).map((item) =>
                            <Grid container>
                              <Grid item xs={10}>
                                <Typography style={{color:"#000",textAlign:"left",width:"12vw"}}>{item.label}</Typography>    
                              </Grid>
                              <Grid item xs={2}>
                                <Typography style={{color:"#000",textAlign:"right",fontWeight:"bold"}}>{item.frequency}</Typography>    
                              </Grid>
                              </Grid>
                            )}
                            </ReactTooltip>:null}
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      align="center"
                      
                    >
                      <div className={classes.cardY} data-tip data-for={"Rectified-Pcs"}>
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
                            {topCards.ALTERED_PIECES.value != null ? (
                                <CountUp
                                  start={topCardsH.ALTERED_PIECES.value}
                                  end={topCards.ALTERED_PIECES.value}
                                  duration={.6}
                                  separator={","}
                                  className={classes.topRightY}
                                />
                              ) :    
                              <CountUp
                              start={0}
                              end={5000}
                              duration={.6}
                              separator={","}
                              className={classes.topRightY}
                            />}
                            </Grid>
                        </Grid>
                      </div>
                            {topCards.ALTERED_PIECES.tooltip!=null?
                          <ReactTooltip id={"Rectified-Pcs"} effect={"solid"} place={"bottom"} delayShow={"350"} backgroundColor={"#fffce6"}>
                            {topCards.ALTERED_PIECES.tooltip.slice(0,10).map((item) =>
                            <Grid container>
                              <Grid item xs={10}>
                                <Typography style={{color:"#000",textAlign:"left",width:"12vw"}}>{item.label}</Typography>    
                              </Grid>
                              <Grid item xs={2}>
                                <Typography style={{color:"#000",textAlign:"right",fontWeight:"bold"}}>{item.frequency}</Typography>    
                              </Grid>
                              </Grid>
                            )}
                            </ReactTooltip>:null}
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      align="center"
                      
                    >
                      <div className={classes.cardR} data-tip data-for={"Rejected-Pcs"}>
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
                            {topCards.REJECTED_PIECES.value != null ? (
                                <CountUp
                                  start={topCardsH.REJECTED_PIECES.value}
                                  end={topCards.REJECTED_PIECES.value}
                                  duration={.6}
                                  separator={","}
                                  className={classes.topRightR}
                                />
                              ) :    
                              <CountUp
                              start={0}
                              end={5000}
                              duration={.6}
                              separator={","}
                              className={classes.topRightR}
                            />}
                            </Grid>
                        </Grid>
                      </div>
                        {topCards.REJECTED_PIECES.tooltip!=null?
                          <ReactTooltip id={"Rejected-Pcs"} effect={"solid"} place={"bottom"} delayShow={"350"} backgroundColor={"#fff0f5"}>
                            {topCards.REJECTED_PIECES.tooltip.slice(0,10).map((item) =>
                            <Grid container>
                              <Grid item xs={10}>
                                <Typography style={{color:"#000",textAlign:"left",width:"12vw"}}>{item.label}</Typography>    
                              </Grid>
                              <Grid item xs={2}>
                                <Typography style={{color:"#000",textAlign:"right",fontWeight:"bold"}}>{item.frequency}</Typography>    
                              </Grid>
                              </Grid>
                            )}
                            </ReactTooltip>:null}
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      align="center"
                      
                    >
                      <div className={classes.cardY} data-tip data-for={"null"}>
                      <Grid container>
                          <Grid item xs={11}>
                            <Typography className={classes.labelHeaderYX}>
                              {"Rework %"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container style={{marginTop:20}}>
                          <Grid item xs={2}>
                            </Grid>
                            <Grid item xs={10}>
                            {topCards.NO_OF_DEFECTS.value != null ? (
                                <CountUp
                                  start={(topCardsH.PCS_IN_ALTERATION+topCardsH.ALTERED_PIECES.value)*100/topCardsH.TOT_PCS.value}
                                  end={(topCards.PCS_IN_ALTERATION+topCards.ALTERED_PIECES.value)*100/topCards.TOT_PCS.value}
                                  duration={.6}
                                  separator={","}
                                  decimals={2}
                                  suffix={"%"}
                                  className={classes.topRightYX}
                                />
                              ) :    
                              <CountUp
                              start={0}
                              end={0}
                              duration={.6}
                              decimals={2}
                              suffix={"%"}
                              className={classes.topRightR}
                            />}
                            </Grid>
                        </Grid>
                      </div>
                      {topCards.REJECTED_PIECES.defects!=null?
                          <ReactTooltip id={"Rejected-%"} effect={"solid"} place={"bottom"} delayShow={"350"} backgroundColor={"#fff0f5"}>
                            {topCards.REJECTED_PIECES.defects.slice(0,10).map((item) =>
                            <Grid container>
                              <Grid item xs={10}>
                                <Typography style={{color:"#000",textAlign:"left",width:"12vw"}}>{item.label}</Typography>    
                              </Grid>
                              <Grid item xs={2}>
                                <Typography style={{color:"#000",textAlign:"right",fontWeight:"bold"}}>{item.frequency}</Typography>    
                              </Grid>
                              </Grid>
                            )}
                            </ReactTooltip>:null}
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      align="center"
                      
                    >
                      <div className={classes.cardO}  data-tip data-for={"DHU-%"}>
                      <Grid container>
                          <Grid item xs={8}>
                            <Typography className={classes.labelHeaderO}>
                              {"DHU %"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container style={{marginTop:20}}>
                          <Grid item xs={2}>
                            </Grid>
                            <Grid item xs={10}>
                            {topCards.NO_OF_DEFECTS.value != null ? (
                                <CountUp
                                  start={topCardsH.NO_OF_DEFECTS.value*100/topCardsH.NO_OF_PCS}
                                  end={topCards.NO_OF_DEFECTS.value*100/topCards.NO_OF_PCS}
                                  duration={.6}
                                  separator={","}
                                  decimals={2}
                                  suffix={"%"}
                                  className={classes.topRightO}
                                />
                              ) :    
                              <CountUp
                              start={0}
                              end={0}
                              duration={.6}
                              decimals={2}
                              suffix={"%"}
                              className={classes.topRightO}
                            />}
                            </Grid>
                        </Grid>
                      </div>
                      {topCards.NO_OF_DEFECTS.tooltip!=null?
                          <ReactTooltip id={"DHU-%"} effect={"solid"} place={"bottom"} delayShow={"350"} backgroundColor={"#fffce6"}>
                            {topCards.NO_OF_DEFECTS.tooltip.slice(0,10).map((item) =>
                            <Grid container>
                              <Grid item xs={10}>
                                <Typography style={{color:"#000",textAlign:"left",width:"16vw"}}>{item.label}</Typography>    
                              </Grid>
                              <Grid item xs={2}>
                                <Typography style={{color:"#000",textAlign:"right",fontWeight:"bold"}}>{item.frequency}</Typography>    
                              </Grid>
                              </Grid>
                            )}
                            </ReactTooltip>:null}
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      align="center"
                      
                    >
                      <div className={classes.cardR} data-tip data-for={"Rejected-%"}>
                      <Grid container>
                          <Grid item xs={11}>
                            <Typography className={classes.labelHeaderR}>
                              {"Rejected %"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container style={{marginTop:20}}>
                          <Grid item xs={2}>
                            </Grid>
                            <Grid item xs={10}>
                            {topCards.REJECTED_PIECES != null ? (
                                <CountUp
                                  start={topCardsH.REJECTED_PIECES.value*100/topCardsH.NO_OF_PCS}
                                  end={topCards.REJECTED_PIECES.value*100/topCards.NO_OF_PCS}
                                  duration={.6}
                                  separator={","}
                                  decimals={2}
                                  suffix={"%"}
                                  className={classes.topRightRA}
                                />
                              ) :    
                              <CountUp
                              start={0}
                              end={0}
                              duration={.6}
                              decimals={2}
                              suffix={"%"}
                              className={classes.topRightRA}
                            />}
                            </Grid>
                        </Grid>
                      </div>
                      {topCards.REJECTED_PIECES.defects!=null?
                          <ReactTooltip id={"Rejected-%"} effect={"solid"} place={"bottom"} delayShow={"350"} backgroundColor={"#fff0f5"}>
                            {topCards.REJECTED_PIECES.defects.slice(0,10).map((item) =>
                            <Grid container>
                              <Grid item xs={10}>
                                <Typography style={{color:"#000",textAlign:"left",width:"12vw"}}>{item.label}</Typography>    
                              </Grid>
                              <Grid item xs={2}>
                                <Typography style={{color:"#000",textAlign:"right",fontWeight:"bold"}}>{item.frequency}</Typography>    
                              </Grid>
                              </Grid>
                            )}
                            </ReactTooltip>:null}
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
        {(age=="All"&& graphData.allPieces!=null)?
              <ResponsiveBar
              data={graphData.allPieces}
              keys={[ 'Ok Pieces',"Altered Pieces","Rejected Pieces" ]}
              indexBy="vendor"
              margin={{ top: 10, right: 30, bottom: 60, left: 0 }}
                  padding={0.6}
                      
              height={height/2.5}
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
                    anchor: 'top-right',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 120,
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
          />:(age=="Ok" && graphData.okPieces!=null)?
        <ResponsiveBar
          data={graphData.okPieces}
          keys={[ 'Ok Pieces' ]}
          indexBy="vendor"
          margin={{ top: 10, right: 30, bottom: 60, left: 0 }}
              padding={0.6}
              height={height/2.5}
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
                anchor: 'top',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 120,
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
        />:(age=="Alter"&& graphData.okPieces!=null)?
          <ResponsiveBar
          data={graphData.alteredPieces}
          keys={["Altered Pieces" ]}
          indexBy="vendor"
          margin={{ top: 10, right: 30, bottom: 60, left: 0 }}
              padding={0.6}
              height={height/2.5}
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
                anchor: 'top',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 120,
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
        />:(age=="" && graphData.producedPieces!=null)?
        <ResponsiveBar
        data={graphData.producedPieces}
        keys={[ 'Produced Pieces' ]}
        indexBy="vendor"
        margin={{ top: 10, right: 30, bottom: 60, left: 0 }}
              padding={0.6}
              height={height/2.5}
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
                anchor: 'top',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 120,
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
        />:(age=="Rejected" && graphData.rejectedPieces!=null)?
        <ResponsiveBar
        data={graphData.rejectedPieces}
        keys={[ 'Rejected Pieces' ]}
        indexBy="vendor"
        margin={{ top: 10, right: 30, bottom: 60, left: 0 }}
        padding={0.6}
        height={height/2.5}
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
            anchor: 'top',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 120,
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
        />: (age=="DHU"&& graphData.dhu!=null)?
        <ResponsiveBar
        data={graphData.dhu}
        keys={[ 'DHU' ]}
        indexBy="vendor"
        margin={{ top: 10, right: 30, bottom: 60, left: 0 }}
            padding={0.6}
                      
            height={height/2.5}
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
              anchor: 'top',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 120,
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
        markers={[
          {
              axis:              'y',
              position:          'right',
              value:             5, // set value accroding to need
              lineStyle:         {stroke: '#ff000088', strokeWidth: 2, strokeDasharray: 4},
              legendOrientation: 'horizontal',
              textStyle:         {fill: 'orange', fontWeight: 'bold'}
          },
      ]}
        />:null
        }
        </div>
        </Grid>
        
        <Grid container style={{marginTop: 15}}>
        <div className={classes.graph2}
              style={{backgroundColor:age==""?"#eefef1":age=="Ok"?"#edf3ff":age=="Alter"?"#fffce6":age=="Rejected"?"#fff0f5":age=="DHU"?"#ffedd9":age=="All"?"#edf3ff":"#fff"}}
                      >
                        
                        {lineGraph.producedPieces && (age == "" || age == "All") ?
                        <ResponsiveLine
                                //data={[{id: "value", color: "hsl(64, 70%, 50%)", data: age==""?lineGraph.producedPieces:age=="Ok"?lineGraph.okPieces:age=="Alter"?lineGraph.alteredPieces:age=="Rejected"?lineGraph.rejectedPieces:age=="DHU"?lineGraph.dhu : []}]}
                              data ={[{id: "value", color: "hsl(64, 70%, 50%)", data: data}]}
                              //  indexBy="vendor"
                                curve='linear'
                                theme={{
                                  dots: {
                                      text: {
                                          fill: '#25be31',
                                          font:"Work",
                                          fontSize:"1.7vh",
                                      },
                                  },
                              }}
                              // height={height/3.5}
                                margin={{ top: 30, right: 45, bottom: 30, left: 45 }}
                                xScale={{ type: 'point' }}
                                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
                                // yFormat=" >-.2f"
                                enablePointLabel={true}
                                // pointLabel={{renderLabel:CustomTick2X}}
                                axisTop={null}
                                axisRight={null}
                                axisLeft={null}
                                axisBottom={{renderTick:CustomTickX}}
                                pointSymbol={CustomSymbol}
                                pointSize={15}
                                pointColor="#25be31"
                                pointBorderWidth={1}
                                colors="#25be31"
                                pointBorderColor={{ from: 'serieColor' }}
                                enableCrosshair={false}
                                pointLabelYOffset={-12}
                                lineWidth={4}
                                tooltip={false}
                                // tooltip={(input) => {
                                //     return (
                                //     <div style={{whiteSpace: 'pre', backgroundColor: 'white', border: `2px solid ${col}`, borderRadius: 5, padding: 5, backgroundColor: '#ffaa0088'}}>
                                //       {input.point.data.l}
                                //     </div>
                                //   )}}
                                enableGridX={false}
                                enableGridY={false}
                                enableArea={true}
                                areaOpacity={0.2}
                                useMesh={false}
                                animate={true}
                                borderColor="#ffffffff"
                            />
                            : (age=="Ok"&& lineGraph.okPieces)?
                                  <ResponsiveLine
                                  //data={[{id: "value", color: "hsl(64, 70%, 50%)", data: age==""?lineGraph.producedPieces:age=="Ok"?lineGraph.okPieces:age=="Alter"?lineGraph.alteredPieces:age=="Rejected"?lineGraph.rejectedPieces:age=="DHU"?lineGraph.dhu : []}]}
                                data ={[{id: "value", color: "hsl(64, 70%, 50%)", data: data}]}
                                //  indexBy="vendor"
                                  curve='linear'
                                  theme={{
                                    dots: {
                                        text: {
                                            fill: "#6ea1ff",
                                            font:"Work",
                                            fontSize:"1.7vh",
                                        },
                                    },
                                }}
                                         margin={{ top: 30, right: 45, bottom: 30, left: 45 }}
                                  xScale={{ type: 'point' }}
                                  yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                                  // yFormat=" >-.2f"
                                  enablePointLabel={true}
                                  // pointLabel={{renderLabel:CustomTick2X}}
                                  axisTop={null}
                                  axisRight={null}
                                  axisLeft={null}
                                  axisBottom={{renderTick:CustomTick2X}}
                                  pointSymbol={CustomSymbol}
                                  pointSize={15}
                                  pointColor="#6ea1ff"
                                  pointBorderWidth={1}
                                  colors="#6ea1ff"
                                  pointBorderColor={{ from: 'serieColor' }}
                                  enableCrosshair={false}
                                  pointLabelYOffset={-12}
                                  lineWidth={4}
                                  tooltip={false}
                                  // tooltip={(input) => {
                                  //     return (
                                  //     <div style={{whiteSpace: 'pre', backgroundColor: 'white', border: `2px solid ${col}`, borderRadius: 5, padding: 5, backgroundColor: '#ffaa0088'}}>
                                  //       {input.point.data.l}
                                  //     </div>
                                  //   )}}
                                  enableGridX={false}
                                  enableGridY={false}
                                  enableArea={true}
                                  areaOpacity={0.2}
                                  useMesh={false}
                                  animate={true}
                                  borderColor="#ffffffff"
                              />:(age=="Alter"&& lineGraph.okPieces)?
                                  <ResponsiveLine
                                  //data={[{id: "value", color: "hsl(64, 70%, 50%)", data: age==""?lineGraph.producedPieces:age=="Ok"?lineGraph.okPieces:age=="Alter"?lineGraph.alteredPieces:age=="Rejected"?lineGraph.rejectedPieces:age=="DHU"?lineGraph.dhu : []}]}
                                data ={[{id: "value", color: "hsl(64, 70%, 50%)", data: data}]}
                                //  indexBy="vendor"
                                  curve='linear'
                                         margin={{ top: 30, right: 45, bottom: 30, left: 45 }}
                                  xScale={{ type: 'point' }}
                                  yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                                  // yFormat=" >-.2f"
                                  theme={{
                                    dots: {
                                        text: {
                                            fill: "#ffe949",
                                            font:"Work",
                                            fontSize:"1.7vh",
                                        },
                                    },
                                }}
                                  enablePointLabel={true}
                                  // pointLabel={{renderLabel:CustomTick2X}}
                                  axisTop={null}
                                  axisRight={null}
                                  axisLeft={null}
                                  axisBottom={{renderTick:CustomTick3X}}
                                  pointSymbol={CustomSymbol}
                                  pointSize={15}
                                  pointColor="#ffe949"
                                  pointBorderWidth={1}
                                  colors="#ffe949"
                                  pointBorderColor={{ from: 'serieColor' }}
                                  enableCrosshair={false}
                                  pointLabelYOffset={-12}
                                  lineWidth={4}
                                  tooltip={false}
                                  // tooltip={(input) => {
                                  //     return (
                                  //     <div style={{whiteSpace: 'pre', backgroundColor: 'white', border: `2px solid ${col}`, borderRadius: 5, padding: 5, backgroundColor: '#ffaa0088'}}>
                                  //       {input.point.data.l}
                                  //     </div>
                                  //   )}}
                                  enableGridX={false}
                                  enableGridY={false}
                                  enableArea={true}
                                  areaOpacity={0.2}
                                  useMesh={false}
                                  animate={true}
                                  borderColor="#ffffffff"
                              />:(age=="Rejected"&& lineGraph.okPieces)?
                                    <ResponsiveLine
                                    //data={[{id: "value", color: "hsl(64, 70%, 50%)", data: age==""?lineGraph.producedPieces:age=="Ok"?lineGraph.okPieces:age=="Alter"?lineGraph.alteredPieces:age=="Rejected"?lineGraph.rejectedPieces:age=="DHU"?lineGraph.dhu : []}]}
                                  data ={[{id: "value", color: "hsl(64, 70%, 50%)", data: data}]}
                                  //  indexBy="vendor"
                                    curve='linear'
                                    theme={{
                                      dots: {
                                          text: {
                                              fill: '#ed5269',
                                              font:"Work",
                                              fontSize:"1.7vh",
                                          },
                                      },
                                  }}
                                           margin={{ top: 30, right: 45, bottom: 30, left: 45 }}
                                    xScale={{ type: 'point' }}
                                    yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                                    // yFormat=" >-.2f"
                                    enablePointLabel={true}
                                    // pointLabel={{renderLabel:CustomTick2X}}
                                    axisTop={null}
                                    axisRight={null}
                                    axisLeft={null}
                                    axisBottom={{renderTick:CustomTick4X}}
                                    pointSymbol={CustomSymbol}
                                    pointSize={15}
                                    pointColor="#ed5269"
                                    pointBorderWidth={1}
                                    colors="#ed5269"
                                    pointBorderColor={{ from: 'serieColor' }}
                                    enableCrosshair={false}
                                    pointLabelYOffset={-12}
                                    lineWidth={4}
                                    tooltip={false}
                                    // tooltip={(input) => {
                                    //     return (
                                    //     <div style={{whiteSpace: 'pre', backgroundColor: 'white', border: `2px solid ${col}`, borderRadius: 5, padding: 5, backgroundColor: '#ffaa0088'}}>
                                    //       {input.point.data.l}
                                    //     </div>
                                    //   )}}
                                    enableGridX={false}
                                    enableGridY={false}
                                    enableArea={true}
                                    areaOpacity={0.2}
                                    useMesh={false}
                                    animate={true}
                                    borderColor="#ffffffff"
                                />:(age=="DHU"&& lineGraph.okPieces)?
                                      <ResponsiveLine
                                      //data={[{id: "value", color: "hsl(64, 70%, 50%)", data: age==""?lineGraph.producedPieces:age=="Ok"?lineGraph.okPieces:age=="Alter"?lineGraph.alteredPieces:age=="Rejected"?lineGraph.rejectedPieces:age=="DHU"?lineGraph.dhu : []}]}
                                    data ={[{id: "value", color: "hsl(64, 70%, 50%)", data: data}]}
                                    //  indexBy="vendor"
                                      curve='linear'
                                      theme={{
                                        dots: {
                                            text: {
                                                fill: '#ff9800',
                                                font:"Work",
                                                fontSize:"1.7vh",
                                            },
                                        },
                                    }}
                                             margin={{ top: 30, right: 45, bottom: 30, left: 45 }}
                                      xScale={{ type: 'point' }}
                                      yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                                      yFormat=" >-.2f"
                                      enablePointLabel={true}
                                      // pointLabel={{renderLabel:CustomTick2X}}
                                      axisTop={null}
                                      axisRight={null}
                                      axisLeft={null}
                                      axisBottom={{renderTick:CustomTick5X}}
                                      pointSymbol={CustomSymbol}
                                      pointSize={15}
                                      pointColor="#ff9800"
                                      pointBorderWidth={1}
                                      colors="#ff9800"
                                      pointBorderColor={{ from: 'serieColor' }}
                                      enableCrosshair={false}
                                      pointLabelYOffset={-12}
                                      lineWidth={4}
                                      tooltip={false}
                                      // tooltip={(input) => {
                                      //     return (
                                      //     <div style={{whiteSpace: 'pre', backgroundColor: 'white', border: `2px solid ${col}`, borderRadius: 5, padding: 5, backgroundColor: '#ffaa0088'}}>
                                      //       {input.point.data.l}
                                      //     </div>
                                      //   )}}
                                      enableGridX={false}
                                      enableGridY={false}
                                      enableArea={true}
                                      areaOpacity={0.2}
                                      useMesh={false}
                                      animate={true}
                                      borderColor="#ffffffff"
                                      markers={[
                                        {
                                            axis:              'y',
                                            position:          'right',
                                            value:             5, // set value accroding to need
                                            lineStyle:         {stroke: '#ff000088', strokeWidth: 2, strokeDasharray: 4},
                                            legendOrientation: 'horizontal',
                                            textStyle:         {fill: 'orange', fontWeight: 'bold'}
                                        },
                                    ]}
                                  />:null}
                            {/* {lineGraph.producedPieces && age === "All" ?
                        <ResponsiveLine
                              //  data={[{id: "Ok Pieces", color: "blue", data: lineGraph.okPieces},{id: "Altered Pieces", color: "red", data: lineGraph.alteredPieces},{id: "Rejected Pieces", color: "green", data: lineGraph.rejectedPieces}]}
                                data={data}
                              //  indexBy="vendor"
                                curve='monotoneX'
                                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                                xScale={{ type: 'point' }}
                                yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
                                yFormat=" >-.2f"
                                enablePointLabel={true}
                                axisTop={null}
                                axisRight={null}
                                axisLeft={null}
                                axisBottom={{
                                    orient: 'bottom',
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: -33,
                                    legendOffset: 36,
                                    legendPosition: 'middle'
                                }}
                                pointSize={8}
                              //  pointColor={["#6ea1ff","#ffe949","#ed5269"]}
                                pointBorderWidth={2}
                                colors={["#6ea1ff","#ffe949","#ed5269"]}
                                pointBorderColor={{ from: 'serieColor' }}
                                enableCrosshair={false}
                                pointLabelYOffset={-12}
                                lineWidth={4}
                                // tooltip={(input) => {
                                //     return (
                                //     <div style={{whiteSpace: 'pre', backgroundColor: 'white', border: `2px solid ${col}`, borderRadius: 5, padding: 5, backgroundColor: '#ffaa0088'}}>
                                //       {input.point.data.l}
                                //     </div>
                                //   )}}
                                enableGridX={false}
                                enableGridY={false}
                                enableArea={true}
                                areaOpacity={0.2}
                                useMesh={false}
                                animate={true}
                                borderColor="#ffffffff"
                            />
                            : null} */}
                      </div>
            <Grid item xs={4}>
            <Grid
              container
              justifyContent="center"
              spacing={2}
              // style={{ margin: 16 }}
            >
                    <Grid
                      item
                      xs={12}
                      align="center"
                      onClick={()=>{setAuditTable(true)}}
                    >
                      <div className={classes.cardCB} >
                        <Grid container>
                          <Grid item xs={3}>
                            <Typography className={classes.labelHeaderCB}>
                              {"Audits"}
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography className={classes.labelHeaderCBX}>
                              {"Total"}
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography className={classes.labelHeaderGX}>
                              {"Pass"}
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography className={classes.labelHeaderRX}>
                              {"Fail"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                          <Grid item xs={3}>
                            </Grid>
                            <Grid item xs={3}>
                            {topCards.AUDITS_DONE.value != null ? (
                              <div style={{justifyContent:"space-between"}}>
                                 <CountUp
                                  start={topCardsH.AUDITS_DONE.value}
                                  end={topCards.AUDITS_DONE.value}
                                  duration={.6}
                                  separator={","}
                                  className={classes.topRightCB}
                                />
                            </div>
                              ) :    
                              <CountUp
                              start={0}
                              end={0}
                              duration={.6}
                              separator={","}
                              className={classes.topRightCB}
                            />}
                            </Grid>
                            <Grid item xs={3}>
                            {topCards.AUDITS_PASSED != null ? (
                              <div style={{justifyContent:"space-between"}}>
                                 <CountUp
                                  start={topCardsH.AUDITS_PASSED}
                                  end={topCards.AUDITS_PASSED}
                                  duration={.6}
                                  separator={","}
                                  className={classes.topRightGX}
                                />
                            </div>
                              ) :    
                              <CountUp
                              start={0}
                              end={0}
                              duration={.6}
                              separator={","}
                              className={classes.topRightGX}
                            />}
                            </Grid>
                            <Grid item xs={3}>
                            {topCards.AUDITS_FAILED != null ? (
                              <div style={{justifyContent:"space-between"}}>
                                 <CountUp
                                  start={topCardsH.AUDITS_FAILED}
                                  end={topCards.AUDITS_FAILED}
                                  duration={.6}
                                  separator={","}
                                  className={classes.topRightRX}
                                />
                            </div>
                              ) :    
                              <CountUp
                              start={0}
                              end={0}
                              duration={.6}
                              separator={","}
                              className={classes.topRightRX}
                            />}
                            </Grid>
                        </Grid>
                          </div>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      align="center"
                      
                    >
                      <div className={classes.cardCG}>
                        <Grid container>
                          <Grid item xs={3}>
                            <Typography className={classes.labelHeaderCG}>
                              {"Active Vendors"}
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography className={classes.labelHeaderCG}>
                            {"Inactive Vendors"}
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography className={classes.labelHeaderCG}>
                              {"Active Lines"}
                            </Typography>
                          </Grid>
                          <Grid item xs={3}>
                            <Typography className={classes.labelHeaderCG}>
                              {"Inactive Lines"}
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid container>
                        <Grid item xs={3}>
                            {topCards.ACTIVE_VENDORS != null ? (
                              <div style={{justifyContent:"space-between"}}>
                                 <CountUp
                                  start={topCardsH.ACTIVE_VENDORS}
                                  end={topCards.ACTIVE_VENDORS}
                                  duration={.6}
                                  separator={","}
                                  className={classes.topRightCG}
                                />
                            </div>
                              ) :    
                              <CountUp
                              start={0}
                              end={0}
                              duration={.6}
                              separator={","}
                              className={classes.topRightCG }
                            />}
                            </Grid>
                            <Grid item xs={3}>
                            {topCards.INACTIVE_VENDORS != null ? (
                              <div style={{justifyContent:"space-between"}}>
                                 <CountUp
                                  start={topCardsH.INACTIVE_VENDORS}
                                  end={topCards.INACTIVE_VENDORS}
                                  duration={.6}
                                  separator={","}
                                  className={classes.topRightCG}
                                />
                            </div>
                              ) :    
                              <CountUp
                              start={0}
                              end={0}
                              duration={.6}
                              separator={","}
                              className={classes.topRightCG }
                            />}
                            </Grid>
                            <Grid item xs={3}>
                            {topCards.ACTIVE_LINES != null ? (
                              <div style={{justifyContent:"space-between"}}>
                                 <CountUp
                                  start={topCardsH.ACTIVE_LINES}
                                  end={topCards.ACTIVE_LINES}
                                  duration={.6}
                                  separator={","}
                                  className={classes.topRightCG}
                                />
                            </div>
                              ) :    
                              <CountUp
                              start={0}
                              end={0}
                              duration={.6}
                              separator={","}
                              className={classes.topRightCG }
                              
                            />
                            }
                            </Grid>
                            <Grid item xs={3}>
                            {topCards.INACTIVE_LINES != null ? (
                              <div style={{justifyContent:"space-between"}}>
                                 <CountUp
                                  start={topCardsH.INACTIVE_LINES}
                                  end={topCards.INACTIVE_LINES}
                                  duration={.6}
                                  separator={","}
                                  className={classes.topRightCG}
                                />
                            </div>
                              ) :    
                              <CountUp
                              start={0}
                              end={0}
                              duration={.6}
                              separator={","}
                              className={classes.topRightCG }
                            />}
                            </Grid>
                        </Grid>
                          </div>
                    </Grid>
                

                  </Grid>
                </Grid>
        </Grid>
        </Grid>
  );
}
