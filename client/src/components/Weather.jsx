import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Weather = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=miami&appid=03cf018b6db2b45645c9dd6504c3ded3`;
  const [weather, setWeather] = useState();

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = async () => {
    const req = await fetch(url);
    const res = await req.json();
    console.log("this is the res", res);
    await setWeather(res);
    console.log("this is weather state", weather);
  };

  // const kelvinToFahrenheit = () => {
  //   const currentTemp = ((weather.main.temp - 273.15) * 9) / 5 + 32;
  //   console.log(currentTemp);
  //   // return currentTemp;
  // };

  // kelvinToFahrenheit();

  return (
    <Box
      sx={{
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{ textShadow: "1px 1px rgba(50, 50, 70, 0.5)" }}
        >
          {weather.name}
        </Typography>
        <Box>
          <Typography
            variant="h1"
            sx={{
              fontSize: "3rem",
              fontWeight: 200,
              textShadow: "2px 2.2px rgba(50, 50, 70, 0.5)",
            }}
          >
            {/* {weather.main.temp}°C */}
          </Typography>
        </Box>
        <Typography variant="h2" sx={{ fontWeight: 600 }}>
          {/* {weather.weather[0].main} */}
        </Typography>
      </Box>
      <Box
        component="img"
        maxHeight="200px"
        src="../../public/imgs/sunny.svg"
      />
    </Box>
  );
};

export default Weather;
