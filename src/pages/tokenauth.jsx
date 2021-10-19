import React, { Component, useEffect } from "react";
import { Redirect, useParams } from "react-router";

const TokenAuth = (props) => {
  const { setBearer, logIn, setLoggedIn } = props;
  let { token } = useParams();
  useEffect(() => {
    setLoggedIn(true);
    setBearer(token);
    logIn(0, token);
  }, []);
  //   setLoggedIn(true);
  //   setBearer(token);
  //   logIn();
  return <Redirect to="/" />;
};

export default TokenAuth;
