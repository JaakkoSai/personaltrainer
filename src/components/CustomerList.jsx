import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]); // Varmista, että tämä on taulukko

  useEffect(() => {
    fetch("https://traineeapp.azurewebsites.net/api/customers")
      .then((response) => response.json())
      .then((data) => {
        if (data.content && Array.isArray(data.content)) {
          setCustomers(data.content);
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const columns = [
    {
      headerName: "First Name",
      field: "firstname",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Last Name",
      field: "lastname",
      sortable: true,
      filter: true,
    },
    {
      headerName: "Street Address",
      field: "streetaddress",
      sortable: true,
      filter: true,
    },
    { headerName: "Postcode", field: "postcode", sortable: true, filter: true },
    { headerName: "City", field: "city", sortable: true, filter: true },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    { headerName: "Phone", field: "phone", sortable: true, filter: true },
  ];

  return (
    <div className="ag-theme-material" style={{ height: 600, width: "100%" }}>
      <AgGridReact
        rowData={customers}
        columnDefs={columns}
        domLayout="autoHeight"
      />
    </div>
  );
}
