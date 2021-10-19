import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { Component } from "react";
import { ArrowBack, Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  prog: {
    color: "green",
  },
  padDiv: {
    paddingLeft: "6vh",
    paddingTop: "3vh",
    paddingBottom: "3vh",
    paddingRight: "6vh",
  },
  bar: {
    height: "7",
  },
  barTxt: {
    fontWeight: "bold",
    color: "white",
    fontSize: "1.2rem",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    color: "white",
  },
  closeButton: {
    // fontSize: "3rem",
  },
  submit: {
    width: "100%",
    height: "75%",
    color: "white",
  },
  rightToolbar: {
    marginLeft: "auto",
  },
  mainGrid: {
    padding: 9,
  },
  emailbody: {
    width: "100%",
    marginTop: 7,
  },
  send: {
    color: "#fff",
    marginTop: theme.spacing(2),
  },
}));

const ActionForm = (props) => {
  const { email, handlePopClose } = props;

  const classes = useStyles();
  return (
    <div style={{ width: "50vw", height: "40vh" }}>
      <header>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.barTxt}>Write Email</Typography>
            <section className={classes.rightToolbar}>
              <IconButton
                onClick={handlePopClose}
                className={`${classes.menuButton} ${classes.closeButton}`}
              >
                <Close />
              </IconButton>
            </section>
          </Toolbar>
        </AppBar>
      </header>
      <body>
        <Grid className={classes.mainGrid} container>
          <Grid item xs={12}>
            {`To: ${email}`}
          </Grid>
          <Grid tem xs={12}>
            <TextField
              multiline
              className={classes.emailbody}
              rows={4}
              id="outlined-multiline-static"
              label="Write Mail"
              variant="outlined"
            />
          </Grid>
          <Grid align="right" item xs={12}>
            <Button
              variant="contained"
              color="primary"
              className={classes.send}
            >
              <Typography>Send</Typography>
            </Button>
          </Grid>
        </Grid>
      </body>
    </div>
  );
};

export default ActionForm;
