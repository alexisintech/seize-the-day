import { useContext } from "react";
import { Box, Typography } from "@mui/material";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import Header from "../components/Header";
import Tasks from "../components/Tasks";
import { AppContext } from "../AppContext";
import { UserContext } from "../UserContext";

const All = () => {
  const [state] = useContext(AppContext);
  const user = useContext(UserContext);

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
              gap: { xs: 4, sm: 5 },
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

export default All;
