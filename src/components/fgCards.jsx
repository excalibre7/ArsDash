import React, { useState, useEffect } from 'react';
import {
	Typography,
	makeStyles,
	Grid,
  } from "@material-ui/core";
  import Icon from '@mdi/react';
import { mdiFormatLetterCase, mdiDotsVertical, mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import DefectStyle from "./DefectStyle";
import {
  ExcelExport,
  ExcelExportColumn,
  ExcelExportColumnGroup,
} from "@progress/kendo-react-excel-export";
import Moment from 'moment';

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
    topLabelGX: {
      fontSize: "3.1vh",
      fontFamily: "Work",
      marginHorizontal: 2,
      color: "#49b667",
      fontWeight:800,
      textAlign:"left",
      letterSpacing:"-1px",
      "&:hover": {
        fontWeight: "bold",
        cursor: "pointer",
      },
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
    topLabelRX: {
      fontSize: "3.1vh",
      fontFamily: "Work",
      marginHorizontal: 2,
      color: "#ff0025",
      fontWeight:800,
      textAlign:"left",
      maxWidth:"15vw",
      letterSpacing:"-1px",
      "&:hover": {
        fontWeight: "bold",
        cursor: "pointer",
        transform: "scale(1.05)"
      },
    },
    defect: {
      // height: "15vh",
      width: "100%",
      transition: "all .1s ease-in-out",
      borderRadius: 8,
      "&:hover": {
        fontWeight: "bold",
        cursor: "pointer",
        textDecoration: "none",
        padding:5,
        backgroundColor: "#ffffff",
        boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        transform: "scale(1.1)"
      },
    },
}));

function FgCards(props) {
  const {fgCodeKPIdata, defectsHeatMap} = props;
  const classes = useStyles();
   const [index, setIndex] = useState(0);
   const [frontDefects, setFrontDefects] = useState([]);
   const [backDefects, setBackDefects] = useState([]);
   const [images, setImages] = useState({front: "", back: ""});
   const [dataExcel, setDataExcel] = useState([]);
   const [top5defects, setTop5Defects] = useState([]);
   const _exporter = React.createRef();

   const excelExport = () => {
     dataExcel.splice(0,dataExcel.length);
     for(let i = 0; i < fgCodeKPIdata[index].topDefects.length; i++)
     {
       dataExcel.push({ DefectCount:fgCodeKPIdata[index].topDefects[i].frequency, DefectName: fgCodeKPIdata[index].topDefects[i].defectName});
     }
     if (_exporter.current) {
       _exporter.current.save();
     }
   };

   useEffect(() =>{
     let front =[], back =[], frontImg = "", backImg = "";
     if(defectsHeatMap.length>0){
     for( let i = 0; i < defectsHeatMap[index].defectDetails.length; i++)
     {

      if(defectsHeatMap[index].defectDetails[i].coordType === "B"){
      //  back.push(defectsHeatMap[index].defectDetails[i])
        back.push({X: defectsHeatMap[index].defectDetails[i].xCoord, Y: defectsHeatMap[index].defectDetails[i].yCoord, defectName: defectsHeatMap[index].defectDetails[i].defectName})
      }
      else if (defectsHeatMap[index].defectDetails[i].coordType === "F"){
        //front.push(defectsHeatMap[index].defectDetails[i])
        front.push({X: defectsHeatMap[index].defectDetails[i].xCoord, Y: defectsHeatMap[index].defectDetails[i].yCoord, defectName: defectsHeatMap[index].defectDetails[i].defectName})
      }
     }
    }
     setFrontDefects(front);
     setBackDefects(back);
     if(defectsHeatMap.length>0){
     for(let i = 0; i < defectsHeatMap[index].imageDetails.length; i++)
     {
       if(defectsHeatMap[index].imageDetails[i].imageType === "FC"){
         frontImg = defectsHeatMap[index].imageDetails[i].imageUrl;
       }
       if(defectsHeatMap[index].imageDetails[i].imageType === "BC"){
        backImg = defectsHeatMap[index].imageDetails[i].imageUrl;
      }
     }
    }
     setImages({front: frontImg, back: backImg});
    
     let alldefects = fgCodeKPIdata[index].topDefects;
    //let alldefects = [{defectID: 1950, defectName: 'Neck shape off1', frequency: 10},{defectID: 1950, defectName: 'Neck shape off2', frequency: 5},{defectID: 1950, defectName: 'Neck shape off3', frequency: 20},{defectID: 1950, defectName: 'Neck shape off4', frequency: 1},{defectID: 1950, defectName: 'Neck shape off5', frequency: 3},{defectID: 1950, defectName: 'Neck shape off6', frequency: 8},{defectID: 1950, defectName: 'Neck shape off7', frequency: 2},{defectID: 1950, defectName: 'Neck shape off8', frequency: 4}]
     alldefects.sort((a,b) => a["frequency"] - b["frequency"]).reverse();
     if(alldefects.length > 5)
     {
      alldefects.splice(5,(alldefects.length - 5))
     }
     setTop5Defects(alldefects);
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
                {parseInt(fgCodeKPIdata[index].pcsChecked/fgCodeKPIdata[index].workHours)}
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
        <Grid container style={{ flexDirection: "row", justifyContent: 'space-between'}} onClick={() => {
                    let back=[], front = [];
                    if(defectsHeatMap.length>0){
                      for( let i = 0; i < defectsHeatMap[index].defectDetails.length; i++)
                      {
                       if(defectsHeatMap[index].defectDetails[i].coordType === "B"){
                       //  back.push(defectsHeatMap[index].defectDetails[i])
                         back.push({X: defectsHeatMap[index].defectDetails[i].xCoord, Y: defectsHeatMap[index].defectDetails[i].yCoord, defectName: defectsHeatMap[index].defectDetails[i].defectName})
                       }
                       else if (defectsHeatMap[index].defectDetails[i].coordType === "F"){
                         //front.push(defectsHeatMap[index].defectDetails[i])
                         front.push({X: defectsHeatMap[index].defectDetails[i].xCoord, Y: defectsHeatMap[index].defectDetails[i].yCoord, defectName: defectsHeatMap[index].defectDetails[i].defectName})
                       }
                      }
                     }
                      setFrontDefects(front);
                      setBackDefects(back);
        }}>
              <Grid>
              <Typography className={classes.topLabelR}>
                {"Top Defects"}
                </Typography>
              </Grid>
              <Grid>
              <Typography className={classes.topLabelRX}>
                {"All"}
                </Typography>
              </Grid>
            </Grid>
            </div>
            {top5defects.map((item) =>
            (
        <Grid container style={{ flexDirection: "row", justifyContent: 'space-between'}} onClick={() =>{
          let back=[], front = [];
          if(defectsHeatMap.length>0){
            for( let i = 0; i < defectsHeatMap[index].defectDetails.length; i++)
            {
             if(defectsHeatMap[index].defectDetails[i].coordType === "B" && defectsHeatMap[index].defectDetails[i].defectID === item.defectID){
             //  back.push(defectsHeatMap[index].defectDetails[i])
               back.push({X: defectsHeatMap[index].defectDetails[i].xCoord, Y: defectsHeatMap[index].defectDetails[i].yCoord, defectName: defectsHeatMap[index].defectDetails[i].defectName})
             }
             else if (defectsHeatMap[index].defectDetails[i].coordType === "F" && defectsHeatMap[index].defectDetails[i].defectID === item.defectID){
               //front.push(defectsHeatMap[index].defectDetails[i])
               front.push({X: defectsHeatMap[index].defectDetails[i].xCoord, Y: defectsHeatMap[index].defectDetails[i].yCoord, defectName: defectsHeatMap[index].defectDetails[i].defectName})
             }
            }
           }
            setFrontDefects(front);
            setBackDefects(back);
        }}>
          <div className={classes.defect}>
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
               </div>
            </Grid>
            )
            )}
        </Grid>
        <Grid className={classes.fgCard1}>
           <div>
        <Grid container style={{ flexDirection: "row"}} onClick={excelExport}>
              <Grid>
              <Typography className={classes.topLabelGX}>
                {"Export To Excel"}
                </Typography>
              </Grid>
            </Grid>
            </div>
        </Grid>
           <div>
      <ExcelExport data={dataExcel} fileName={`Products${Moment(new Date()).format('DD-MMM-yyyy-hh:mm:ss')}.xlsx`} ref={_exporter}>
      <ExcelExportColumnGroup
          title={fgCodeKPIdata[index].companyName}
          headerCellOptions={{ background: '#ffffff', bold: true, color: "#000000", borderRight: {color: "#000000"},borderLeft: {color: "#000000"},borderTop: {color: "#000000"}, borderBottom: {color: "#000000"}}}
        >
        <ExcelExportColumnGroup
          title={fgCodeKPIdata[index].fgCode}
          headerCellOptions={{ background: '#ffffff', bold: true, color: "#000000", borderRight: {color: "#000000"},borderLeft: {color: "#000000"},borderTop: {color: "#000000"}, borderBottom: {color: "#000000"}}}
        >
                  <ExcelExportColumnGroup
          title={"Start : "+ fgCodeKPIdata[index].startDate + "   End : "+ fgCodeKPIdata[index].endDate}
          headerCellOptions={{ background: '#ffffff', bold: true, color: "#000000", borderRight: {color: "#000000"},borderLeft: {color: "#000000"},borderTop: {color: "#000000"}, borderBottom: {color: "#000000"}}}
        >
                  <ExcelExportColumnGroup
          title={"Order Qty: "+ fgCodeKPIdata[index].orderQty}
          headerCellOptions={{ background: '#ffffff', bold: true, color: "#000000", borderRight: {color: "#000000"},borderLeft: {color: "#000000"},borderTop: {color: "#000000"}, borderBottom: {color: "#000000"}}}
        ></ExcelExportColumnGroup>
        <ExcelExportColumn field="DefectCount" title="Defect Count" cellOptions={{ borderRight: {color: "#000000"},borderLeft: {color: "#000000"},borderTop: {color: "#000000"}, borderBottom: {color: "#000000"}}} headerCellOptions={{ background: '#ffffff', bold: true, color: "#000000", borderRight: {color: "#000000"},borderLeft: {color: "#000000"},borderTop: {color: "#000000"}, borderBottom: {color: "#000000"}}}/>
        <ExcelExportColumn field="DefectName" title="Defect Name" cellOptions={{ borderRight: {color: "#000000"},borderLeft: {color: "#000000"},borderTop: {color: "#000000"}, borderBottom: {color: "#000000"}}} headerCellOptions={{ background: '#ffffff', bold: true, color: "#000000", borderRight: {color: "#000000"},borderLeft: {color: "#000000"},borderTop: {color: "#000000"}, borderBottom: {color: "#000000"}}}/>
          {/* <ExcelExportColumn field="UnitPrice" title="Unit Price" headerCellOptions={{ background: '#ffffff', bold: true, color: "#000000", borderRight: {color: "#000000"},borderLeft: {color: "#000000"},borderTop: {color: "#000000"}, borderBottom: {color: "#000000"}}}/>
          <ExcelExportColumn field="UnitsOnOrder" title="Units On Order" headerCellOptions={{ background: '#ffffff', bold: true, color: "#000000", borderRight: {color: "#000000"},borderLeft: {color: "#000000"},borderTop: {color: "#000000"}, borderBottom: {color: "#000000"}}}/>
          <ExcelExportColumn field="UnitsInStock" title="Units In Stock" headerCellOptions={{ background: '#ffffff', bold: true, color: "#000000", borderRight: {color: "#000000"},borderLeft: {color: "#000000"},borderTop: {color: "#000000"}, borderBottom: {color: "#000000"}}}/> */}
        </ExcelExportColumnGroup>
        </ExcelExportColumnGroup>
        </ExcelExportColumnGroup>
      </ExcelExport>
    </div>
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
