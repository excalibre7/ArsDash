import PredictionTable from "../components/predictionTable";
import React, { Component, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import BackFloating from "../components/backfloating";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "white",
  },
}));

const Predict = (props) => {
  const { prediction, loggedIn } = props;
  const [redirect, setRedirect] = useState(false);
  var classes = useStyles();
  const handleClick = () => {
    //in order to redirect user back to home
    setRedirect(true);
  };
  var items = [];
  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  for (var key in prediction) {
    var locData = prediction[key];
    // locData.onTimeTrue = locData.onTimeTrue.toFixed(2);
    var toPush = { name: toTitleCase(key), data: locData };
    items.push(toPush);
  }
  // console.log(items)

  items.sort(function (a, b) {
    var keyA = a.data.onTimeTrue;
    var keyB = b.data.onTimeTrue;
    if (keyB > keyA) {
      return 1;
    } else {
      return -1;
    }
  });

  if (redirect) {
    return <Redirect to="/vendor-rating" />;
  } else if (loggedIn) {
    return (
      <div>
        <PredictionTable style={{ paddingBottom: "100px" }} data={items} />
        <BackFloating handleClick={handleClick} />
      </div>
    );
  } else {
    return <Redirect to="/" />;
  }
};

export default Predict;
