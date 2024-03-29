import { useState, useEffect } from "react";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";

const Weather = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [weatherData, setWeatherData] = useState({});
  const [location, setLocation] = useState("miami");
  const [newLocation, setNewLocation] = useState("");

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=03cf018b6db2b45645c9dd6504c3ded3&units=metric`;

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = () => {
    fetch(weatherUrl)
      .then((res) => res.json())
      .then((data) => setWeatherData(data))
      .catch((err) => console.log("Error: ", err));
  };

  const handleClickOpen = () => {
    setNewLocation("");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateLocation = (event) => {
    setLocation(newLocation);
    console.log("This is location, now updated", location);
    setOpen(false);
  };

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
      {Object.entries(weatherData).length > 0 ? (
        <Box
          sx={{
            display: "flex",
            height: "100%",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 0, sm: 3 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              order: { xs: 2, sm: 1 },
              marginBottom: { xs: 2, md: 0 },
            }}
          >
            <Typography variant="h3" onClick={handleClickOpen}>
              {weatherData.name}
            </Typography>
            <Typography
              variant="h1"
              sx={{
                fontSize: "3rem",
                fontWeight: 200,
              }}
            >
              {Math.round(weatherData.main.temp)}°C
            </Typography>
            <Box sx={{ display: "flex", gap: "0.25rem" }}>
              <Typography variant="h4" color={colors.purpleAccent[500]}>
                Humidity:
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 300 }}>
                {Math.round(weatherData.main.humidity)}°C
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              position: "relative",
              order: { xs: 1, sm: 2 },
            }}
          >
            <Box
              component="img"
              maxHeight="200px"
              height={{ xs: "150px", sm: "200px" }}
              src="/imgs/sunny-2.svg"
              sx={{ opacity: 1 }}
            />
          </Box>
        </Box>
      ) : (
        <Typography textAlign="center" variant="h1" className="blinking">
          Loading...
        </Typography>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: `${colors.primary[400]} !important`,
          },
        }}
      >
        <DialogContent sx={{ width: "400px" }}>
          <DialogContentText>Change your location</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Type your location..."
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setNewLocation(e.target.value)}
            value={newLocation}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={updateLocation} sx={{ color: colors.grey[100] }}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Weather;
