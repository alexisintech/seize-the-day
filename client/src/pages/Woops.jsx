import { Box, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../theme";
import GuestAppbar from "../components/GuestAppbar";

const Woops = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box>
      <GuestAppbar />
      <Box
        height="85vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        px="0.8rem"
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
              <Typography variant="h1">
                You are not allowed to see this page!
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ marginBottom: 1 }}>
              <Typography variant="h4">Please, log in or sign up.</Typography>
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
              src="/imgs/undraw-authenticate.svg"
              alt="an illustration of person sitting on a phone screen, holding a lock icon."
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Woops;
