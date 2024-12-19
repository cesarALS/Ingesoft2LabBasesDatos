"use client"

import React, { useEffect, useState } from "react";
import SelectorBar from "../molecules/2.SelectorBar";
import SearchBar from "../molecules/3.SearchBar";
import ResultsTable from "../molecules/4.ResultsTable";
import LoadingWheel from "../atoms/1.LoadingWheel";
import { getTable } from "@/services/requestFunctions";
import { Table } from "@/types/types"

const tableNames = ["departamento", "municipio", "vivienda", "persona",];

// El SearchView es la suma de la barra de búsqueda
export default function SearchView() {
  const defaultTable: Table = {
    headers: {},
    data: [],
    erasable: true,
  };
  
  const [tableName, setTableName] = useState<string>(tableNames[0]);
  const [tableReload, reloadTable] = useState<number>(0);
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
    console.log(tableData)

  }, [tableName, tableReload] )

  return (
    <>
      <div className="h-[63vh]">
        <SelectorBar botones={tableNames} clickFunction={setTableName} activeTable={tableName}/>
        <div className="max-w relative z-30 w-full bg-white shadow-lg">
          <div className="flex justify-center px-3 pt-3">
            <SearchBar 
            headers={tableData.headers} 
            erasable={tableData.erasable} 
            loadingState={setLoading}
            tableName={tableName}
            reloadTable={reloadTable}
            />
            
          </div>
          <div className="p-4">
            <ResultsTable 
            tableData={tableData} 
            tableName={tableName} 
            loadingState={setLoading}
            reloadTable={reloadTable}/>
          </div>
        </div>
      </div>
      {isLoading.on && <LoadingWheel waitMessage={isLoading.message}/>}
    </>
  );
}
