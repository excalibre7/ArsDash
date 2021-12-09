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
		marginTop: 80,
		height: "85vh" ,
		width: "60%",
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
	  fgCard1: {
		marginTop: 80,
		backgroundColor: '#ffffffcc',
		alignContent: 'center',
		borderRadius: 10,
		padding: 10,
		justifyContent: 'center'
	  }
}));

function FgCards(props) {
	let classes = useStyles();

	return (
		<Grid style={{display: 'flex'}}>
        {/* <Icon path={mdiChevronRight}
                        title="Sync"
                        size={1.5}
                        horizontal
                        vertical
                        style={{alignSelf: 'center', marginRight: 20}}
                      //  onClick={() =>{}}
                        color="white"
                    /> */}
        <Grid item xs={3} className={classes.fgCard1}>
          <div >
            <Grid container style={{ flexDirection: "row"}}>
              <Grid style={{justifyContent : 'center'}}>
                <h1 >
                {"fgCode:"}
                </h1>
              </Grid>
               <Grid>
                <h1>
                {"  xyz"}
                </h1>
               </Grid>
            </Grid>
            </div>
        <div >
        <Grid container style={{ flexDirection: "row"}}>
              <Grid>
                <h2 >
                {"Company Name:"}
                </h2>
              </Grid>
               <Grid>
                <h2>
                {"  CRI INDUS"}
                </h2>
               </Grid>
            </Grid>
            </div>
        <div >
        <Grid container style={{ flexDirection: "row"}}>
              <Grid>
                <h4>
                {"Start Date"}
                </h4>
              </Grid>
               <Grid>
                <h4>
                {"02/12/2021"}
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
                {"02/12/2021"}
                </h4>
               </Grid>
            </Grid>
            </div>
            <div >
        <Grid container style={{ flexDirection: "row"}}>
              <Grid>
                <Typography >
                {"Pcs Produced:"}
                </Typography>
              </Grid>
               <Grid>
                <Typography>
                {"xyz"}
                </Typography>
               </Grid>
            </Grid>
            </div>
            <div >
        <Grid container style={{ flexDirection: "row"}}>
              <Grid>
                <Typography >
                {"Ok Pcs:"}
                </Typography>
              </Grid>
               <Grid>
                <Typography>
                {"xyz"}
                </Typography>
               </Grid>
            </Grid>
            </div>
            <div >
        <Grid container style={{ flexDirection: "row"}}>
              <Grid>
                <Typography >
                {"Rectified Pcs:"}
                </Typography>
              </Grid>
               <Grid>
                <Typography>
                {"xyz"}
                </Typography>
               </Grid>
            </Grid>
            </div>
            <div >
        <Grid container style={{ flexDirection: "row"}}>
              <Grid>
                <Typography >
                {"Rejected Pcs: "}
                </Typography>
              </Grid>
               <Grid>
                <Typography>
                {"xyz"}
                </Typography>
               </Grid>
            </Grid>
            </div>
            <div >
        <Grid container style={{ flexDirection: "row"}}>
              <Grid>
                <Typography >
                {"Rejected %"}
                </Typography>
              </Grid>
               <Grid>
                <Typography>
                {"xyz"}
                </Typography>
               </Grid>
            </Grid>
            </div>
            <div >
        <Grid container style={{ flexDirection: "row"}}>
              <Grid>
                <Typography >
                {"DHU %"}
                </Typography>
              </Grid>
               <Grid>
                <Typography>
                {"02/12/2021"}
                </Typography>
               </Grid>
            </Grid>
            </div>
        </Grid>
        <Grid item xs={8}>
        <div className={classes.fgCard2}>
                        <DefectStyle
                            data={{
                              BackDefects: [
                              {X: '2.80887318', Y: '1.96479666'},
                              {X: '0.253577858', Y: '2.09484267'}
                              ],
                              Defect: "All Defects",
                              FrontDefects:[
                              {X: '2.67720532', Y: '1.23814964'},
                              {X: '0.6491022', Y: '0.4926785'},
                              {X: '0.586651', Y: '0.955641448'},
                              {X: '1.19034612', Y: '2.33932853'}
                              ],
                              frequency: "6",
                              }}
                            frontUrl={"https://qualitylite.bluekaktus.com/Sketches/202/1d657adc-14a3-4776-949a-675763534e35.jpg"}
                            backUrl={"https://qualitylite.bluekaktus.com/Sketches/202/9b913962-2c7f-436e-9117-edeff1043d4e.jpg"}
                        />
        </div>
        {/* <Icon path={mdiChevronLeft}
                        title="Sync"
                        size={1.5}
                        horizontal
                        vertical
                        style={{alignSelf: 'center', marginLeft: 20}}
                      //  onClick={() =>{}}
                        color="white"
                    /> */}
        </Grid>
	);
}

export default FgCards;
