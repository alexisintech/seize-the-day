import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Box sx={{ backgroundColor: "secondary" }}>
        <Typography>{date.day}</Typography>
        <Typography variant="h2">{date.month}</Typography>
        <Typography
          variant="h1"
          color={colors.purpleAccent[500]}
          sx={{
            fontSize: "6rem",
            fontWeight: 200,
          }}
        >
          {date.date}
        </Typography>
        <Typography variant="h3">{date.year}</Typography>
      </Box>
    </Box>
  );
};

export default Calendar;
