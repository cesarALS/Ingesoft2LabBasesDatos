"use client"

import React, { useEffect, useState } from "react";
import SelectorBar from "../molecules/3.SelectorBar";
import SearchBar from "../molecules/4.SearchBar";
import ResultsTable from "../molecules/5.ResultsTable";

const sections = ["Municipios", "Viviendas", "Personas", "Departamentos"];

function getTable(table: string){
  
  //Esta función recoge la tabla de la BD a partir de su nombre,
  //y la recibe como un objeto json, para mostrarla

  if (table == sections[0]){
    return {
      headers:["id", "name", "email", "date"],
      data: [
        { id: 1, name: "John Doe", email: "john@example.com", date: "2024-12-14" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", date: "2024-12-15"},
        {id: 3, name: "Jane Smith",email: "jane@example.com",date: "2024-12-15"},
        {id: 4,name: "Jane Smith",email: "jane@example.com",date: "2024-12-15"},
        {id: 5,name: "Jane Smith",email: "jane@example.com",date: "2024-12-15",},
        {id: 6,name: "Jane Smith",email: "jane@example.com",date: "2024-12-15",},
        {id: 7,name: "Jane Smith",email: "jane@example.com",date: "2024-12-15",},
      ]
    };
  }else{
    return {
      headers:["id", "name", "email"],
      data:[
        { id: 1, name: "John Doe", email: "john@example.com"},
        { id: 2, name: "Jane Smith", email: "jane@example.com"},
        {id: 3, name: "Jane Smith",email: "jane@example.com"},
        {id: 4,name: "Jane Smith",email: "jane@example.com"},
      ]
    }
  }
};

export default function SearchView() {
  const [table, setTable] = useState<string>(sections[1]);
  const [data, setData] = useState<{}>([]);
  const [headers, setHeaders] = useState<string[]>([])

  // Hacer la búsqueda a la BD ahora que se cambió de pestaña
  useEffect(() => {
    const { headers, data } = getTable(table);
    setData(data);
    setHeaders(headers);
  }, [table])

  return (
    <div className="h-[63vh]">
      <SelectorBar botones={sections} clickFunction={setTable} activeTable={table}/>
      <div className="max-w relative z-30 w-full bg-white shadow-lg">
        <div className="px-4 pt-4">
          <SearchBar headers={headers} />
        </div>
        <div className="p-4">
          {/* Aquí va el contenido de la búsqueda */}
            <ResultsTable headers={headers} results={data}/>
        </div>
      </div>
    </div>
  );
}
