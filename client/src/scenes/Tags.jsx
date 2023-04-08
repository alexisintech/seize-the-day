import { Box } from "@mui/material";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import Header from "../components/Header";

const Tags = () => {
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
            title="TAGS"
            subtitle={`Tasks organized by tag category`}
            profile={false}
          />
        </Box>
      </main>
    </Box>
  );
};

export default Tags;
