"use client"

import React, { useEffect, useState } from "react";
import SelectorBar from "../molecules/3.SelectorBar";
import SearchBar from "../molecules/4.SearchBar";
import ResultsTable from "../molecules/5.ResultsTable";
import LoadingWheel from "../atoms/1.LoadingWheel";

const tableNames = ["departamento", "municipio", "vivienda", "persona",];

export interface Table {
  headers: Array<{ name: string, type: string, modifiable: boolean}>;
  data: Array<{ [key: string | number]: string | number | Date }>;  // Cada entrada en `data` tiene claves de tipo string y valores que pueden ser string, number o Date.
  erasable: boolean
}


// Esta función hace la búsqueda asincrónica a la base de datos:
async function getTable(table: string): Promise<Table> {

  try {
    const response = await fetch(`/api/${table}`);
    
    if (response.ok) {
      const data = await response.json(); // Esto convierte la respuesta a un objeto JavaScript
      return {
        headers: data.headers,
        data: data.data,
        erasable: data.erasable,
      };
    } else {
      console.error('Error al obtener los datos:', response.statusText);
      return {
        headers: [],
        data: [],
        erasable: true,
      };
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return {
      headers: [],
      data: [],
      erasable: true,
    };
  }

};

// El SearchView es la suma de la barra de búsqueda
export default function SearchView() {
  const defaultTable: Table = {
    headers: [],
    data: [],
    erasable: true,
  };
  
  const [tableName, setTableName] = useState<string>(tableNames[0]);
  const [tableData, setTableData] = useState<Table>(defaultTable);
  const [isLoading, setLoading] = useState<{on: boolean, message: string}>({on: false, message: ""})

  // Hacer la búsqueda a la BD ahora que se cambió de pestaña
  useEffect(() => {

    const fetchData = async () => {
      setLoading({on: true, message: "Cargando"});    
      const t = await getTable(tableName);
      setTableData(t);
      setLoading({on: false, message: ""});      
    }
    
    fetchData();

  }, [tableName])



  return (
    <>
      <div className="h-[63vh]">
        <SelectorBar botones={tableNames} clickFunction={setTableName} activeTable={tableName}/>
        <div className="max-w relative z-30 w-full bg-white shadow-lg">
          <div className="flex justify-center px-3 pt-3">
            <SearchBar headers={tableData.headers} erasable={tableData.erasable} />
          </div>
          <div className="p-4">
            {/* Aquí va el contenido de la búsqueda */}
              <ResultsTable tableData={tableData} tableName={tableName} loadingState={setLoading}/>
          </div>
        </div>
      </div>
      {isLoading.on && <LoadingWheel waitMessage={isLoading.message}/>}
    </>
  );
}
