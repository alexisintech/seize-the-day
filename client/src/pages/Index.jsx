import {
  Grid,
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Link } from "react-router-dom";

const Index = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      display="flex"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: { xs: "center", sm: "flex-start" },
            textAlign: { xs: "center", sm: "left" },
            width: { xs: "100%", sm: "40%" },
          }}
        >
          <Grid item xs={6} my="auto">
            <Grid item xs={12} sx={{ marginBottom: 2 }}>
              <IconButton
                onClick={colorMode.toggleColorMode}
                sx={{ p: 0, mb: 1 }}
              >
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlinedIcon />
                ) : (
                  <LightModeOutlinedIcon />
                )}
              </IconButton>
              <Typography variant="h1">Seize The Day</Typography>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 1 }}>
              <Typography variant="h4">
                Organize your day, mindfully.
              </Typography>
            </Grid>
            <Grid display="flex" gap={2} mt={2}>
              <Grid item>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button variant="outlined" type="button" color="secondary">
                    Login
                  </Button>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <Button variant="contained" type="button" color="secondary">
                    Signup
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Box
              component="img"
              maxHeight="500px"
              src="../../public/imgs/undraw-reminder-illustration.svg"
              alt=""
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Index;
