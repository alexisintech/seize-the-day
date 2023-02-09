import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Weather = ({ data }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // const celsiusToFahrenheit = () => {
  //   const currentTemp = ((data.main.temp - 273.15) * 9) / 5 + 32;
  //   console.log(currentTemp);
  //   // return currentTemp;
  // };

  // celsiusToFahrenheit();

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
      {Object.entries(data).length > 0 ? (
        <Box
          sx={{
            display: "flex",
            gap: 3,
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
              {data.name}
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: "3rem",
                fontWeight: 200,
                textShadow: "2px 2.2px rgba(50, 50, 70, 0.5)",
              }}
            >
              {Math.round(data.main.temp)}°C
            </Typography>
            <Typography
              variant="h4"
              sx={{
                // fontSize: "3rem",
                fontWeight: 300,
                textShadow: "2px 2.2px rgba(50, 50, 70, 0.5)",
              }}
            >
              Humidity: {Math.round(data.main.humidity)}°C
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              position: "relative",
              mb: 3,
            }}
          >
            <Box component="img" maxHeight="200px" src="/imgs/sunny-2.svg" />
            <Typography
              variant="h3"
              sx={{
                fontWeight: 600,
                position: "absolute",
                bottom: "1%",
                right: "10%",
              }}
            >
              {data.weather[0].description}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Typography textAlign="center" variant="h1" className="blinking">
          Loading...
        </Typography>
      )}
    </Box>
  );
};

export default Weather;
