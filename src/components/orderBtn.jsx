import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import { Add } from "@material-ui/icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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
}));

const style = {
  margin: 0,
  top: "auto",
  right: "auto",
  bottom: 20,
  left: 20,
  position: "fixed",
};

export default function OrderBtn(props) {
  const { handleClick } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Link to="/create-order"> */}
      <Fab
        style={style}
        onClick={() => handleClick()}
        className={classes.navBtn}
        variant="extended"
      >
        <Add className={classes.extendedIcon} />
        Create New Order
      </Fab>
      {/* </Link> */}
    </div>
  );
}
