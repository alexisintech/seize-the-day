import { useState, useEffect, useContext } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { quotes } from "../utils/quotes";
import Header from "../components/Header";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import Weather from "../components/Weather";
import Calendar from "../components/Calendar";
import Clock from "../components/Clock";
import { UserContext } from "../UserContext";

const Profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [quote, setQuote] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

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
                "{quote}"
              </Typography>
            </Box>

            {/* ROW 2 */}
            <Box
              gridColumn={{ xs: "span 12", sm: "span 6", lg: "span 4" }}
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
              gridColumn={{ xs: "span 12", sm: "span 6", lg: "span 4" }}
              gridRow="span 2"
              backgroundColor={colors.primary[400]}
            >
              <Calendar />
            </Box>
            <Box
              gridColumn={{ xs: "span 12", sm: "span 12", lg: "span 4" }}
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

export default Profile;
