import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button } from "@mui/material";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import ExportCSVButton from "../exportToCSV";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomer();
  }, []);

  const [columns] = useState([
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
    {
      cellRenderer: (params) => (
        <EditCustomer fetchCustomer={fetchCustomer} data={params.data} />
      ),
      width: 120,
    },
    {
      cellRenderer: (params) => (
        <Button
          size="small"
          onClick={() => deleteCustomer(params.data.links[0].href)}
        >
          Delete
        </Button>
      ),
      width: 120,
    },
  ]);

  const fetchCustomer = () => {
    fetch("https://traineeapp.azurewebsites.net/api/customers")
      .then((response) => response.json())
      .then((data) => setCustomers(data.content))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const deleteCustomer = (url) => {
    if (window.confirm("Are you sure?")) {
      fetch(url, { method: "DELETE" })
        .then((response) => {
          if (response.ok) fetchCustomer();
          else throw new Error("Error in DELETE: " + response.statusText);
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <>
      <AddCustomer fetchCustomer={fetchCustomer} />
      <ExportCSVButton fetchCustomer={fetchCustomer} />
      <div className="ag-theme-material" style={{ height: 600, width: "100%" }}>
        <AgGridReact
          rowData={customers}
          columnDefs={columns}
          domLayout="autoHeight"
        />
      </div>
    </>
  );
}
