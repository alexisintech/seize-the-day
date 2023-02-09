import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Weather = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=miami&appid=03cf018b6db2b45645c9dd6504c3ded3`;
  const [weather, setWeather] = useState({});

  // useEffect(() => {
  //   getWeather();
  // }, []);

  // const getWeather = () => {
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setWeather(result);
  //       console.log(result);
  //     });
  // };

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

    return `${day}, ${date} ${month} ${year}`;
  };

  return (
    <Box
      display="flex"
      minHeight="225px"
      justifyContent="center"
      alignItems="center"
    >
      <Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{ textShadow: "1px 1px rgba(50, 50, 70, 0.5)" }}
          >
            Miami, FL
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontStyle: "italic",
              textShadow: "1px 1px rgba(50, 50, 70, 0.5)",
            }}
          >
            {dateBuilder(new Date())}
          </Typography>
          <Box>
            <Typography
              variant="h1"
              sx={{
                fontSize: "3rem",
                textShadow: "2px 2.2px rgba(50, 50, 70, 0.5)",
              }}
            >
              80°C
            </Typography>
          </Box>
          <Typography variant="h2" sx={{ fontWeight: 600 }}>
            Sunny
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Weather;
