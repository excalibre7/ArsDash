import React, { useEffect } from "react";
import {
    Typography,
    makeStyles,
     Table,
     TableHead,
     TableCell,
     TableRow,
  } from "@material-ui/core";
  import { withStyles } from "@material-ui/styles";
  import CountUp from "react-countup";
 import "../stylesheets/table.css";
import { borderRadius } from "@mui/system";
const useStyles = makeStyles((theme) => ({
  tableI:{
    paddingBottom: 20,
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
  superheaderTxt: {
    color: "#000000AA",
    fontFamily:"Work",
    fontWeight:"800"
  },
  values: {
    fontSize: 16
  },
  tableHeaders:{
    padding: 10,
    width: "10%",
    backgroundColor: "#fff",
    textAlign:"right",
    zIndex: 1000,
   "&:hover":{
      borderRadius: 20,
    }
  }
}));

export default function VendorTable(props) {
  const { data, nextTableFunc, tableDataH, setSequenceType, sequenceType, setUpdateHistory, updateHistory} = props;
  const classes = useStyles();

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

  return (
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
                        className={classes.tableHeaders}
                        onClick={() =>{
                          if(sequenceType["orderQty"] !== 1)
                          setSequenceType({...sequenceType, recent : "orderQty", orderQty: 1})
                          else
                          setSequenceType({...sequenceType, recent : "orderQty", orderQty: 0})
                        }}
                      >
                        <Typography className={classes.superheaderTxt}>
                          Order Qty
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        className={classes.tableHeaders}
                        onClick={() =>{
                          if(sequenceType["pending"] !== 1)
                          setSequenceType({...sequenceType, recent : "pending", pending: 1})
                          else
                          setSequenceType({...sequenceType, recent : "pending", pending: 0})
                        }}
                      >
                        <Typography className={classes.superheaderTxt}>
                          Pending
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        className={classes.tableHeaders}
                        onClick={() =>{
                          if(sequenceType["pcsProduced"] !== 1)
                          setSequenceType({...sequenceType, recent : "pcsProduced", pcsProduced: 1})
                          else
                          setSequenceType({...sequenceType, recent : "pcsProduced", pcsProduced: 0})
                        }}
                      >
                        <Typography className={classes.superheaderTxt}>
                          Pcs Produced
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        className={classes.tableHeaders}
                        onClick={() =>{
                          if(sequenceType["okPcs"] !== 1)
                          setSequenceType({...sequenceType, recent : "okPcs", okPcs: 1})
                          else
                          setSequenceType({...sequenceType, recent : "okPcs", okPcs: 0})
                        }}
                      >
                        <Typography className={classes.superheaderTxt}>
                          Ok Pieces
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        className={classes.tableHeaders}
                        onClick={() =>{
                          if(sequenceType["rectifiedPcs"] !== 1)
                          setSequenceType({...sequenceType, recent : "rectifiedPcs", rectifiedPcs: 1})
                          else
                          setSequenceType({...sequenceType, recent : "rectifiedPcs", rectifiedPcs: 0})
                        }}
                      >
                        <Typography className={classes.superheaderTxt}>
                          Rectified Pcs
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        className={classes.tableHeaders}
                        onClick={() =>{
                          if(sequenceType["pcsInAlter"] !== 1)
                          setSequenceType({...sequenceType, recent : "pcsInAlter", pcsInAlter: 1})
                          else
                          setSequenceType({...sequenceType, recent : "pcsInAlter", pcsInAlter: 0})
                        }}
                      >
                        <Typography className={classes.superheaderTxt}>
                          Pcs in Alter
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        className={classes.tableHeaders}
                        onClick={() =>{
                          if(sequenceType["rejectedPcs"] !== 1)
                          setSequenceType({...sequenceType, recent : "rejectedPcs", rejectedPcs: 1})
                          else
                          setSequenceType({...sequenceType, recent : "rejectedPcs", rejectedPcs: 0})
                        }}
                      >
                        <Typography className={classes.superheaderTxt}>
                          Rejected Pcs
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        className={classes.tableHeaders}
                        onClick={() =>{
                          if(sequenceType["rejectPer"] !== 1)
                          setSequenceType({...sequenceType, recent : "rejectPer", rejectPer: 1})
                          else
                          setSequenceType({...sequenceType, recent : "rejectPer", rejectPer: 0})
                        }}
                      >
                        <Typography className={classes.superheaderTxt}>
                          Rejection%
                        </Typography>
                      </StyledTableCell>
                      <StyledTableCell
                        className={classes.tableHeaders}
                        onClick={() =>{
                          if(sequenceType["dhuPer"] !== 1)
                          setSequenceType({...sequenceType, recent : "dhuPer", dhuPer: 1})
                          else
                          setSequenceType({...sequenceType, recent : "dhuPer", dhuPer: 0})
                        }}
                      >
                        <Typography className={classes.superheaderTxt}>
                          DHU%
                        </Typography>
                      </StyledTableCell>
                    </StyledTableRow>
                  </TableHead>
                  
                  {data
                    .map((row, index) => (
                      <StyledTableRow 
                      // onClick={() =>{
                      //   nextTableFunc({currentTable : "vendor", nextTable: "factory", details: {item: row}})
                      // }}
                      >
                        <StyledTableCell>{row.locationName}</StyledTableCell>
                        <StyledTableCell className={tableDataH[index] && row.orderQty !== tableDataH[index].orderQty  && updateHistory === 1 ? "valuesBlue" : "simple"}>
                        {/* {row.orderQty != null && row.orderQty !== 0 ? (
                                <CountUp
                                  start={tableDataH[index] ? tableDataH[index].orderQty : 0}
                                  end={row.orderQty}
                                  duration={.6}
                                  separator={","} 
                                  className={classes.values}

                                />
                              ) :    
                              <Typography>
                              {row.orderQty}
                            </Typography>} */}
                          <Typography  
                            style={{
                            textAlign:"right",
                          }}>
                            {row.orderQty}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell className={tableDataH[index] && row.pendingPieces !== tableDataH[index].pendingPieces   && updateHistory === 1  ? "valuesBlue" : "simple"} >
                        {/* {row.pendingPieces != null && row.pendingPieces !== 0 ? (
                                <CountUp
                                  start={tableDataH[index] ? tableDataH[index].pendingPieces : 0}
                                  end={row.pendingPieces}
                                  duration={.6}
                                  separator={","}
                                  className={classes.values}
                                />
                              ) :    
                              <Typography>
                            {row.pendingPieces}
                          </Typography>} */}
                          <Typography  
                            style={{
                            textAlign:"right",
                          }}>
                            {row.pendingPieces}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell className={tableDataH[index] && row.producedPieces !== tableDataH[index].producedPieces  && updateHistory === 1 ? "valuesGreen" : "simple"}>
                        {/* {row.producedPieces != null && row.producedPieces !==0 ? ( // had to replace CountUp with typography or else 0 kept blinking (was working fine if data is not 0)
                                <CountUp
                                  start={tableDataH[index] ? tableDataH[index].producedPieces : 0}
                                  end={row.producedPieces}
                                  duration={.6}
                                  separator={","}
                                  className={classes.values}
                                />
                              ) :                        
                              <Typography>  
                            {row.producedPieces}
                          </Typography> } */}
                          <Typography  
                            style={{
                            textAlign:"right",
                          }}>
                            {row.producedPieces}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell className={tableDataH[index] && row.okPieces !== tableDataH[index].okPieces  && updateHistory === 1  ? "valuesGreen" : "simple"}>
                        {/* {row.okPieces != null && row.okPieces !==0 ? (
                                <CountUp
                                  start={tableDataH[index] ? tableDataH[index].okPieces : 0}
                                  end={row.okPieces}
                                  duration={.6}
                                  separator={","}
                                  className={classes.values}
                                />
                              ) :    
                              <Typography>
                            {row.okPieces}
                          </Typography>} */}
                          <Typography  
                            style={{
                            textAlign:"right",
                          }}>
                            {row.okPieces}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell className={tableDataH[index] && row.alteredPieces !== tableDataH[index].alteredPieces  && updateHistory === 1 ? "valuesYellow" : "simple"}>
                        {/* {row.alteredPieces != null  && row.alteredPieces !== 0 ? (
                                <CountUp
                                  start={tableDataH[index] ? tableDataH[index].alteredPieces : 0}
                                  end={row.alteredPieces}
                                  duration={.6}
                                  separator={","}
                                  className={classes.values}
                                />
                              ) :    
                              <Typography>
                            {row.alteredPieces}
                          </Typography> } */}
                          <Typography  
                            style={{
                            textAlign:"right",
                          }}>
                            {row.alteredPieces}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell className={tableDataH[index] && row.pcsInAlteration !== tableDataH[index].pcsInAlteration  && updateHistory === 1  ? "valuesYellow" : "simple"}>
                        {/* {row.pcsInAlteration != null && row.pcsInAlteration !== 0 ? (
                                <CountUp
                                  start={tableDataH[index] ? tableDataH[index].pcsInAlteration : 0}
                                  end={row.pcsInAlteration}
                                  duration={.6}
                                  separator={","}
                                  className={classes.values}
                                />
                              ) :    
                              <Typography>
                            {row.pcsInAlteration}
                          </Typography>} */}
                          <Typography  
                            style={{
                            textAlign:"right",
                          }}>
                            {row.pcsInAlteration}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell className={tableDataH[index] && row.rejectedPieces !== tableDataH[index].rejectedPieces  && updateHistory === 1  ? "valuesRed" : "simple"}>
                        {/* {row.rejectedPieces != null && row.rejectedPieces !== 0 ? (
                                <CountUp
                                  start={tableDataH[index] ? tableDataH[index].rejectedPieces : 0}
                                  end={row.rejectedPieces}
                                  duration={.6}
                                  separator={","}
                                  className={classes.values}
                                />
                              ) :    
                              <Typography>
                            {row.rejectedPieces}
                          </Typography>} */}
                          <Typography  
                            style={{
                            textAlign:"right",
                          }}>
                            {row.rejectedPieces}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell className={tableDataH[index] && row.rejPerc !== tableDataH[index].rejPerc  && updateHistory === 1  ? "valuesRed" : "simple"}>
                        {/* {row.rejPerc != null && row.rejPerc !== "0.00%" ? (
                                <CountUp
                                  start={tableDataH[index] ? parseFloat(tableDataH[index].rejPerc.slice(0, tableDataH[index].rejPerc.length - 1)) : 0}
                                  end={parseFloat(row.rejPerc.slice(0, row.rejPerc.length - 1))}
                                  duration={.6}
                                  separator={","}
                                  decimals={2}
                                  suffix={"%"}
                                  className={classes.values}
                                />
                              ) :    
                              <Typography>
                            {row.rejPerc}
                          </Typography>} */}
                          <Typography  
                            style={{
                            textAlign:"right",
                          }}>
                            {row.rejPerc}
                          </Typography>
                        </StyledTableCell>
                        <StyledTableCell className={tableDataH[index] && row.dhu !== tableDataH[index].dhu  && updateHistory === 1  ? "valuesOrange" : "simple"}>
                        {/* {row.dhu != null && row.dhu !== "0.00%" ? (
                                <CountUp
                                  start={tableDataH[index] ? parseFloat(tableDataH[index].dhu.slice(0, tableDataH[index].dhu.length - 1)) : 0}
                                  end={parseFloat(row.dhu.slice(0, row.dhu.length - 1))}
                                  duration={.6}
                                  separator={","}
                                  decimals={2}
                                  suffix={"%"}
                                  className={classes.values}
                                />
                              ) :    
                              <Typography>
                            {row.dhu}
                          </Typography>} */}
                          <Typography  
                            style={{
                            textAlign:"right",
                          }}>
                            {row.dhu}
                          </Typography>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </Table>
                </div>
  );
}
