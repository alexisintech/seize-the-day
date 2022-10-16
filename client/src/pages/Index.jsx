import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    primary: createColor("#FA347B"),
    secondary: createColor("#8A4EFC"),
    light: createColor("#EEE"),
    lightAlt: createColor("#61759b"),
    dark: createColor("#131A26"),
    darkAlt: createColor("#202B3E"),
  },
});

export default function Index() {
  return (
    <ThemeProvider theme={theme}>
      <h1>Seize The Day</h1>
      <form action="/login" method="get">
        <Button variant="contained" type="submit" color="primary">
          Login
        </Button>
      </form>
      <form action="/signup" method="get">
        <Button variant="outlined" type="submit" color="light">
          Signup
        </Button>
      </form>
    </ThemeProvider>
  );
}
