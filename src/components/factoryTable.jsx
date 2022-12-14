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

const useStyles = makeStyles((theme) => ({
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
  superheaderTxt: {
    color: "#000000AA",
    fontFamily:"Work",
    fontWeight:"800"
  },
}));

export default function FactoryTable(props) {
  const { data, nextTableFunc} = props;
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
              backgroundColor: "red",
              textAlign:"left",
            //  zIndex: 1000,
            }}
          >
            <Typography className={classes.superheaderTxt}>
              Factory
            </Typography>
          </StyledTableCell>
          <StyledTableCell
            style={{
              padding: 10,
          
              width: "10%",
              backgroundColor: "#fff",
              textAlign:"right",
            //  zIndex: 1000,
            }}
          >
            <Typography className={classes.superheaderTxt}>
              Order Qty
            </Typography>
          </StyledTableCell>
          <StyledTableCell
            style={{
              padding: 10,
          
              width: "10%",
              backgroundColor: "#fff",
              textAlign:"right",
            //  zIndex: 1000,
            }}
          >
            <Typography className={classes.superheaderTxt}>
              Pending
            </Typography>
          </StyledTableCell>
          <StyledTableCell
            style={{
              padding: 10,
          
              width: "10%",
              backgroundColor: "#fff",
              textAlign:"right",
            //  zIndex: 1000,
            }}
          >
            <Typography className={classes.superheaderTxt}>
              Pcs Produced
            </Typography>
          </StyledTableCell>
          <StyledTableCell
            style={{
              padding: 10,
          
              width: "10%",
              backgroundColor: "#fff",
              textAlign:"right",
           //   zIndex: 1000,
            }}
          >
            <Typography className={classes.superheaderTxt}>
              Ok Pieces
            </Typography>
          </StyledTableCell>
          <StyledTableCell
            style={{
              padding: 10,
          
              width: "10%",
              backgroundColor: "#fff",
              textAlign:"right",
          //    zIndex: 1000,
            }}
          >
            <Typography className={classes.superheaderTxt}>
              Rectified Pcs
            </Typography>
          </StyledTableCell>
          <StyledTableCell
            style={{
              padding: 10,
          
              width: "10%",
              backgroundColor: "#fff",
              textAlign:"right",
         //     zIndex: 1000,
            }}
          >
            <Typography className={classes.superheaderTxt}>
              Defects
            </Typography>
          </StyledTableCell>
          <StyledTableCell
            style={{
              padding: 10,
          
              width: "10%",
              backgroundColor: "#fff",
              textAlign:"right",
         //     zIndex: 1000,
            }}
          >
            <Typography className={classes.superheaderTxt}>
              Rejected Pcs
            </Typography>
          </StyledTableCell>
          <StyledTableCell
            style={{
              padding: 10,
          
              width: "10%",
              backgroundColor: "#fff",
              textAlign:"right",
         //     zIndex: 1000,
            }}
          >
            <Typography className={classes.superheaderTxt}>
              Rejection%
            </Typography>
          </StyledTableCell>
          <StyledTableCell
            style={{
              padding: 10,
              width: "10%",
              backgroundColor: "#fff",
              textAlign:"right",
         //     zIndex: 1000,
            }}
          >
            <Typography className={classes.superheaderTxt}>
              DHU%
            </Typography>
          </StyledTableCell>
        </StyledTableRow>
      </TableHead>

      {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
        .map((row) => (
          <StyledTableRow onClick={() =>{
            nextTableFunc({currentTable : "factory", nextTable: "vendor", details: {item: row}})
          }}>
            <StyledTableCell>{"Shree Raj Apparels"}</StyledTableCell>
            <StyledTableCell>
              <Typography  
                style={{
                textAlign:"right",
              }}>
                {"98547"}
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography  
                style={{
                textAlign:"right",
              }}>
                {"98547"}
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography  
                style={{
                textAlign:"right",
              }}>
                {"98547"}
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography  
                style={{
                textAlign:"right",
              }}>
                {"98547"}
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography  
                style={{
                textAlign:"right",
              }}>
                {"98547"}
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography  
                style={{
                textAlign:"right",
              }}>
                {"98547"}
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography  
                style={{
                textAlign:"right",
              }}>
                {"98547"}
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography  
                style={{
                textAlign:"right",
              }}>
                {"3%"}
              </Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography  
                style={{
                textAlign:"right",
              }}>
                {"5%"}
              </Typography>
            </StyledTableCell>
          </StyledTableRow>
        ))}
    </Table>
    </div>
  );
}
