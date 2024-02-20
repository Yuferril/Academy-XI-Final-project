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
import Notification from "../Notification/Notification";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
const defaultTheme = createTheme();

export default function SignUp({ openDialog, handleClose }) {
  const [username, setUsername] = React.useState("");

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState({
    open: false,
    message: "",
    isSuccess: false,
  });
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { open, message, isSuccess } = state;

  const handleReset = () => {
    setUsername("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  const handleNotificationClose = () => {
    setState({ ...state, open: false });
  };


  function handleSubmit(event) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        role: "user",
        email,
        firstName,
        lastName,
      }),
    };

    fetch("/signup", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const errorMessage = data.errors?.includes("Username has already been taken")
        ? `Username ${username} is already taken.`
        : data.errors
          ? `Sign up Error: ${data.errors[0]}`
          : null;

      setState({
        ...state,
        message: errorMessage || `Sign up successfully for ${username}`,
        isSuccess: !errorMessage,
        open: true,
      });
    })
    .then(handleReset);
}

  return (
    <>
      <Dialog open={openDialog} onClose={handleClose}>
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
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                      onChange={(e) => setFirstName(e.target.value)}
                      defaultValue={firstName}
                      value={firstName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="family-name"
                      onChange={(e) => setLastName(e.target.value)}
                      defaultValue={lastName}
                      value={lastName}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
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
                      onChange={(e) => setEmail(e.target.value)}
                      defaultValue={email}
                      value={email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      onChange={(e) => setPassword(e.target.value)}
                      defaultValue={password}
                      value={password}
                      InputProps={{
                        type: showPassword ? "text" : "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                </Grid>
              </Box>
              <br />
              <Copyright sx={{ mt: 8, mb: 4 }} />
              <br />
            </Box>
            <Notification
              isOpen={open}
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
