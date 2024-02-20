import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import pokeAvatar from "../../pokeballicon.png";
import Copyright from "../Common/Copyright";
import Dialog from "@mui/material/Dialog";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Notification from "../Notification/Notification";
import { Link } from "@mui/material";
import SignUp from "./SignUp";

const defaultTheme = createTheme();

export default function SignIn({ open, handleClose, handleLogin }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [state, setState] = React.useState({
    openNotif: false,
    message: "",
    isSuccess: false,
  });
  const { openNotif, message, isSuccess } = state;

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleNotificationClose = () => {
    setState({ ...state, openNotif: false });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  function handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    };

    fetch("/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.username) {
          handleLogin(data);
          handleClose();
        } else {
          setState({
            ...state,
            message: `Login failed for ${username}`,
            isSuccess: false,
            openNotif: true,
          });
        }
      });
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <ThemeProvider theme={defaultTheme}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar src={pokeAvatar} />
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    type: showPassword ? "text" : "password",
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign In
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
              <br />
              <Copyright sx={{ mt: 8, mb: 4 }} />
              <br />
            </Box>

            <Notification
              isOpen={openNotif}
              handleClose={handleNotificationClose}
              message={message}
              isSuccess={isSuccess}
            />
          </Container>
        </ThemeProvider>
      </Dialog>
    </>
  );
}
