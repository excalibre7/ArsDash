import React from "react";
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
  const { topCards, topCardsH, age, handleChange, graphData} = props;
  const classes = useStyles();

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
                             fontSize:11,
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
                            fontSize:11,
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
                              fontSize:11,
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
                            fontSize:11,
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
                             fontSize:11,
                             height:60,
                             letterSpacing:"-1px"}}>
           {tick.value}
         </Typography>
       </div>
     </foreignObject>
  )
}


  return (
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
                            {topCards.TOT_PCS != null ? (
                                <CountUp
                                  start={topCardsH.TOT_PCS}
                                  end={topCards.TOT_PCS}
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
                                  start={topCardsH.OK_PIECES}
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
                                  start={topCardsH.ALTERED_PIECES}
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
                                  start={topCardsH.REJECTED_PIECES}
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
                                  start={topCardsH.REJECTED_PIECES*100/topCardsH.NO_OF_PCS}
                                  end={topCards.REJECTED_PIECES*100/topCards.NO_OF_PCS}
                                  duration={1}
                                  separator={","}
                                  decimals={2}
                                  suffix={"%"}
                                  className={classes.topRightR}
                                />
                              ) :    
                              <CountUp
                              start={0}
                              end={0}
                              duration={1}
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
                                  duration={1}
                                  separator={","}
                                  decimals={2}
                                  suffix={"%"}
                                  className={classes.topRightO}
                                />
                              ) :    
                              <CountUp
                              start={0}
                              end={0}
                              duration={1}
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
              keys={[ 'OK Pieces',"Altered Pieces","Pieces In Alteration" ]}
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
  );
}
