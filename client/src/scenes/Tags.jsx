import { useState, useEffect } from "react";
import { Box, Button, Toolbar, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import Header from "../components/Header";
import CreateTaskButton from "../components/CreateTaskButton";

const Tags = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
            <Header title="TAGS" subtitle={`Tasks organized by tag category`} />
            <CreateTaskButton />
          </Box>
        </Box>
      </main>
    </Box>
  );
};

export default Tags;
