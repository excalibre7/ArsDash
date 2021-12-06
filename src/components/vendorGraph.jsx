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
    fontSize: "2.8vh",
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
    fontSize: 22,
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
    fontSize: 25,
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
    fontSize: 22,
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
    fontSize: 20,
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
    fontSize: 22,
    fontFamily: "Work",
    margin: 2,
    padding: 2,
    color: "#036e67",
    fontWeight:800,
    textAlign:"center",
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
    fontSize: "3.1vh",
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
  labelHeaderRX: {
    fontSize: 23,
    fontFamily: "Work",
    margin: 2,
    padding: 2,
    color: "#ff0025",
    fontWeight:800,
    textAlign:"center",
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
    height: "48vh" ,
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
    fontSize: "3vw",
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
    fontSize: 40 ,
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
    fontSize: 40 ,
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
    fontSize: "3vw",
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
  topRightO: {
    fontSize: "3vw",
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
  const { topCards, topCardsH, age, handleChange, graphData, lineGraph} = props;
  const classes = useStyles();

  useEffect(() =>{
    if(age !== "All")
    {
    let temp = [], start =0, end = 0;
    switch(age)
    {
      case "": temp =  lineGraph.producedPieces; break;
      case "Ok" : temp = lineGraph.okPieces;break;
      case "Alter" : temp = lineGraph.alteredPieces;break;
      case "Rejected" : temp = lineGraph.rejectedPieces;break;
      case "DHU" : temp = lineGraph.dhu;break;
    }
     if(age === "DHU")
     {
       for(let i = 0; i < lineGraph.dhu.length; i++)
       {
         temp[i].y = parseFloat(temp[i].y)  * 100;
       }
     }
     console.log("new temp is!!!!!!!!!!!", temp);
      if(temp)
      {
      for(let i = 0; i < temp.length; i++)
      {
        if(parseInt(temp[i].y) !== 0 )
        {
          start = i;
          break;
        }
      }
      for(let i = temp.length - 1; i >= 0; i--)
      {
        if(parseInt(temp[i].y) !== 0 )
        {
          end = i + 1;
          break;
        }
      }
      setData(temp.slice(start, end));
      }
    }
  else{
    let start = 0, end = 0;
    if(lineGraph.okPieces)
    {
    for(let i = 0; i < lineGraph.okPieces.length; i++)
    {
      if(parseInt(lineGraph.okPieces[i].y) !== 0 )
      {
        start = i;
        break;
      }
    }
    for(let i = 0; i < lineGraph.alteredPieces.length; i++)
    {
      if(parseInt(lineGraph.alteredPieces[i].y) !== 0 )
      {
        if(i < start){
        start = i;
        }
        break;
      }
    }
    for(let i = 0; i < lineGraph.rejectedPieces.length; i++)
    {
      if(parseInt(lineGraph.rejectedPieces[i].y) !== 0 )
      {
        if(i < start){
        start = i;
        }
        break;
      }
    }
    for(let i = lineGraph.okPieces.length - 1; i >= 0; i--)
    {
      if(parseInt(lineGraph.okPieces[i].y) !== 0 )
      {
        end = i;
        break;
      }
    }
    for(let i = lineGraph.alteredPieces.length - 1; i >= 0; i--)
    {
      if(parseInt(lineGraph.alteredPieces[i].y) !== 0 )
      {
        if(i > end){
        end = i;
        }
        break;
      }
    }
    for(let i = lineGraph.rejectedPieces.length - 1; i >= 0; i--)
    {
      if(parseInt(lineGraph.rejectedPieces[i].y) !== 0 )
      {
        if(i > end){
        end = i;
        }
        break;
      }
    }
    }
    setData([{id: "Ok Pieces", color: 'red', data: lineGraph.okPieces.slice(start, end + 1)},{id: "Altered Pieces", color: 'blue', data: lineGraph.alteredPieces.slice(start, end + 1)},{id: "Rejected Pieces", color: 'green', data: lineGraph.rejectedPieces.slice(start, end + 1)}])
  }
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


  return (
    <Grid>
            <Grid container style={{marginTop: 80}}>
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
                            {topCards.TOT_PCS != null ? (
                                <CountUp
                                  start={topCardsH.TOT_PCS}
                                  end={topCards.TOT_PCS}
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
                                  start={topCardsH.OK_PIECES}
                                  end={topCards.OK_PIECES}
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
                                  start={topCardsH.ALTERED_PIECES}
                                  end={topCards.ALTERED_PIECES}
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
                                  start={topCardsH.REJECTED_PIECES}
                                  end={topCards.REJECTED_PIECES}
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
                                  start={topCardsH.REJECTED_PIECES*100/topCardsH.NO_OF_PCS}
                                  end={topCards.REJECTED_PIECES*100/topCards.NO_OF_PCS}
                                  duration={.6}
                                  separator={","}
                                  decimals={2}
                                  suffix={"%"}
                                  className={classes.topRightR}
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
                                  start={topCardsH.NO_OF_DEFECTS*100/topCardsH.NO_OF_PCS}
                                  end={topCards.NO_OF_DEFECTS*100/topCards.NO_OF_PCS}
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
          />:(age=="Ok" && graphData.okPieces!=null)?
        <ResponsiveBar
          data={graphData.okPieces}
          keys={[ 'Ok Pieces' ]}
          indexBy="vendor"
          margin={{ top: 10, right: 30, bottom: 60, left: 0 }}
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
        />:null
        }
        </div>
        </Grid>
        
        <Grid container style={{marginTop: 15}}>
        <div className={classes.graph2}
              style={{backgroundColor:age==""?"#eefef1":age=="Ok"?"#edf3ff":age=="Alter"?"#fffce6":age=="Rejected"?"#fff0f5":age=="DHU"?"#ffedd9":age=="All"?"#edf3ff":"#fff"}}
                      >
                        {lineGraph.producedPieces && age !== "All" ?
                        <ResponsiveLine
                                //data={[{id: "value", color: "hsl(64, 70%, 50%)", data: age==""?lineGraph.producedPieces:age=="Ok"?lineGraph.okPieces:age=="Alter"?lineGraph.alteredPieces:age=="Rejected"?lineGraph.rejectedPieces:age=="DHU"?lineGraph.dhu : []}]}
                              data ={[{id: "value", color: "hsl(64, 70%, 50%)", data: data}]}
                              //  indexBy="vendor"
                                curve='monotoneX'
                                margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
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
                                pointColor={[age==""?"#25be31":age=="Ok"?"#6ea1ff":age=="Alter"?"#ffe949":age=="Rejected"?"#ed5269":age=="DHU"?"#ff9800": "#ffffff"]}
                                pointBorderWidth={2}
                                colors={[age==""?"#25be31":age=="Ok"?"#6ea1ff":age=="Alter"?"#ffe949":age=="Rejected"?"#ed5269":age=="DHU"?"#ff9800": "#ffffff"]}
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
                            : null}
                            {lineGraph.producedPieces && age === "All" ?
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
                            : null}
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
                      
                    >
                      <div className={classes.cardCB}>
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
                            {topCards.AUDITS_DONE != null ? (
                              <div style={{justifyContent:"space-between"}}>
                                 <CountUp
                                  start={topCardsH.AUDITS_DONE}
                                  end={topCards.AUDITS_DONE}
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
                                  className={classes.topRightG}
                                />
                            </div>
                              ) :    
                              <CountUp
                              start={0}
                              end={0}
                              duration={.6}
                              separator={","}
                              className={classes.topRightG}
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
                                  className={classes.topRightR}
                                />
                            </div>
                              ) :    
                              <CountUp
                              start={0}
                              end={0}
                              duration={.6}
                              separator={","}
                              className={classes.topRightR}
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
