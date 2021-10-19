import React, { Component, useEffect, useState } from "react";
import {
  DateRangePicker,
  DateRange,
} from "@matharumanpreet00/react-daterange-picker";
import {
  IconButton,
  TextField,
  Popover,
  Typography,
  Button,
} from "@material-ui/core";
import TodayIcon from "@material-ui/icons/Today";

const RangePicker = (props) => {
  const { type, setDateRange, initialDates } = props;
  const [calOpen, setCalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [range, setRange] = useState({
    startDate: new Date("1-Jan-2014"),
    endDate: new Date("1-Jan-2023"),
  });
  const [displayDates, setDisplayDates] = useState({
    startDate: "1-Jan-2014",
    endDate: "1-Jan-2023",
  });

  const open = Boolean(anchorEl);

  const handleClose = () => {
    convertDate();
    setAnchorEl(null);
    setDateRange(type, range);
  };
  const handleClick = (event) => {
    setCalOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    convertDate();
  }, []);

  const convertDate = () => {
    let displayDateStart =
      range.startDate.getDate() +
      "-" +
      months[range.startDate.getMonth()] +
      "-" +
      range.startDate.getFullYear();

    let displayDateEnd =
      range.endDate.getDate() +
      "-" +
      months[range.endDate.getMonth()] +
      "-" +
      range.endDate.getFullYear();

    setDisplayDates({ startDate: displayDateStart, endDate: displayDateEnd });
  };

  return (
    <React.Fragment>
      <IconButton onClick={handleClick}>
        <TodayIcon />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <DateRangePicker
          initialDateRange={initialDates}
          open={calOpen}
          onChange={(range) => setRange(range)}
        />
      </Popover>
      {initialDates.startDate.getDate() +
        "-" +
        months[initialDates.startDate.getMonth()] +
        "-" +
        initialDates.startDate.getFullYear() +
        " to " +
        initialDates.endDate.getDate() +
        "-" +
        months[initialDates.endDate.getMonth()] +
        "-" +
        initialDates.endDate.getFullYear()}
    </React.Fragment>
  );
};

export default RangePicker;
