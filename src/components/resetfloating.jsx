import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

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

export default function ResetFloating(props) {
  const { handleClick, page } = props;
  const classes = useStyles();
  let left = 20;
  if (page == "qty") {
    left = 140;
  }

  const style = {
    margin: 0,
    top: "auto",
    right: left,
    bottom: 40,
    left: "auto",
    position: "fixed",
  };

  return (
    <div className={classes.root}>
      {/* <Link to="/create-order"> */}
      <Fab
        style={style}
        onClick={handleClick}
        className={classes.navBtn}
        variant="extended"
      >
        <RotateLeftIcon className={classes.extendedIcon} />
        Reset Filters
      </Fab>
      {/* </Link> */}
    </div>
  );
}
