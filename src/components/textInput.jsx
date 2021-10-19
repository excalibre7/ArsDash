import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
    width: "100%",
  },
}));

export default function TextInput(props) {
  const { lbl, setting, par } = props;
  const classes = useStyles();

  const changed = (event) => {
    setting(par, event.target.value);
  };

  return (
    <form>
      <TextField
        className={classes.root}
        id="outlined-basic"
        onChange={changed}
        label={lbl}
        variant="outlined"
      />
    </form>
  );
}
