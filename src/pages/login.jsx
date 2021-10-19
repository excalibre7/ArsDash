import React, { Component, Fragment } from "react";
import { Grid } from "@material-ui/core";
import LoginForm from "../components/loginForm.jsx";
import { Redirect } from "react-router-dom";

export default class Login extends Component {
  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/summary" />;
    } 
    else {
      return (
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          style={{ minHeight: "90vh" }}
        >
          <Grid item xs={10} sm={4}>
            <LoginForm
              setClientID={this.props.setClientID}
              setLoggedIn={this.props.setLoggedIn}
              logIn={this.props.logIn}
            />
          </Grid>
        </Grid>
      );
    }
  }
}
// import React, { useState, useEffect } from "react";
// import Avatar from "@material-ui/core/Avatar";
// import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import TextField from "@material-ui/core/TextField";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Checkbox from "@material-ui/core/Checkbox";
// import Link from "@material-ui/core/Link";
// import Paper from "@material-ui/core/Paper";
// import Box from "@material-ui/core/Box";
// import Grid from "@material-ui/core/Grid";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
// import logoBk from "../assets/logo.png";
// import imLogo from "../image/image.jpg";
// import arvindLogo from "../assets/arvindLogo.png";
// import { useHistory, Redirect, useLocation } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { login } from "../feature/userSlice";
// import { useCookies } from 'react-cookie';

// const ApiUrl = "https://qualitylite.bluekaktus.com";
// const useStyles = makeStyles((theme) => ({
//     root: {
//         height: "100vh",
//     },
//     image: {
//         backgroundImage: "url(" + logoBk + ")",
//         backgroundRepeat: "no-repeat",
//         backgroundColor: "#281d4d",
//         backgroundSize: "contain",
//         backgroundPosition: "center",
//     },
//     paper: {
//         margin: theme.spacing(8, 4),
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//     },
//     avatar: {
//         margin: theme.spacing(1),
//         backgroundColor: theme.palette.secondary.main,
//     },
//     form: {
//         width: "100%", // Fix IE 11 issue.
//         marginTop: theme.spacing(1),
//     },
//     submit: {
//         margin: theme.spacing(3, 0, 2),
//     },
// }));

// export default function Login({state}) {
//     const classes = useStyles();
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const location = useLocation();
//     const history = useHistory();
//     const dispatch = useDispatch();
//     const handleClick = () => history.push("/signup");
//     const [cookies, setCookie] = useCookies(['user']);

//     useEffect(() => {
//         window.onpopstate = ()=> { console.log("Back called from signIn screen") }
//       })

//     if (state && state.loginStatus === 1) {
//       return <Redirect to="/reportvendor" />;
//         return state.setRedirectData({redirectStatus: true, state: {}, path: "/reportvendor"});
//       //  return <Redirect to="/reportvendor" />;
//       } 
//       else if(Object.keys(cookies).length != 0){
//           state.setLoginFunction(cookies.user.name, cookies.user.password, cookies.user.data);
//           return true
//       }
//       else 
//     return (
//         <Grid container component="main" className={classes.root}>
//             <CssBaseline />
//             <Grid item xs={false} sm={4} md={7} className={classes.image} />
//             {/* <Grid item xs={false} sm={3} md={7} style={{
//         backgroundImage: "url(" + arvindLogo + ")",
//         backgroundRepeat: "no-repeat",
//         backgroundColor: "#281d4d",
//         backgroundPosition: "center",
//     }} /> */}
//             <Grid
//                 item
//                 xs={12}
//                 sm={8}
//                 md={5}
//                 component={Paper}
//                 elevation={6}
//                 square
//             >
//                 <div className={classes.paper}>
//                     <Avatar className={classes.avatar}>
//                         <LockOutlinedIcon />
//                     </Avatar>
//                     <Typography component="h1" variant="h5">
//                         Sign in
//                     </Typography>
//                     <form className={classes.form} noValidate>
//                         <TextField
//                             variant="outlined"
//                             margin="normal"
//                             required
//                             fullWidth
//                             id="username"
//                             label="Username"
//                             name="username"
//                             value={username}
//                             onChange={(e) => setUsername(e.target.value)}
//                             autoComplete="username"
//                             autoFocus
//                         />
//                         <TextField
//                             variant="outlined"
//                             margin="normal"
//                             required
//                             fullWidth
//                             name="password"
//                             label="Password"
//                             type="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             id="password"
//                             autoComplete="current-password"
//                         />
//                         {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
//                         <Button
//                             // type="submit"
//                             fullWidth
//                             variant="contained"
//                             color="primary"
//                             className={classes.submit}
//                             onClick={() => {
//                                 state.LogIn(username, password);
//                             }}
//                         >
//                             Sign In
//                         </Button>
//                         <Grid container>
//                             {/* <Grid item xs>
//                 <Link href="#" variant="body2">
//                   Forgot password?
//                 </Link>
//               </Grid> */}
//                             {/* <Grid item xs>
// 								<Link to="/" onClick={handleClick} variant="body2">
// 									{"Don't have an account? Sign Up"}
// 								</Link>
// 							</Grid> */}
//                         </Grid>
//                         <Box mt={5}>
//                             {state && state.loginStatus === 0 ? (
//                                 <Typography
//                                     component="h4"
//                                     variant="h5"
//                                     color="error"
//                                 >
//                                     Invalid Username or Password
//                                 </Typography>
//                             ) : (
//                                 " "
//                             )}
//                         </Box>
//                     </form>
//                 </div>
//             </Grid>
//         </Grid>
//     );
//                             //}
// }
