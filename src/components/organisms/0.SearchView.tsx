import React from "react";
import SelectorBar from "../molecules/3.SelectorBar";
import SearchBar from "../molecules/4.SearchBar";
import ResultsTable from "../molecules/5.ResultsTable";

export default function SearchView() {
  const data = [
    { id: 1, name: "John Doe", email: "john@example.com", date: "2024-12-14" },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      date: "2024-12-15",
    },
    // Add more entries as needed
  ];

  const headers = ["id", "name", "email", "date"];
  const secciones = ["municipios", "viviendas", "personas", "departamentos"];

  return (
    <div>
      <SelectorBar botones={secciones} />
      <div className="max-w relative z-30 w-full bg-white shadow-lg">
        <div className="px-4 pt-4">
          <SearchBar headers={headers} />
        </div>
        <div className="p-4">
          {/* Aquí va el contenido de la búsqueda */}
          <div>
            <ResultsTable headers={headers} results={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
