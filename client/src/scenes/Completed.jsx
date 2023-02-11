import { useState, useEffect, useContext } from "react";
import { Box, Button, Toolbar, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import Header from "../components/Header";
import CreateTaskButton from "../components/CreateTaskButton";
import Tasks from "../components/Tasks";
import { AppContext } from "../AppContext";

const Completed = ({ user }) => {
  const [state, dispatch] = useContext(AppContext);
  const theme = useTheme();
  let completedTasks = state.tasks.filter((task) => task.complete);

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
              title="COMPLETED TASKS"
              subtitle={`${user} has accomplished ${completedTasks.length} tasks!`}
            />
            <CreateTaskButton />
          </Box>
          <Tasks isCompleted={true} />
        </Box>
      </main>
    </Box>
  );
};

export default Completed;
