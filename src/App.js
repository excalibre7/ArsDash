import React, { Component, useState, useRef } from "react";
import { useEffect } from "react";
import { Route } from "react-router-dom";
import Login from "./pages/login";
import Summary from "./pages/summary";
import { Helmet } from "react-helmet";
import io from "socket.io-client";

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

  useEffect(() =>{
    //earlier this io connection was created evertime valid Login was called, so once user emits login, then io connection id is changed, hence we receive no data on new connection id. this will prevent app from making new connection ids
    if(socketID === "")
    {
    socketRef.current = io.connect("https://zedqwsapi.bluekaktus.com", { transports: ['websocket'] })
    socketRef.current.on("connect", () => {
      setSocketID(socketRef.current.id);
    });
  }
  }, [socketID]);

  useEffect(
		() => {
      // socketRef.current.on("fromServer", ( msg ) => {
      //   console.log("message",msg);
      // })
      socketRef.current.on("connect", () => {
        console.log("socket id app!!!!!",socketRef.current.id); 
      });
      socketRef.current.on("disconnect", (msg) => {
        console.log(msg)
        console.log("I have been disconnected"); 
      });
      socketRef.current.on("validLogin", (msg) => {
        setLoginState(1);
				console.log("login successful", msg);
			})
      socketRef.current.on("invalidLogin", (msg) => {
        setLoginState(0);
        console.log("login unsuccessful", msg);
      })
		},
		[ chat ]
	);

  return (
    <React.Fragment>
      <Helmet>
        <title>ZedQ Reports</title>
      </Helmet>
      <div></div>
      <Route exact path="/">
        <Login data={{username: username, password: password, loginState: loginState, setUsername: setUsername, setPassword: setPassword, setLoginState: setLoginState,socketRef:socketRef}}
        />
      </Route>
      <Route exact path="/app">
        <Summary data={{chat: chat, socketRef: socketRef, loginState: loginState, setSocketID: setSocketID, setLoginState:setLoginState}}/>
      </Route>
    </React.Fragment>
  );
}

export default App;
