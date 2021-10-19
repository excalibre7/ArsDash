import React, { Component, Fragment } from "react";
import Logo from "../img/BK.png";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  CardHeader,
  Avatar,
  InputAdornment,
} from "@material-ui/core";
import { Send, AccountCircle, VpnKey } from "@material-ui/icons";

const styles = (theme) => ({
  card: {
    minWidth: 275,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  action: {
    flexDirection: "row-reverse",
  },
});

export default withStyles(styles)(
  class LoginForm extends Component {
    state = {
      error_: false,
    };
    constructor(props) {
      super(props);
      this.state = {
        username: "",
        password: "",
        error_: false,
        called: 0,
      };
      this.handleValidation = this.handleValidation.bind(this);
      this.handleClick = this.handleClick.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange =
      (name) =>
      ({ target: { value } }) =>
        this.setState({
          [name]: value,
        });

    handleValidation = () => {
      const { username, password } = this.state;
      return username.length > 1 && password.length > 1;
    };

    handleKeyPress = (e) => {
      //console.log(this.handleValidation())
      if (/enter/gi.test(e.key) && this.handleValidation()) {
        this.handleClick();
      }
    };

    handleClick = () => {
      const { username, password } = this.state;
      this.props.logIn(username, password);
    };

    // validateusername = () => {
    //   const { username } = this.state;
    //   if (username.length < 1) return false;
    //   return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(username);
    // };

    render() {
      const { classes } = this.props,
        { username, password } = this.state;

      return (
        <Fragment>
          <Card className={classes.card}>
            <CardHeader
              avatar={<Avatar src={Logo} className={classes.avatar} />}
              title="Access"
            />
            <CardContent>
              <TextField
                required
                id="username"
                label="Username"
                value={username}
                onChange={this.handleChange("username")}
                onKeyDown={this.handleKeyPress}
                // error={this.validateusername()}
                margin="normal"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                required
                id="password"
                label="Password"
                helperText=""
                value={password}
                type="password"
                onChange={this.handleChange("password")}
                onKeyDown={this.handleKeyPress}
                margin="normal"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <VpnKey />
                    </InputAdornment>
                  ),
                }}
              />
            </CardContent>
            <CardActions className={classes.action}>
              <Button
                id="btn_login"
                onClick={(e) => this.handleClick()}
                disabled={!this.handleValidation()}
                color="primary"
                className={classes.button}
                variant="contained"
              >
                <Send className={classes.extendedIcon} />
                Login
              </Button>
            </CardActions>
          </Card>
          {this.state.error ? (
            <p style={{ color: "red" }}>Incorrect password</p>
          ) : null}
        </Fragment>
      );
    }
  }
);
