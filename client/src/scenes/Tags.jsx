import { useState, useEffect } from "react";
import { Box, Button, Toolbar, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import Header from "../components/Header";
import ResponsiveDrawer from "../components/ResponsiveDrawer";

const All = () => {
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
          </Box>
        </Box>
      </main>
    </Box>
  );
};

export default All;
