import { useContext } from "react";
import { Box } from "@mui/material";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import Header from "../components/Header";
import Tasks from "../components/Tasks";
import { AppContext } from "../AppContext";
import { UserContext } from "../UserContext";

const InProgress = () => {
  const [state] = useContext(AppContext);
  const { user } = useContext(UserContext);
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
            subtitle={`${user} has ${inProgressTasks.length} tasks left to accomplish!`}
            profile={false}
          />
          <Tasks isCompleted={false} />
        </Box>
      </main>
    </Box>
  );
};

export default InProgress;
