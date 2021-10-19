import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#6495ed",
    },
    secondary: {
      main: "#ff0084",
    },
    custom: {
      main: "#ff0084",
    },
    success: {
      main: "#29A746",
    },
    primaryboot: {
      main: "#017CFF",
    },
    warning: {
      main: "#FFC108",
    },
    danger: {
      main: "#DC3646",
    },
  },
  // typography: {
  //   fontFamily: `Roboto`,
  // },
});

export default theme;
