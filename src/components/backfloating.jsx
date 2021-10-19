import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import { ArrowBack } from "@material-ui/icons";

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
  right: 20,
  bottom: 40,
  left: "auto",
  position: "fixed",
};

export default function BackFloating(props) {
  const { handleClick } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Link to="/create-order"> */}
      <Fab
        style={style}
        onClick={handleClick}
        className={classes.navBtn}
        variant="extended"
      >
        <ArrowBack className={classes.extendedIcon} />
        Back
      </Fab>
      {/* </Link> */}
    </div>
  );
}
