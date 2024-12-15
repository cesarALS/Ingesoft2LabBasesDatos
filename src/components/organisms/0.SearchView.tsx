"use-client"

import React from "react";
import SelectorBar from "../molecules/3.SelectorBar";
import SearchBar from "../molecules/4.SearchBar";
import ResultsTable from "../molecules/5.ResultsTable";

const sections = ["Municipios", "Viviendas", "Personas", "Departamentos"];

function getTable(table: string){
  //Esta función debe hacer la consulta al endpoint, y devuelve un arreglo, donde cada 
  
  if (table == sections[0]){
    return {
      headers:["id", "name", "email", "date"],
      data:     [
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
      headers:["id", "name", "email", "date"],
      data:[
        { id: 1, name: "John Doe", email: "john@example.com", date: "2024-12-14" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", date: "2024-12-15"},
        {id: 3, name: "Jane Smith",email: "jane@example.com",date: "2024-12-15"},
        {id: 4,name: "Jane Smith",email: "jane@example.com",date: "2024-12-15"},
      ]
    }
  }
  //Esta función recoge la tabla de la BD a partir de su nombre,
  //y la recibe como un objeto json, para mostrarla
};

export default function SearchView() {
  const { headers, data } = getTable(sections[0]);

  return (
    <div className="h-[63vh]">
      <SelectorBar botones={sections} />
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
