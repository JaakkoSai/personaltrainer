import React, { useState } from "react";
import { TextField, Button, Alert } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function AddTrainingForm() {
  const [trainingDate, setTrainingDate] = useState(dayjs());
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const handleDateChange = (newDate) => {
    setTrainingDate(newDate);
  };

  const findCustomerUrl = async () => {
    try {
      const response = await fetch(
        "https://traineeapp.azurewebsites.net/api/customers"
      );
      const data = await response.json();
      const customers = data.content;
      const customer = customers.find(
        (c) => c.firstname === firstName && c.lastname === lastName
      );

      return customer ? customer.links[0].href : null;
    } catch (error) {
      console.error("Error fetching customers:", error);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const customerUrl = await findCustomerUrl();

    if (!customerUrl) {
      setError("Customer not found. Please check the name and try again.");
      return;
    }

    const newTraining = {
      date: trainingDate.format("YYYY-MM-DD"),
      activity: activity,
      duration: duration,
      customer: customerUrl,
    };

    try {
      const response = await fetch(
        "https://traineeapp.azurewebsites.net/api/trainings",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTraining),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        console.log("Training added successfully");
      }
    } catch (error) {
      console.error("Error adding training:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Training Date"
          value={trainingDate}
          onChange={handleDateChange}
          slotProps={{ textField: { variant: "outlined" } }}
        />
      </LocalizationProvider>
      <TextField
        label="Activity"
        value={activity}
        onChange={(e) => setActivity(e.target.value)}
      />
      <TextField
        label="Duration (minutes)"
        type="number"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <TextField
        label="Customer First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        label="Customer Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      {error && <Alert severity="error">{error}</Alert>}
      <Button type="submit" variant="contained" color="primary">
        Add Training
      </Button>
    </form>
  );
}
