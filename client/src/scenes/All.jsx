import { useState, useEffect, useContext } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import Header from "../components/Header";
import Tasks from "../components/Tasks";
import { AppContext } from "../AppContext";

const All = () => {
  const [state, dispatch] = useContext(AppContext);
  const [user, setUser] = useState("");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
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
          <Header
            title="ALL TASKS"
            subtitle={`${user} has ${state.tasks.length} tasks to accomplish today!`}
            profile={false}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              width: "100%",
              gap: { xs: 4, sm: 10 },
            }}
          >
            <Box className="tasks-container">
              <Typography variant="h3" textAlign={{ xs: "center", sm: "left" }}>
                What I will accomplish:
              </Typography>
              <Tasks isCompleted={false} />
            </Box>
            <Box className="tasks-container">
              <Typography variant="h3" textAlign={{ xs: "center", sm: "left" }}>
                What I have accomplished:
              </Typography>
              <Tasks isCompleted={true} />
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

export default All;
