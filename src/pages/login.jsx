import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import logoBk from "../img/logo.png";
import io from "socket.io-client";
import { Redirect} from "react-router-dom";

const ApiUrl = "https://qualitylite.bluekaktus.com";
const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
    },
    image: {
        backgroundImage: "url(" + logoBk + ")",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#281d4d",
        backgroundSize: "contain",
        backgroundPosition: "center",
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Login(props) {
    const classes = useStyles();
    const {username} = props.data;
    const {password} = props.data;

      const socketRef = props.data.socketRef;

      const updateLogin = (e) => {
        props.data.setLoginPressed(!props.data.loginPressed);
        let emailID = username;
        props.data.socketRef.current.emit("login", { emailID, password });
        e.preventDefault()
      }

        useEffect(() => {
          window.onpopstate = ()=> { console.log("Back called from signIn screen") }
        }) 
    if (props.data.loginState === 1) {
        return <Redirect to="/app" />;
      } 
      else 
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            value={username}
                            onChange={(e) => props.data.setUsername(e.target.value)}
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => props.data.setPassword(e.target.value)}
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            // type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={updateLogin}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                        </Grid>
                        <Box mt={5}>
                             {props.data.loginState === 0 ? (
                                <Typography
                                    component="h4"
                                    variant="h5"
                                    color="error"
                                >
                                    Invalid Username or Password
                                </Typography>
                            ) : (
                                " "
                            )}
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
