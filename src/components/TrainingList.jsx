import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import dayjs from "dayjs";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function TrainingList() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetch("http://traineeapp.azurewebsites.net/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const columns = [
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
  ];

  return (
    <div className="ag-theme-material" style={{ height: 600, width: "100%" }}>
      <AgGridReact
        rowData={trainings}
        columnDefs={columns}
        domLayout="autoHeight"
      />
    </div>
  );
}
