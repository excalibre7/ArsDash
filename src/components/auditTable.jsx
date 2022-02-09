import React from "react";
import {
    Typography,
    makeStyles,
     Table,
     TableHead,
     TableCell,
     TableRow,
     Button
  } from "@material-ui/core";
  import { withStyles } from "@material-ui/styles";
  import { mdiTrayArrowDown ,mdiCloseThick,mdiFile } from '@mdi/js';
  import Icon from '@mdi/react';
  import { Link} from "react-router-dom";
  import ReactExport from "react-export-excel";

  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const useStyles = makeStyles((theme) => ({
  tableO:{
    alignContent:'center',
    marginTop: "8vh",
    height:"85vh",
    margin:15,
    overflow:"hidden",

  },
  tableI:{
    paddingBottom: 20,
    borderRadius: 10,
    boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
    alignContent:'center',
    height:"90vh",
    backgroundColor:"#ffffffCC",
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
  search:{
    width: "20vw",
    border: "2px solid #ffffff00",
    borderRadius: "4px",
    fontSize: "1rem",
    backgroundColor: "#ffffffcc",
    // backgroundImage: url('searchicon.png'),
    // backgroundPosition: "10px 10px",
    // backgroundRepeat: "no-repeat",
    padding: "12px",
    transition: "width 0.4s ease-in-out",
    "&:focus": {
      width: "60%",
    },
  },
  superheaderTxt: {
    color: "#000000AA",
    fontFamily:"Work",
    border: "2px solid #ffffff00",
    fontWeight:"800"
  },
  export:{
    marginTop:8,
    backgroundColor:"#49b675",
    paddingLeft:15,
    paddingRight:15,
    color:"#FFFFFFAA",
    fontWeight:"bold"
  }
}));


export default function AuditTable(props) {
  const { setAuditTable, auditTableData,auditRawData} = props;
  const classes = useStyles();
  const [searchText, setSearchText] = React.useState("");
  const [data, setData] = React.useState(auditTableData);

  const filterDataList = (filter) => {
    filter = filter.toLowerCase();

    if (!filter || filter == "") {
      setData(auditTableData);
      setSearchText("");
    } else {
      const newData = auditTableData.filter((item) => {
        let itemString = item["vendorName"] + " " + item["orderNo"] + " " + item["fgCode"];
        return itemString.toLowerCase().includes(filter);
      });
      setData(newData);
    }
  };
  const handleChange = (event) =>{
    console.log("event is!!!!!!!!!!", event.target.value);
    setSearchText(event.target.value);
    filterDataList(event.target.value);
  }

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

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  const downloadFile = (item) => {
    fetch(`https://qualitylite.bluekaktus.com/api/bkQuality/auditing/GetInspectionReport`, {
      method: "POST",
      body: JSON.stringify({
        basicparams: {
          companyID: item.vendorID,
          userID: 0,
          inspectionID: item.inspectionID,
        },
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((body) => {
        console.log(
          "########## Audit information from get inspectiondetails ##########"
        );
        console.log(body.result);
        openInNewTab(body.pdf);
      })
      .catch((error) => console.log(error)); //to catch the errors if any
  };
  console.log(auditRawData)
  return (
    <div className={classes.tableO}>
      <div style={{
              display: "flex", backgroundColor: "transparent", justifyContent: "space-between",marginBottom:10}}>
                        <input
                        placeholder="Search For FG Code or Order No"
                        type="text"
                        value={searchText}
                        className={classes.search}
                        onChange={handleChange}
                    />
                    <ExcelFile element={<Button className={classes.export}>Export Raw Data</Button>}>
                      <ExcelSheet data={auditRawData} name="Raw Data">
                          <ExcelColumn label="Inspection Date" value="INSPECTION_DATE" widthPx="100px"/>
                          <ExcelColumn label="Email Id" value="LOGIN_ID"/>
                          <ExcelColumn label="QA Name" value="USERNAME"/>
                          <ExcelColumn label="Company Name" value="COMPANY_NAME"/>
                          <ExcelColumn label="Brand Name" value="BRAND_NAME"/>
                          <ExcelColumn label="Product Description" value="STYLE_DESC"/>
                          <ExcelColumn label="Category" value="CATEGORY_NAME"/>
                          <ExcelColumn label="FG Code" value="STYLE_NO"/>
                          <ExcelColumn label="Order Qty" value="ORDER_QTY"/>
                          <ExcelColumn label="Offered Qty" value="PACKED_QTY"/>
                          <ExcelColumn label="AQL Level" value="AQL_LEVEL"/>
                          <ExcelColumn label="Sample Size" value="SAMPLE_SIZE"/>
                          <ExcelColumn label="Total Cartons" value="TOTAL_CARTONS"/>
                          <ExcelColumn label="Carton Sample Size" value="CARTON_SAMPLE_SIZE"/>
                          <ExcelColumn label="Max Major Acc" value="MAX_MAJOR_ACCEPTANCE"/>
                          <ExcelColumn label="Max Minor Acc" value="MAX_MINOR_ACCEPTANCE"/>
                          <ExcelColumn label="Defect 1" value="DEFECT1"/>
                          <ExcelColumn label="Defect 1 Major Count" value="DEFECT1_MAJOR_COUNT"/>
                          <ExcelColumn label="Defect 1 Minor Count" value="DEFECT1_MINOR_COUNT"/>
                          <ExcelColumn label="Defect 2" value="DEFECT2"/>
                          <ExcelColumn label="Defect 2 Major Count" value="DEFECT2_MAJOR_COUNT"/>
                          <ExcelColumn label="Defect 2 Minor Count" value="DEFECT2_MINOR_COUNT"/>
                          <ExcelColumn label="Defect 3" value="DEFECT3"/>
                          <ExcelColumn label="Defect 3 Major Count" value="DEFECT3_MAJOR_COUNT"/>
                          <ExcelColumn label="Defect 3 Minor Count" value="DEFECT3_MINOR_COUNT"/>
                          <ExcelColumn label="Defect 4" value="DEFECT4"/>
                          <ExcelColumn label="Defect 4 Major Count" value="DEFECT4_MAJOR_COUNT"/>
                          <ExcelColumn label="Defect 4 Minor Count" value="DEFECT4_MINOR_COUNT"/>
                          <ExcelColumn label="Defect 5" value="DEFECT5"/>
                          <ExcelColumn label="Defect 5 Major Count" value="DEFECT5_MAJOR_COUNT"/>
                          <ExcelColumn label="Defect 5 Minor Count" value="DEFECT5_MINOR_COUNT"/>
                          <ExcelColumn label="Defect 6" value="DEFECT6"/>
                          <ExcelColumn label="Defect 6 Major Count" value="DEFECT6_MAJOR_COUNT"/>
                          <ExcelColumn label="Defect 6 Minor Count" value="DEFECT6_MINOR_COUNT"/>
                          <ExcelColumn label="Defect 7" value="DEFECT7"/>
                          <ExcelColumn label="Defect 7 Major Count" value="DEFECT7_MAJOR_COUNT"/>
                          <ExcelColumn label="Defect 7 Minor Count" value="DEFECT7_MINOR_COUNT"/>
                          <ExcelColumn label="Defect 8" value="DEFECT8"/>
                          <ExcelColumn label="Defect 8 Major Count" value="DEFECT8_MAJOR_COUNT"/>
                          <ExcelColumn label="Defect 8 Minor Count" value="DEFECT8_MINOR_COUNT"/>
                          <ExcelColumn label="Defect 9" value="DEFECT9"/>
                          <ExcelColumn label="Defect 9 Major Count" value="DEFECT8_MAJOR_COUNT"/>
                          <ExcelColumn label="Defect 9 Minor Count" value="DEFECT8_MINOR_COUNT"/>
                          <ExcelColumn label="Misc Defect 1" value="MISC_DEFECT1"/>
                          <ExcelColumn label="Misc Defect 1 Minor Count" value="MISC_DEFECT1_MAJOR_COUNT"/>
                          <ExcelColumn label="Misc Defect 1 Major Count" value="MISC_DEFECT1_MINOR_COUNT"/>
                          <ExcelColumn label="Misc Defect 2" value="MISC_DEFECT2"/>
                          <ExcelColumn label="Misc Defect 2 Minor Count" value="MISC_DEFECT2_MAJOR_COUNT"/>
                          <ExcelColumn label="Misc Defect 2 Major Count" value="MISC_DEFECT2_MINOR_COUNT"/>
                          <ExcelColumn label="Misc Defect 3" value="MISC_DEFECT3"/>
                          <ExcelColumn label="Misc Defect 3 Minor Count" value="MISC_DEFECT3_MAJOR_COUNT"/>
                          <ExcelColumn label="Misc Defect 3 Major Count" value="MISC_DEFECT3_MINOR_COUNT"/>
                          <ExcelColumn label="Meas. Defect 1" value="MEASUREMENT_DEFECT1"/>
                          <ExcelColumn label="Meas. Defect 1 Minor Count" value="MEASUREMENT_DEFECT1_MAJOR_COUNT"/>
                          <ExcelColumn label="Meas. Defect 1 Major Count" value="MEASUREMENT_DEFECT1_MINOR_COUNT"/>
                          <ExcelColumn label="Meas. Defect 2" value="MEASUREMENT_DEFECT2"/>
                          <ExcelColumn label="Meas. Defect 2 Minor Count" value="MEASUREMENT_DEFECT2_MAJOR_COUNT"/>
                          <ExcelColumn label="Meas. Defect 2 Major Count" value="MEASUREMENT_DEFECT2_MINOR_COUNT"/>
                          <ExcelColumn label="Meas. Defect 3" value="MEASUREMENT_DEFECT3"/>
                          <ExcelColumn label="Meas. Defect 3 Minor Count" value="MEASUREMENT_DEFECT3_MAJOR_COUNT"/>
                          <ExcelColumn label="Meas. Defect 3 Major Count" value="MEASUREMENT_DEFECT3_MINOR_COUNT"/>
                          <ExcelColumn label="Crit Defect" value="CRITICAL_DEFECTS"/>
                          <ExcelColumn label="Crit Count " value="CRITICAL_COUNT"/>
                          <ExcelColumn label="Tot Maj" value="TOTAL_MAJAOR_COUNT"/>
                          <ExcelColumn label="Tot Min" value="TOTAL_MINOR_COUNT"/>
                          <ExcelColumn label="Tot Defects" value="TOTAL_DEFECTS"/>
                          {/* <ExcelColumn label="Defect Rate" value="CRITICAL_COUNT"/> */}
                          <ExcelColumn label="Audit Status" value="RESULT"/>
                          <ExcelColumn label="Remarks" value="REMARKS"/>
                      </ExcelSheet>
                     </ExcelFile>
         <Icon path={mdiCloseThick} size={2} color="#ffffff" onClick={() =>{setAuditTable(false)}}/>
                  </div>
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
                        Order No.
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
                          FG Code
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
                         Audit Qty
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
                        <Typography className={classes.superheaderTxt} style={{textAlign:"center"}}>
                          Audit Status
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        style={{
                          padding: 10,
                      
                          width: "17%",
                          backgroundColor: "#fff",
                          textAlign:"right",
                          zIndex: 1000,
                        }}
                      >
                        <Typography className={classes.superheaderTxt}>
                          Inspection Time
                        </Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  {data
                    .map((row) => (
                      <StyledTableRow >
                        <StyledTableCell>
                          <Typography  
                            style={{
                            textAlign:"left",
                          }}>
                            {row.vendorName}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Typography  
                            style={{
                            textAlign:"right",
                          }}>
                            {row.orderNo}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Typography  
                            style={{
                            textAlign:"right",
                          }}>
                            {row.fgCode}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell>
                          <Typography  
                            style={{
                            textAlign:"right",
                          }}>
                            {row.packedQty}
                          </Typography>
                        </StyledTableCell>
                            
                        <StyledTableCell>
                          <Typography  
                            style={{
                            textAlign:"center",
                            color:"#FFFFFF",
                            fontWeight:"bold",
                            borderRadius:5,
                            padding:3,
                            marginRight:10,
                            marginLeft:10,
                            justifyContent:"center",
                            textalign:"center",
                            backgroundColor: row.auditStatus === "PASSED" ? "#49b667DD" : "#ff0025DD"
                          }}>
                            {row.auditStatus}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell style={{justifyContent:"space-between"}}>
                          <Typography  
                            style={{
                            textAlign:"center",
                            justifyContent:"space-between"
                          }}>
                            {row.inspectionOn}   
                            <Icon path={mdiFile}
                              size={1.5}
                              color="#008eff" onClick={() => {downloadFile(row)}}
                          />
                          </Typography>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </Table>
                </div>
                </div>
  );
}