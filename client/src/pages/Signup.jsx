import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Container,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "../components/Copyright";
import GuestAppbar from "../components/GuestAppbar";

const Signup = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [doesUserExist, setDoesUserExist] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    try {
      const req = await fetch(api_base + "/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: data.get("userName"),
          email: data.get("email"),
          password: data.get("password"),
          confirmPassword: data.get("confirmPassword"),
        }),
      });

      const res = await req.json();

      if (res.message === "User already exists!") {
        setDoesUserExist(true);
      }

      localStorage.setItem("auth", res.token);

      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };

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
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            paddingTop: 2,
            paddingBottom: 2,
            boxShadow: "2px 2px 8px 0px rgba(0,0,0,0.3)",
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h3">Sign up</Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoFocus
                    required
                    fullWidth
                    id="userName"
                    label="Username"
                    name="userName"
                    autoComplete="given-name"
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="confirmPassword"
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    variant="filled"
                  />
                </Grid>
              </Grid>

              {doesUserExist && (
                <Typography sx={{ color: "red", mt: 2, fontSize: "0.9rem" }}>
                  Account with that email address or username already exists.
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-start">
                <Grid item>
                  <Link
                    to="/login"
                    style={{ cursor: "pointer", color: colors.grey[100] }}
                  >
                    <Typography variant="h6">
                      Already have an account? Sign in
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </Box>
    </Box>
  );
};

const api_base =
  process.env.NODE_ENV === "development"
    ? "http://localhost:2222"
    : "https://seize-the-day-api.up.railway.app";

export default Signup;
