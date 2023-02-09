import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Toolbar, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { quotes } from "../quotes";
import Header from "../components/Header";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import Weather from "../components/Weather";
import Calendar from "../components/Calendar";
import Clock from "../components/Clock";

const api_base =
  process.env.NODE_ENV === "development"
    ? "http://localhost:2222"
    : "https://seize-the-day-api.up.railway.app";

const drawerWidth = 300;

export default function Profile() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [user, setUser] = useState("");
  const [quote, setQuote] = useState("");
  const navigate = useNavigate();
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=miami&appid=03cf018b6db2b45645c9dd6504c3ded3&units=metric`;
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    // getUser();
    getWeather();
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  // const getUser = () => {
  //   const token = localStorage.getItem("auth");
  //   fetch(api_base + "/getUser", {
  //     headers: { authorization: `bearer ${token}` },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (!data.message.userName) {
  //         navigate("/login");
  //       }

  //       setUser(data.message.userName);
  //     })
  //     .catch((err) => console.error("Error: ", err));
  // };

  const getWeather = () => {
    fetch(weatherUrl)
      .then((res) => res.json())
      .then((data) => setWeatherData(data))
      .catch((err) => console.log("Error: ", err));
  };

  console.log(weatherData);

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        height: "100vh",
        width: "100vW",
      }}
    >
      <ResponsiveDrawer />
      <main className="content">
        <Box m="135px 50px">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header title="PROFILE" subtitle={`Welcome ${user}!`} />
          </Box>

          {/* GRID & CHARTS */}
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="140px"
            gap="20px"
          >
            {/* ROW 1 */}
            <Box
              gridColumn="span 12"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="h4"
                sx={{ fontWeight: 300, fontStyle: "italic" }}
              >
                "{quote}"
              </Typography>
            </Box>

            {/* ROW 2 */}
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              p="30px"
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                height="100%"
                width="100%"
              >
                <Clock />
              </Box>
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
            >
              <Calendar />
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              padding="15px"
            >
              <Weather data={weatherData} />
            </Box>
          </Box>
        </Box>
      </main>
    </Box>
  );
}
