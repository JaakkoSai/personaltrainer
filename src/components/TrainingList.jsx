import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import dayjs from "dayjs";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button } from "@mui/material";
import AddTrainingForm from "./AddTrainingForm";

export default function TrainingList() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const [columns] = useState([
    {
      headerName: "Date",
      field: "date",
      sortable: true,
      filter: true,
      cellRenderer: (data) => dayjs(data.value).format("DD.MM.YYYY HH:mm"),
    },
    { headerName: "Duration", field: "duration", sortable: true, filter: true },
    { headerName: "Activity", field: "activity", sortable: true, filter: true },
    {
      headerName: "Customer",
      field: "customer.firstname",
      sortable: true,
      filter: true,
    },
    {
      cellRenderer: (params) => {
        const deleteHref = `https://traineeapp.azurewebsites.net/api/trainings/${params.data.id}`;
        return (
          <Button size="small" onClick={() => deleteTraining(deleteHref)}>
            Delete
          </Button>
        );
      },
      width: 120,
    },
  ]);

  const fetchTrainings = () => {
    fetch("https://traineeapp.azurewebsites.net/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const deleteTraining = (url) => {
    if (
      window.confirm("Are you sure you want to delete this training session?")
    ) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            fetchTrainings();
          } else {
            throw new Error("Error in DELETE: " + response.statusText);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <>
      <AddTrainingForm fetchTrainings={fetchTrainings} />
      <div className="ag-theme-material" style={{ height: 600, width: "100%" }}>
        <AgGridReact
          rowData={trainings}
          columnDefs={columns}
          domLayout="autoHeight"
        />
      </div>
    </>
  );
}
