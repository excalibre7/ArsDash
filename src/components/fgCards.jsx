import React, { useState, useEffect } from 'react';
import {
	Typography,
	makeStyles,
	Grid,
  } from "@material-ui/core";
  import Icon from '@mdi/react';
import { mdiFormatLetterCase, mdiDotsVertical, mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import DefectStyle from "./DefectStyle";

const useStyles = makeStyles((theme) => ({
	fgCard2:{
		marginTop: 70,
		height: "85vh" ,
	//	width: "60%",
		alignContent:'center',
		justifyContent: "center",
		borderRadius:10,
		marginLeft:25,
		fontWeight: "bold",
		backgroundColor: '#ffffffcc',
    paddingTop: "4vh",
		// transition: "all .5s ease-in-out",
		// "&:hover": {
		//   fontWeight: "bold",
		//   cursor: "pointer",
		//   textDecoration: "none",
		//   transform: "scale(1.05)"
		// },
		boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
	  },
	  fgCard1: {
		backgroundColor: '#ffffffcc',
		alignContent: 'center',
		borderRadius: 10,
		padding: 10,
		justifyContent: 'center',
    marginBottom : 10
	  },
    topLabel: {
      fontSize: "3.1vh",
      fontFamily: "Work",
      marginHorizontal: 2,
      color: "#0a6aff",
      fontWeight:800,
      textAlign:"left",
      letterSpacing:"-1px"
    },
    topLabelG: {
      fontSize: "3.1vh",
      fontFamily: "Work",
      marginHorizontal: 2,
      color: "#49b667",
      fontWeight:800,
      textAlign:"left",
      letterSpacing:"-1px"
    },
    topLabelR: {
      fontSize: "3.1vh",
      fontFamily: "Work",
      marginHorizontal: 2,
      color: "#ff0025",
      fontWeight:800,
      textAlign:"left",
      maxWidth:"15vw",
      letterSpacing:"-1px"
    },
}));

function FgCards(props) {
  const {fgCodeKPIdata, defectsHeatMap} = props;
  const classes = useStyles();
   const [index, setIndex] = useState(0);
   const [frontDefects, setFrontDefects] = useState([]);
   const [backDefects, setBackDefects] = useState([]);
   const [images, setImages] = useState({front: "", back: ""});


   useEffect(() =>{
     let front =[], back =[], frontImg = "", backImg = "";
     for( let i = 0; i < defectsHeatMap[index].defectDetails.length; i++)
     {
      if(defectsHeatMap[index].defectDetails[i].coordType === "B"){
      //  back.push(defectsHeatMap[index].defectDetails[i])
        back.push({X: defectsHeatMap[index].defectDetails[i].xCoord, Y: defectsHeatMap[index].defectDetails[i].yCoord})
      }
      else if (defectsHeatMap[index].defectDetails[i].coordType === "F"){
        //front.push(defectsHeatMap[index].defectDetails[i])
        front.push({X: defectsHeatMap[index].defectDetails[i].xCoord, Y: defectsHeatMap[index].defectDetails[i].yCoord})
      }
     }

     setFrontDefects(front);
     setBackDefects(back);
     for(let i = 0; i < defectsHeatMap[index].imageDetails.length; i++)
     {
       if(defectsHeatMap[index].imageDetails[i].imageType === "FC"){
         frontImg = defectsHeatMap[index].imageDetails[i].imageUrl;
       }
       if(defectsHeatMap[index].imageDetails[i].imageType === "BC"){
        backImg = defectsHeatMap[index].imageDetails[i].imageUrl;
      }
     }

     setImages({front: frontImg, back: backImg});
   },[index, fgCodeKPIdata])

	return (
		<Grid style={{display: 'flex'}}>
      {fgCodeKPIdata.length >1 &&
        <Icon path={mdiChevronRight}
                        title="Sync"
                        size={1.5}
                        horizontal
                        vertical
                        style={{alignSelf: 'center', marginRight: 20}}
                        onClick={() =>{

                          if(index === 0)
                          {
                            setIndex(fgCodeKPIdata.length - 1);
                          }
                          else
                          {
                            setIndex(index - 1);
                          }
                        }}
                        color="white"
                    />
      }
        <Grid item xs={4} style={{marginTop: 70}} >
        <Grid className={classes.fgCard1}>
          <div >
            <Grid container style={{ flexDirection: "row"}}>
            <Grid>
                <Typography className={classes.topLabel}>
                {fgCodeKPIdata[index].fgCode}
                </Typography>
               </Grid>
            </Grid>
            </div>
        <div >
        <Grid container style={{ flexDirection: "row"}}>
               <Grid>
                <Typography className={classes.topLabel}>
                {fgCodeKPIdata[index].companyName}
                </Typography>
               </Grid>
            </Grid>
            </div>
        <div >
        <Grid container style={{ flexDirection: "row"}}>
        <Grid>
                <Typography className={classes.topLabel}>
                {"Order Qty: "+ fgCodeKPIdata[index].orderQty}
                </Typography>
               </Grid>
            </Grid>
            </div>
        <div >
        <Grid container style={{ flexDirection: "row"}}>
        <Grid>
                <Typography className={classes.topLabel}>
                {"Pcs Produced: "+ fgCodeKPIdata[index].prodPcs}
                </Typography>
               </Grid>
            </Grid>
            </div>
        <div >
        <Grid container style={{ flexDirection: "row"}}>
        <Grid>
                <Typography className={classes.topLabel}>
                {"Start : "+ fgCodeKPIdata[index].startDate}
                </Typography>
               </Grid>
            </Grid>
            </div>
        <div >
        <Grid container style={{ flexDirection: "row"}}>
        <Grid>
                <Typography className={classes.topLabel}>
                {"End : "+ fgCodeKPIdata[index].endDate}
                </Typography>
               </Grid>
            </Grid>
            </div>
        </Grid>
        <Grid className={classes.fgCard1}>
           <div>
        <Grid container style={{ flexDirection: "row"}}>
              <Grid>
              <Typography className={classes.topLabelG}>
                {fgCodeKPIdata[index].pcsChecked/fgCodeKPIdata[index].workHours}
                </Typography>
              </Grid>
                <Grid>
                <Typography className={classes.topLabelG}>
                {"  Pcs/Hour"}
               </Typography>
               </Grid>
            </Grid>
            </div>
        </Grid>
        <Grid className={classes.fgCard1}>
           <div>
        <Grid container style={{ flexDirection: "row"}}>
              <Grid>
              <Typography className={classes.topLabelR}>
                {"Top Defects"}
                </Typography>
              </Grid>
            </Grid>
            </div>
            {fgCodeKPIdata[index].topDefects.map((item, index) =>
            (
        <Grid container style={{ flexDirection: "row", justifyContent: 'space-between'}}>
              <Grid>
              <Typography className={classes.topLabelR}>
                {item.defectName}
               </Typography>
              </Grid>
                <Grid>
                <Typography className={classes.topLabelR}>
                {item.frequency}
               </Typography>
               </Grid>
            </Grid>
            )
            )}
        </Grid>
        </Grid>
        <Grid item xs={8}>
        <div className={classes.fgCard2}>
                        <DefectStyle
                            data={{
                              BackDefects: [],
                              Defect: "All Defects",
                              FrontDefects: frontDefects,
                              frequency: "6",
                              }}
                            frontUrl={images.front}
                          //  backUrl={"https://qualitylite.bluekaktus.com/Sketches/202/9b913962-2c7f-436e-9117-edeff1043d4e.jpg"}
                        />
        </div>
        </Grid>
        <Grid item xs={8}>
        <div className={classes.fgCard2}>
                        <DefectStyle
                            data={{
                              BackDefects: backDefects,
                              Defect: "All Defects",
                              FrontDefects:[],
                              frequency: "6",
                              }}
                            backUrl={images.back}
                        />
        </div>
        </Grid>
      {fgCodeKPIdata.length >1 &&
        <Icon path={mdiChevronLeft}
                        title="Sync"
                        size={1.5}
                        horizontal
                        vertical
                        style={{alignSelf: 'center', marginLeft: 20}}
                        onClick={() =>{
                          if(index === (fgCodeKPIdata - 1))
                          {
                            setIndex(0);
                          }
                          else
                          {
                            setIndex(index + 1);
                          }
                        }}
                        color="white"
                    />
      }
        </Grid>
	);
}

export default FgCards;
