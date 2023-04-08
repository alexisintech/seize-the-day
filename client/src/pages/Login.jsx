import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Container,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Copyright from "../components/Copyright";
import GuestAppbar from "../components/GuestAppbar";

const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    try {
      const req = await fetch(api_base + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: data.get("userName"),
          password: data.get("password"),
        }),
      });
      const res = await req.json();

      if (res.message === "User logged in :)") {
        localStorage.setItem("auth", res.token);

        navigate("/profile");
      } else {
        setError(res.message);
      }
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h3">Login</Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                autoFocus
                required
                fullWidth
                id="userName"
                label="Username"
                name="userName"
                autoComplete="email"
                variant="filled"
              />

              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                autoComplete="current-password"
                variant="filled"
              />

              {error.length > 0 && (
                <Typography sx={{ color: "red", mt: 2, fontSize: "0.9rem" }}>
                  {error}
                </Typography>
              )}

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>

              <Link
                to="/signup"
                style={{ cursor: "pointer", color: colors.grey[100] }}
              >
                <Typography variant="h6">
                  Don't have an account? Sign Up
                </Typography>
              </Link>
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

export default Login;
