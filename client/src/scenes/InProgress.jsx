import { useState, useEffect, useContext } from "react";
import { Box, Button, Toolbar, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import Header from "../components/Header";
import CreateTaskButton from "../components/CreateTaskButton";
import Tasks from "../components/Tasks";
import { AppContext } from "../AppContext";

const InProgress = () => {
  const [state, dispatch] = useContext(AppContext);
  const theme = useTheme();
  let inProgressTasks = state.tasks.filter((task) => !task.complete);

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
            title="WHAT I WILL ACCOMPLISH"
            subtitle={`(user) has ${inProgressTasks.length} tasks left to accomplish!`}
            profile={false}
          />
          <Tasks isCompleted={false} />
        </Box>
      </main>
    </Box>
  );
};

export default InProgress;
