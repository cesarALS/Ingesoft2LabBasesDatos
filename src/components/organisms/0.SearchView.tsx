"use client"

import React, { useEffect, useState } from "react";
import SelectorBar from "../molecules/3.SelectorBar";
import SearchBar from "../molecules/4.SearchBar";
import ResultsTable from "../molecules/5.ResultsTable";
import LoadingWheel from "../atoms/1.LoadingWheel";

const tableNames = ["Municipios", "Viviendas", "Personas", "Departamentos"];

export interface Table {
  headers: [{}],
  data: [{}],
  modifiable: boolean
}

function getTable(table: string) {

  if (table == tableNames[2]){
    return {      
      headers: [
        {name: "id", type: "integer", modifiable: false, foreign_key: false , },
        {name: "nombre", type: "string", modifiable: true, foreign_key: false, },
        {name: "teléfono", type: "integer", modifiable: true, foreign_key: false, },
        {name: "fecha nacimiento", type: "date", modifiable: true, foreign_key: false, },        
        {name: "género", type: "string", modifiable: true, foreign_key: true, },        
      ],
      data: [
        {id: 1, name: "John Doe", telefono: "3239807193",date: "2024-12-14", genero: "Masculino" },
        {id: 2, name: "Jane Smith", telefono: "3128790276",date: "2001-04-10", genero: "Femenino"},
        {id: 3, name: "Robert Hemingway", telefono: "3417890645",date: "1990-01-13", genero: "Masculino"},
        {id: 4, name: "Lady Maria", telefono: "3124150990",date: "2006-11-15", genero: "Femenino"},
        {id: 5, name: "Arnold Crusoe", telefono: "3102502360",date: "1963-07-28", genero: "Masculino"},
        {id: 6, name: "Linda Bruce", telefono: "3165893211",date: "1978-09-21", genero: "Femenino"},
        {id: 7, name: "Rosario Lanús", telefono: "3124569823",date: "2002-07-02", genero: "Otro"},
      ],
      modifiable: true
    };
  }else{
    return {
      headers: [
        {name: "nombre", type: "string", modifiable: false, foreign_key: false},
        {name: "superficie", type: "float", modifiable: false, foreign_key: false},
        {name: "poblacion", type: "integer", modifiable: false, foreign_key: false},
        {name: "gobernador", type: "string", modifiable: false, foreign_key: false},
      ],
      data: [
        {nombre: "Cundinamarca", superficie:24210.00, poblacion: 3243000, gobernador: "Jorge Emilio Rey"},
        {nombre: "Antioquia", superficie:63612.00, poblacion: 6995846, gobernador: "Andrés Julián Rendón"},
        {nombre: "Bolivar", superficie:25978.00, poblacion: 2258929, gobernador: "Yamil Hernando Arana"},
        {nombre: "Valle del Cauca", superficie:22195.00, poblacion: 4923456, gobernador: "Dilian Francisca Toro"},
      ],
      modifiable: true
    }
  }
};

export default function SearchView() {
  const [tableName, setTableName] = useState<string>(tableNames[0]);
  const [tableData, setTableData] = useState<Table>()
  const [isLoading, setLoading] = useState(false)

  // Hacer la búsqueda a la BD ahora que se cambió de pestaña
  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      setTableData(getTable(tableName));
      setLoading(false);      
    }, 500);

    // Cleanup timeout when the component unmounts or updates
    return () => clearTimeout(timeoutId);
  }, [tableName])

  return (
    <>
      <div className="h-[63vh]">
        <SelectorBar botones={tableNames} clickFunction={setTableName} activeTable={tableName}/>
        <div className="max-w relative z-30 w-full bg-white shadow-lg">
          <div className="flex justify-center px-3 pt-3">
            <SearchBar headers={tableData?.headers} />
          </div>
          <div className="p-4">
            {/* Aquí va el contenido de la búsqueda */}
              <ResultsTable tableData={tableData}/>
          </div>
        </div>
      </div>
      {isLoading && <LoadingWheel />}
    </>
  );
}
