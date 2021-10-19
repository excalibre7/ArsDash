import React, { Component, useEffect } from "react";
import { Redirect } from "react-router-dom";

const Auth = (props) => {
  const { id, setClientID, logIn, setLoggedIn } = props;
  useEffect(() => {
    setLoggedIn(true);
    setClientID(id);
    logIn(id);
  }, []);

  return <Redirect to="/" />;
};

export default Auth;
