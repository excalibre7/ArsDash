import React from "react";
import {
    Typography,
    makeStyles,
     Table,
     TableHead,
     TableCell,
     TableRow,
  } from "@material-ui/core";
  import { withStyles } from "@material-ui/styles";
  import { mdiTrayArrowDown ,mdiCloseThick,mdiFile } from '@mdi/js';
  import Icon from '@mdi/react';
  import { Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  tableO:{
    alignContent:'center',
    marginTop: 70,
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
    fontSize: "2vh",
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
}));

export default function AuditTable(props) {
  const { setAuditTable, auditTableData} = props;
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
                        <Typography className={classes.superheaderTxt}>
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
                            textAlign:"right",
                            color:"#FFFFFF",
                            fontWeight:"bold",
                            borderRadius:5,
                            padding:3,
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