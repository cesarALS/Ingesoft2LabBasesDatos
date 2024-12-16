"use client"

import React, { useEffect, useState } from "react";
import SelectorBar from "../molecules/3.SelectorBar";
import SearchBar from "../molecules/4.SearchBar";
import ResultsTable from "../molecules/5.ResultsTable";
import LoadingWheel from "../atoms/1.LoadingWheel";

const tableNames = ["municipio", "vivienda", "persona", "departamento"];

export interface Table {
  headers: Array<{ name: string, type: string, modifiable: boolean}>;
  data: Array<{ [key: string | number]: string | number | Date }>;  // Cada entrada en `data` tiene claves de tipo string y valores que pueden ser string, number o Date.
}

async function getTable(table: string): Promise<Table> {

  fetch(`api/${table}`)
  
  if (table == tableNames[2]){
    return {      
      headers: [
        {name: "id", type: "integer", modifiable: false},
        {name: "nombre", type: "string", modifiable: true},
        {name: "teléfono", type: "integer", modifiable: true},
        {name: "fecha nacimiento", type: "date", modifiable: true},        
        {name: "género", type: "string", modifiable: true},        
      ],
      data: [
        {id: 1, name: "John Doe", telefono: "3239807193",date: "2024-12-14", genero: "Masculino" },
        {id: 2, name: "Jane Smith", telefono: "3128790276",date: "2001-04-10", genero: "Femenino"},
        {id: 3, name: "Robert Hemingway", telefono: "3417890645",date: "1990-01-13", genero: "Masculino"},
        {id: 4, name: "Lady Maria", telefono: "3124150990",date: "2006-11-15", genero: "Femenino"},
        {id: 5, name: "Arnold Crusoe", telefono: "3102502360",date: "1963-07-28", genero: "Masculino"},
        {id: 6, name: "Linda Bruce", telefono: "3165893211",date: "1978-09-21", genero: "Femenino"},
        {id: 7, name: "Rosario Lanús", telefono: "3124569823",date: "2002-07-02", genero: "Otro"},
      ]
    };
  }else{
    return {
      headers: [
        {name: "nombre", type: "string", modifiable: false},
        {name: "superficie", type: "float", modifiable: false},
        {name: "poblacion", type: "integer", modifiable: true},
        {name: "gobernador", type: "string", modifiable: false},
      ],
      data: [
        {nombre: "Cundinamarca", superficie:24210.00, poblacion: 3243000, gobernador: "Jorge Emilio Rey"},
        {nombre: "Antioquia", superficie:63612.00, poblacion: 6995846, gobernador: "Andrés Julián Rendón"},
        {nombre: "Bolivar", superficie:25978.00, poblacion: 2258929, gobernador: "Yamil Hernando Arana"},
        {nombre: "Valle del Cauca", superficie:22195.00, poblacion: 4923456, gobernador: "Dilian Francisca Toro"},
      ]
    }
  }
};

export default function SearchView() {
  const defaultTable: Table = {
    headers: [],
    data: [],
  };
  
  const [tableName, setTableName] = useState<string>(tableNames[0]);
  const [tableData, setTableData] = useState<Table | null>(defaultTable);
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
