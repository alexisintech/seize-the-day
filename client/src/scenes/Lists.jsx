import { useContext } from "react";
import { Box } from "@mui/material";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import Header from "../components/Header";
import { UserContext } from "../UserContext";

const Lists = () => {
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
            title="LISTS"
            subtitle={`${user}'s lists of tasks with subtasks`}
            profile={false}
          />
        </Box>
      </main>
    </Box>
  );
};

export default Lists;
