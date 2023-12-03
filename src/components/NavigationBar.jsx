import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button } from "@mui/material";

export default function NavigationBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/customers">
          Customers
        </Button>
        <Button color="inherit" component={Link} to="/trainings">
          Trainings
        </Button>
        <Button color="inherit" component={Link} to="/trainingscalendar">
          Training Calendar
        </Button>
      </Toolbar>
    </AppBar>
  );
}
