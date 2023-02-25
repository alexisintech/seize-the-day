import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { quotes } from "../utils/quotes";
import Header from "../components/Header";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import Weather from "../components/Weather";
import Calendar from "../components/Calendar";
import Clock from "../components/Clock";

const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [quote, setQuote] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    getUser();
  }, []);

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
        <Box className="content-container">
          {/* HEADER */}
          <Header
            title="PROFILE"
            subtitle={`Welcome ${user}!`}
            profile={true}
          />

          {/* DASHBOARD */}
          <Box
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="minmax(140px, auto)"
            gap="20px"
          >
            {/* ROW 1 */}
            <Box
              gridColumn="span 12"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              sx={{
                p: { xs: 4, s: 5 },
                px: { xs: 4, s: 5, md: 8 },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  textAlign: "center",
                  fontWeight: 300,
                  fontStyle: "italic",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                {/* "{quote}" */}
                "Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Labore, ipsum magnam enim reprehenderit minus veritatis amet,
                adipisci quae commodi impedit dolorum eaque! Neque quidem vero
                mollitia laudantium. Aliquid, soluta iusto!"
              </Typography>
            </Box>

            {/* ROW 2 */}
            <Box
              gridColumn={{ xs: "span 12", md: "span 4" }}
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
              gridColumn={{ xs: "span 12", md: "span 4" }}
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
            >
              <Calendar />
            </Box>
            <Box
              gridColumn={{ xs: "span 12", md: "span 4" }}
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
};

const api_base =
  process.env.NODE_ENV === "development"
    ? "http://localhost:2222"
    : "https://seize-the-day-api.up.railway.app";

export default Profile;
