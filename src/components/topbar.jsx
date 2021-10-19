import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  InputBase,
  Grid,
  Box,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { fade } from "@material-ui/core/styles";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "../stylesheets/App.css";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
import { VisibilityOff, Visibility, ExitToApp } from "@material-ui/icons";

const useStyles = makeStyles((theme, page) => ({
  root: {
    backgroundColor: "#012F51", //to change background colour of app bar
    height: 65,
    flexGrow: 1,
  },
  summary: {
    paddingLeft: theme.spacing(3),
  },
  barTxt: {
    marginLeft: theme.spacing(3),
    color: "white",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0)",
    },
  },
  initial: {
    color: "white",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0)",
    },
  },
  itemStyle: {
    color: "white",
    fontSize: "1rem",
    padding: theme.spacing(1, 1, 1, 1),
  },
  selectedColor: {
    color: "#ECA8B4", //to change font colour of title
  },
  rightbuttons: {
    marginLeft: "auto",
  },
  divsearch: {
    marginLeft: theme.spacing(52),
  },
  filter: {
    color: "#ffffff",
    height: "3.5vh",
  },
  filterText: {
    paddingRight: theme.spacing(2),
    color: "#ffffff",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    color: "#fff",
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  searchPad: {
    marginTop: theme.spacing(0.8),
  },
  inputRoot: {
    color: "#fff",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },

  inputInputActiveOrders: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  visbilityoff: {
    color: "white",
  },
  menu: {
    color: "white",
  },
  sync: {
    fontSize: "0.8rem",
    color: "#fff",
    paddingRight: theme.spacing(5),
  },
}));

const TopBar = (props) => {
  const {
    page,
    changeFilter,
    showFilter,
    handleSearch,
    showLegend,
    setShowLegend,
    weekWise,
    lastSync,
  } = props;
  let classes = useStyles(page);

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <IconButton
          onClick={() => window.location.reload()}
          style={{ paddingLeft: 0 }}
        >
          <ExitToApp className={classes.menu} />
        </IconButton>
        <Button
          component={Link}
          to={"/vendor-rating"}
          className={`${classes.initial} ${
            page == "vendor_rating" ? "selected" : "underline"
          }`}
        >
          <Typography
            className={`${classes.itemStyle} ${
              page == "vendor_rating" ? classes.selectedColor : null
            }`}
          >
            Vendor Rating
          </Typography>
        </Button>
        <Button
          component={Link}
          to={"/active-orders"}
          className={`${classes.barTxt} ${
            page == "active_orders" ? "selected" : "underline"
          }`}
        >
          <Typography
            className={`${classes.itemStyle} ${
              page == "active_orders" ? classes.selectedColor : null
            }`}
          >
            Active Orders
          </Typography>
        </Button>
        <div className={classes.summary}>
          <Button
            component={Link}
            to={"/summary"}
            className={`${classes.initial} ${
              page == "summary" ? "selected" : "underline"
            }`}
          >
            <Typography
              className={`${classes.itemStyle} ${
                page == "summary" ? classes.selectedColor : null
              }`}
            >
              Summary
            </Typography>
          </Button>
        </div>
        {page == "active_orders" || page == "qty" ? (
          // style={{ border: "5px solid black" }}
          <div className={classes.rightbuttons}>
            <Grid container>
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                minHeight="100%"
                className={classes.totalqtybox}
                // style={{ borderStyle: "solid" }}
              >
                <Typography className={classes.sync}>
                  Last synced: {lastSync}
                </Typography>
              </Box>
              <div
                style={{ height: "50%" }}
                className={`${classes.search} ${classes.searchPad}`}
              >
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInputActiveOrders,
                  }}
                  onChange={handleSearch}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
              <IconButton onClick={changeFilter}>
                <Typography className={classes.filterText}>
                  {showFilter ? "CLOSE FILTERS" : "SHOW FILTERS"}
                </Typography>
                <FilterListIcon className={classes.filter} />
              </IconButton>
            </Grid>
          </div>
        ) : page == "vendor_rating" ? (
          <div className={classes.rightbuttons}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                onChange={handleSearch}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </div>
        ) : page == "summary" ? (
          <div className={classes.rightbuttons}>
            <Grid container>
              <div
                style={{ height: "50%" }}
                className={`${classes.search} ${classes.searchPad}`}
              >
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInputActiveOrders,
                  }}
                  onChange={handleSearch}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
              {weekWise == true ? null : showLegend ? (
                <IconButton onClick={() => setShowLegend(false)}>
                  <Visibility className={classes.visbilityoff} />
                </IconButton>
              ) : (
                <IconButton onClick={() => setShowLegend(true)}>
                  <VisibilityOff className={classes.visbilityoff} />
                </IconButton>
              )}
            </Grid>
          </div>
        ) : null}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
