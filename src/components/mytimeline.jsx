import { Step, StepConnector, StepLabel, Stepper } from "@material-ui/core";
import React, { Component } from "react";
import { Timeline, TimelineEvent } from "@mailtop/horizontal-timeline";
import { FaFlagCheckered } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiCheckShield } from "react-icons/bi";
import "../stylesheets/timeline.css";
//order date, Fab in house, PCD, Deliver Date, GRN
const MyTimeline = (props) => {
  const { row } = props;

  const getTimelineColor = (delay) => {
    if (delay <= 0) {
      return "#49b675";
    } else if (delay <= 4 && delay >= 1) {
      return "#ffce00";
    } else {
      return "#c4342d";
    }
  };

  const getIcon = (status) => {
    if (status == "P") {
      return AiOutlineClockCircle;
    } else if (status == "C") {
      return BiCheckShield;
    }
  };

  return (
    <div style={{ paddingLeft: "50px" }}>
      <Timeline variant="default">
        <TimelineEvent
          color={getTimelineColor(-1)}
          icon={FaFlagCheckered}
          title="Order Date"
          subtitle={<p>{row.ORDER_DATE}</p>}
        />
        <TimelineEvent
          color={getTimelineColor(row.FAB_IN_DELAY)}
          icon={getIcon(row.FAB_IN_STATUS)}
          title="Fab-in-House"
          subtitle={
            <React.Fragment>
              <p className="marginover">
                <b>Delay: </b>
                {row.FAB_IN_DELAY}
              </p>
              <p className="marginover">
                <b>Expected Date: </b>
                {row.FAB_IN_PREDICT}
              </p>
              <p className="marginover">
                <b>Commit Date: </b>
                {row.FAB_IN_COMMIT}
              </p>
            </React.Fragment>
          }
        />
        <TimelineEvent
          color={getTimelineColor(row.PCD_DELAY)}
          icon={getIcon(row.PCD_STATUS)}
          title="PCD"
          subtitle={
            <React.Fragment>
              <p className="marginover">
                <b>Delay: </b>
                {row.PCD_DELAY}
              </p>
              <p className="marginover">
                <b>Expected Date: </b>
                {row.PCD_PREDICT}
              </p>
              <p className="marginover">
                <b>Commit Date: </b>
                {row.PCD_COMMIT}
              </p>
            </React.Fragment>
          }
        />
        <TimelineEvent
          color={getTimelineColor(row.GPD_DELAY)}
          icon={getIcon(row.GPD_STATUS)}
          title="GPD"
          subtitle={
            <React.Fragment>
              <p className="marginover">
                <b>Delay: </b>
                {row.GPD_DELAY}
              </p>
              <p className="marginover">
                <b>Expected Date: </b>
                {row.GPD_PREDICT}
              </p>
              <p className="marginover">
                <b>Commit Date: </b>
                {row.GPD_COMMIT}
              </p>
            </React.Fragment>
          }
        />
        <TimelineEvent
          color={getTimelineColor(row.GRN_DELAY)}
          icon={getIcon(row.GRN_STATUS)}
          title="GRN"
          subtitle={
            <React.Fragment>
              <p className="marginover">
                <b>Delay: </b>
                {row.GRN_DELAY}
              </p>
              <p className="marginover">
                <b>Expected Date: </b>
                {row.GRN_PREDICT}
              </p>
              <p className="marginover">
                <b>Commit Date: </b>
                {row.GRN_COMMIT}
              </p>
            </React.Fragment>
          }
          // action={{
          //   label: "Ver detalhes...",
          //   onClick: () => window.alert("Erro!"),
          // }}
        />
      </Timeline>
    </div>
  );
};

export default MyTimeline;
