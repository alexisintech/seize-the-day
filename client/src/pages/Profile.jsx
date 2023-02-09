import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { quotes } from "../quotes";
import Header from "../components/Header";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import Weather from "../components/Weather";
import Calendar from "../components/Calendar";
import Clock from "../components/Clock";

export default function Profile() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [quote, setQuote] = useState("");

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
        <Box m="135px 50px">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header title="PROFILE" subtitle={`Welcome (user)!`} />
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
              <Weather />
            </Box>
          </Box>
        </Box>
      </main>
    </Box>
  );
}
