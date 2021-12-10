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
	  }
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
              <Grid style={{justifyContent : 'center'}}>
                <h5 >
                {"fgCode: "}
                </h5>
              </Grid>
               <Grid>
                <h5>
                {fgCodeKPIdata[index].fgCode}
                </h5>
               </Grid>
            </Grid>
            </div>
        <div >
        <Grid container style={{ flexDirection: "row"}}>
              <Grid>
                <h3 >
                {"Vendor:"}
                </h3>
              </Grid>
               <Grid>
                <h3>
                {fgCodeKPIdata[index].companyName}
                </h3>
               </Grid>
            </Grid>
            </div>
        <div >
        <Grid container style={{ flexDirection: "row"}}>
              <Grid>
                <h4>
                {"Order Qty"}
                </h4>
              </Grid>
               <Grid>
                <h4>
                {"xyz"}
                </h4>
               </Grid>
            </Grid>
            </div>
        <div >
        <Grid container style={{ flexDirection: "row"}}>
              <Grid>
                <h4 >
                {"Complexity"}
                </h4>
              </Grid>
                <Grid>
                <h4>
                {"xyz"}
                </h4>
               </Grid>
            </Grid>
            </div>
            <div >
        <Grid container style={{ flexDirection: "row"}}>
              <Grid>
                <h4 >
                {"Start Date"}
                </h4>
              </Grid>
                <Grid>
                <h4>
                {fgCodeKPIdata[index].startDate}
                </h4>
               </Grid>
            </Grid>
            </div>
            <div >
        <Grid container style={{ flexDirection: "row"}}>
              <Grid>
                <h4 >
                {"End Date"}
                </h4>
              </Grid>
                <Grid>
                <h4>
                {fgCodeKPIdata[index].endDate}
                </h4>
               </Grid>
            </Grid>
            </div>
        </Grid>
        <Grid className={classes.fgCard1}>
           <div>
        <Grid container style={{ flexDirection: "row"}}>
              <Grid>
                <h4 >
                {fgCodeKPIdata[index].pcsChecked/fgCodeKPIdata[index].workHours}
                </h4>
              </Grid>
                <Grid>
                <h4>
                {"Pcs/Hour"}
                </h4>
               </Grid>
            </Grid>
            </div>
        </Grid>
        <Grid className={classes.fgCard1}>
           <div>
        <Grid container style={{ flexDirection: "row"}}>
              <Grid>
                <h4 >
                {"Top 5 defects"}
                </h4>
              </Grid>
            </Grid>
            </div>
            {fgCodeKPIdata[index].topDefects.map((item, index) =>
            (
        <Grid container style={{ flexDirection: "row", justifyContent: 'space-between'}}>
              <Grid>
                <h5 >
                {index + " " + item.defectName}
                </h5>
              </Grid>
                <Grid>
                <h5>
                {item.frequency}
                </h5>
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
