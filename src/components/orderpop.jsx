import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Order from "../pages/order";
import { Fab, Grid } from "@material-ui/core";
import { Add } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  navBtn: {
    backgroundColor: "#6495ed",
    color: "white",
    transition: "0.3s",
    "&:hover": {
      backgroundColor: "#3c67bf",
    },
  },
  space: {
    height: "5vh",
  },
}));

const style = {
  margin: 0,
  top: "auto",
  right: "auto",
  bottom: 20,
  left: 20,
  position: "fixed",
};

export default function OrderPop(props) {
  const {
    categoryData,
    brandData,
    getPrediction,
    mainDivRef,
    handlePopOpenClose,
    bearer,
  } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    handlePopOpenClose(); //from home.jsx, handles blur
    setAnchorEl(mainDivRef.current); //div of main page in order to anchor pop over to center
  };

  const handleClose = () => {
    handlePopOpenClose(); //from home.jsx, handles blur
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Fab
        style={style}
        onClick={handleClick}
        className={classes.navBtn}
        variant="extended"
      >
        <Add className={classes.extendedIcon} />
        Predict Vendor
      </Fab>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        // onClose={handleClose} //removed so user does not click stray and lose data in pop over
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Order
          categoryData={categoryData}
          brandData={brandData}
          getPrediction={getPrediction}
          handleClose={handleClose}
          bearer={bearer}
        />
      </Popover>
    </div>
  );
}
