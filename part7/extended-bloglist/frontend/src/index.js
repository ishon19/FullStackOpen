import React from "react";
import ReactDOM from "react-dom";
import {
  MuiThemeProvider,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";
import App from "./App";
import "./App.css";

ReactDOM.render(
  <MuiThemeProvider>
    <AppBar>
      <Toolbar>
        <Typography variant="h6">FullStackOpen Blog App</Typography>
      </Toolbar>
    </AppBar>
    <App />
  </MuiThemeProvider>,
  document.getElementById("root")
);
