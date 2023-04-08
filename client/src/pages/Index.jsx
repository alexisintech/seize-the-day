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
      sx={{
        backgroundImage: `url(${"../imgs/index-bg.svg"})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "bottom",
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
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
          className="index-shitty-grid"
          sx={{
            justifyContent: { xs: "center", sm: "flex-start" },
            textAlign: { xs: "center", sm: "left" },
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
          }}
        >
          <Grid item xs={12} sm={6} my="auto">
            <Grid item xs={12} sx={{ marginBottom: 2 }}>
              <IconButton
                onClick={colorMode.toggleColorMode}
                sx={{ p: 1, mb: 1, position:"relative", right:"10px" }}
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
            <Grid
              display="flex"
              justifyContent={{ xs: "center", sm: "flex-start" }}
              gap={2}
              mt={2}
            >
              <Grid item>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button
                    variant="outlined"
                    type="button"
                    sx={{
                      color: colors.blueAccent[100],
                      border: `1px solid ${colors.blueAccent[100]}`,
                      "&:hover": {
                        border: `1px solid ${colors.purpleAccent[500]}`,
                        color: `${theme.palette.mode === "dark" ? colors.purpleAccent[500] : "white"}`,
                        backgroundColor: `${theme.palette.mode === "dark" ? "white" : "rgb(13, 23, 201, 0.7)"}`,
                      },
                    }}
                  >
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
          <Grid item xs={7} sm={6}>
            <Box
              component="img"
              maxHeight="500px"
              src="/imgs/undraw-reminder-illustration.svg"
              alt="an illustration of woman leaning against a phone; the phone has a bulleted list on the screen"
              sx={{ opacity: 1 }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Index;
