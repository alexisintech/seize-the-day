import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Toolbar, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { quotes } from "../quotes";
import Header from "../components/Header";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import Weather from "../components/Weather";

const api_base =
  process.env.NODE_ENV === "development"
    ? "http://localhost:2222"
    : "https://seize-the-day-api.up.railway.app";

const drawerWidth = 300;

function todaysDate() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth(); // don't forget, January is 0!
  const options = { month: "long" };
  const year = date.getFullYear();
  const monthAsString = new Intl.DateTimeFormat("en-US", options).format(date);
  return {
    day,
    month,
    year,
    dateWithString: `${monthAsString} ${day}, ${year}`,
  };
}

export default function Profile() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [day, setDay] = useState("");
  const [user, setUser] = useState("");
  const [quote, setQuote] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    setDay(todaysDate().day);
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, [day]);

  const getUser = () => {
    const token = localStorage.getItem("auth");
    fetch(api_base + "/getUser", {
      headers: { authorization: `bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.message.userName) {
          navigate("/login");
        }

        setUser(data.message.userName);
      })
      .catch((err) => console.error("Error: ", err));
  };

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
              Quote
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
                mt="25px"
              >
                PIE CHART
                <Typography
                  variant="h5"
                  color={colors.greenAccent[500]}
                  sx={{ mt: "15px" }}
                >
                  X Tasks Completed
                </Typography>
              </Box>
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
            >
              Calendar
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
              padding="15px"
            >
              <Weather />
            </Box>
          </Box>
        </Box>
      </main>
    </Box>
  );
}
