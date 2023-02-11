import { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import Header from "../components/Header";
import CreateTaskButton from "../components/CreateTaskButton";
import Tasks from "../components/Tasks";

const All = () => {
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
        <Box m="135px 50px">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header
              title="ALL TASKS"
              subtitle={`${user} has (tasks.length) tasks to accomplish today!`}
            />
            <CreateTaskButton />
          </Box>
          <Typography>Completed:</Typography>
          <Tasks isCompleted={true} />
          <Typography>In Progress:</Typography>
          <Tasks isCompleted={false} />
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
