import React, { Component, useState } from "react";
import { useEffect } from "react";
import { Route } from "react-router-dom";
import Login from "./pages/login";
import Summary from "./pages/summary";
import { Helmet } from "react-helmet";

function App() {
  return (
    <React.Fragment>
      <Helmet>
        <title>Delivery Analysis</title>
      </Helmet>
      <div></div>
      <Route exact path="/">
        <Summary
        />
      </Route>
    </React.Fragment>
  );
}

export default App;
