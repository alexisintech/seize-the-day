import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, NavLink } from "react-router-dom";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    primary: createColor("#03015d"),
    secondary: createColor("#1b1799"),
    light: createColor("#EEE"),
  },
});

export default function Index() {
  return (
    <ThemeProvider theme={theme}>
      <Box className="hero">
        <Box sx={{ paddingTop: 30, paddingLeft: 35 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ marginBottom: 2, color: "#fff" }}>
              <h1>Seize The Day</h1>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 1, color: "#fff" }}>
              Organize your day, mindfully.
            </Grid>
            <Grid item>
              <Link to="/login" sx={{ textDecoration: "none" }}>
                <Button variant="outlined" type="button" color="light">
                  Login
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link to="/signup">
                <Button variant="contained" type="button" color="secondary">
                  Signup
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
