import React, { Component } from "react";
import "../stylesheets/grid.css";
import { Button, ButtonGroup, Popover } from "@material-ui/core";
import ActionForm from "./actionForm";

const ActionableDropdown = (props) => {
  const { actions, gridRef, setBlur, emails } = props;
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [activeEmail, setActiveEmail] = React.useState("");

  const handleActionClick = (_id) => {
    if (_id == 1) {
      setAnchorEl(gridRef.current);
      setActiveEmail(emails.VENDOR);
      setBlur("blur(5px)");
    }
    if (_id == 2) {
      setAnchorEl(gridRef.current);
      setActiveEmail(emails.CATEGORY_HEAD);
      setBlur("blur(5px)");
    }
    setMenuOpen(false);
  };

  const handlePopClose = () => {
    setAnchorEl(null);
    setBlur("none");
  };

  const formOpen = Boolean(anchorEl);
  const id = formOpen ? "simple-popover" : undefined;

  return (
    <React.Fragment>
      <Button
        onClick={() => setMenuOpen(!menuOpen)}
        style={
          menuOpen
            ? { color: "white", backgroundColor: "#3c67bf" }
            : { color: "white", backgroundColor: "#017CFF" }
        }
        variant="contained"
      >
        Action
      </Button>
      <div
        hidden={menuOpen ? false : true}
        style={{
          zIndex: menuOpen ? 1 : null,
          position: "relative", // required when applying z-index
          cursor: "pointer",
          backgroundColor: "rgba(0,0,0,0)",
          paddingTop: 7,
        }}
      >
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical outlined primary button group"
          variant="contained"
        >
          {actions.map((element) => (
            <Button
              key={element.ACTION_ID}
              onClick={() => handleActionClick(element.ACTION_ID)}
              style={{
                fontSize: "0.9rem",
                color: "#000",
                backgroundColor: "#fff",
                textTransform: "none",
              }}
              className="dropitem"
            >
              {element.ACTION_NAME}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <Popover
        id={id}
        open={formOpen}
        onClose={handlePopClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <ActionForm email={activeEmail} handlePopClose={handlePopClose} />
      </Popover>
    </React.Fragment>
  );
};

export default ActionableDropdown;

// import React from "react";
// import ReactDom from "react-dom";
// import { ButtonGroup, Button } from "@material-ui/core";
// import "../stylesheets/grid.css";

// const FakeMenu = (actions) => null;

// class ActionableDropdown extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       isMenuOpen: false,
//     };
//     this.toggleMenu = this.toggleMenu.bind(this);
//     this.closeMenu = this.closeMenu.bind(this);
//     this.testConsole = this.testConsole.bind(this);
//   }
//   render() {
//     const { value } = this.props;
//     const { isMenuOpen } = this.state;

//     const style = {
//       zIndex: isMenuOpen ? 1 : null,
//       position: "relative", // required when applying z-index
//       cursor: "pointer",
//       backgroundColor: value,
//       paddingTop: 7,
//     };

//     return (
//       <div onBlur={this.closeMenu} style={style}>
//         <div onBlur={this.closeMenu}>
//           <Button
//             onClick={this.toggleMenu}
//             style={
//               isMenuOpen
//                 ? { color: "white", backgroundColor: "#3c67bf" }
//                 : { color: "white", backgroundColor: "#017CFF" }
//             }
//             variant="contained"
//           >
//             Action
//           </Button>
//         </div>
//         <div>
//           {isMenuOpen ? (
//             <ButtonGroup
//               orientation="vertical"
//               aria-label="vertical outlined primary button group"
//               variant="contained"
//             >
//               {this.props.actions.map((item) => (
//                 <Button
//                   key={item.id}
//                   style={{
//                     fontSize: "0.9rem",
//                     color: "#000",
//                     backgroundColor: "#fff",
//                     textTransform: "none",
//                   }}
//                   className="dropitem"
//                 >
//                   {item.ACTION_NAME}
//                 </Button>
//               ))}
//             </ButtonGroup>
//           ) : null}
//         </div>
//       </div>
//     );
//   }

//   testConsole() {
//     console.log("test");
//   }

//   toggleMenu() {
//     this.setState({ isMenuOpen: !this.state.isMenuOpen });
//   }

//   closeMenu() {
//     this.setState({ isMenuOpen: false });
//   }
// }

// export default ActionableDropdown;
