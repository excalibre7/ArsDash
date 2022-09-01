import React, { Component, useState, useRef } from "react";
import { useEffect } from "react";
import { Route } from "react-router-dom";
import ARSDash from "./pages/ARSDash";
import { Helmet } from "react-helmet";

function App() {

  if (typeof window !== 'undefined') {
    window.React = React;
}

  const socketRef = useRef();
  const [ chat, setChat ] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginState, setLoginState] = useState(-1);
  const [socketID, setSocketID] = useState("");

  return (
    <React.Fragment>
      <Helmet>
        <title>ZedQ Reports</title>
      </Helmet>
      <div></div>
      {/* <Route exact path="/">
        <Login data={{username: username, password: password, loginState: loginState, setUsername: setUsername, setPassword: setPassword, setLoginState: setLoginState,socketRef:socketRef}}
        />
      </Route>
      <Route exact path="/app">
        <Summary data={{chat: chat, socketRef: socketRef, loginState: loginState, setSocketID: setSocketID, setLoginState:setLoginState}}/>
      </Route> */}
      <Route exact path="/">
        <ARSDash/>
      </Route>
    </React.Fragment>
  );
}

export default App;
