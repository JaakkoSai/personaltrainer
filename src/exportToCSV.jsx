import React from "react";
import Papa from "papaparse";

const exportToCSV = async () => {
  try {
    const response = await fetch(
      "https://traineeapp.azurewebsites.net/api/customers"
    );
    const { content } = await response.json();
    const filteredData = content.map(
      ({
        firstname,
        lastname,
        streetaddress,
        postcode,
        city,
        email,
        phone,
      }) => ({
        firstname,
        lastname,
        streetaddress,
        postcode,
        city,
        email,
        phone,
      })
    );
    const csv = Papa.unparse(filteredData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "customers.csv";
    link.click();
  } catch (error) {
    console.error("Error exporting data:", error);
  }
};

export default function ExportCSVButton() {
  return <button onClick={exportToCSV}>Export Customers to CSV</button>;
}
