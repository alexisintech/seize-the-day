import { useContext } from "react";
import { Box } from "@mui/material";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import Header from "../components/Header";
import Tasks from "../components/Tasks";
import { AppContext } from "../AppContext";
import { UserContext } from "../UserContext";

const Completed = () => {
  const [state] = useContext(AppContext);
  const user = useContext(UserContext);
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
        <Box className="content-container">
          <Header
            title="ACCOMPLISHMENTS"
            subtitle={`${user} has accomplished ${completedTasks.length} tasks!`}
            profile={false}
          />
          <Tasks isCompleted={true} />
        </Box>
      </main>
    </Box>
  );
};

export default Completed;
