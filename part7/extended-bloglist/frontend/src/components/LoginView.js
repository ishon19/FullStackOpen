import React from "react";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";

const renderLoginForm = (props) => {
  const {
    username,
    password,
    loginHandler,
    usernameChangeHandler,
    passwordChangeHandler,
  } = props;

  return (
    <Card style={{ width: "600px" }}>
      <CardContent>
        <Grid container direction="column" spacing={3} alignContent="center">
          <Grid item>
            <Typography variant="h6">Login to the Blogs App</Typography>
          </Grid>
          <Grid item>
            <TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={usernameChangeHandler}
            />
          </Grid>
          <Grid item>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={passwordChangeHandler}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  loginHandler();
                }
              }}
            />
          </Grid>
          <Grid item>
            <Button
              fullWidth
              variant="contained"
              size="medium"
              color="primary"
              onClick={loginHandler}
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const Login = (props) => {
  return (
    <Grid container justify="center">
      {renderLoginForm(props)}
    </Grid>
  );
};

export default Login;
