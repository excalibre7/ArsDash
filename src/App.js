import React, { Component, useState, useRef } from "react";
import { useEffect } from "react";
import { Route } from "react-router-dom";
import Login from "./pages/login";
import Summary from "./pages/summary";
import { Helmet } from "react-helmet";
import io from "socket.io-client";

function App() {

  const socketRef = useRef();
  const [ chat, setChat ] = useState([]);
  const [ topCards, setTopCards ] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginPressed, setLoginPressed] = useState(false);
  const [loginState, setLoginState] = useState(-1);

  useEffect(
		() => {
			socketRef.current = io.connect("https://zedqwsapi.bluekaktus.com/", { transports: ['websocket'] })
      socketRef.current.on("fromServer", ( msg ) => {
        // setChat([...chat, { emailID, password }])
        setTopCards(msg.topCards)
        console.log("message",msg);
      })
      socketRef.current.on("validLogin", (msg) => {
        setLoginState(1);
				console.log("login successful", msg);
			})
      socketRef.current.on("invalidLogin", (msg) => {
        setLoginState(0);
        console.log("login unsuccessful", msg);
      })
		},
		[ chat, loginPressed ]
	)

  return (
    <React.Fragment>
      <Helmet>
        <title>Delivery Analysis</title>
      </Helmet>
      <div></div>
      <Route exact path="/">
        <Login data={{username: username, password: password, loginState: loginState, setUsername: setUsername, setPassword: setPassword, setLoginState: setLoginState,socketRef:socketRef, loginPressed: loginPressed, setLoginPressed: setLoginPressed}}
        />
      </Route>
      <Route exact path="/app">
        <Summary data={{chat: chat, topCards: topCards, socketRef: socketRef}}
        />
      </Route>
    </React.Fragment>
  );
}

export default App;
