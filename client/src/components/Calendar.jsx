import { Box, Typography, useTheme } from "@mui/material";
import { useState, useEffect } from "react";

const Calendar = () => {
  const [date, setDate] = useState({
    day: "",
    date: 0,
    month: "",
    year: 0,
    time: "",
  });

  const dateBuilder = (d) => {
    let months = [
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
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    function addZero(i) {
      if (i < 10) {
        i = "0" + i;
      }
      return i;
    }
    const time = `${addZero(d.getHours())}:${addZero(d.getMinutes())}`;

    setDate({
      day,
      date,
      month,
      year,
      time,
    });
  };

  useEffect(() => {
    dateBuilder(new Date());
  }, []);

  return (
    <>
      <div>{date.time}</div>
      <div>{date.day}</div>
      <div>{date.month}</div>
      <div>{date.date}</div>
      <div>{date.year}</div>
    </>
  );
};

export default Calendar;
