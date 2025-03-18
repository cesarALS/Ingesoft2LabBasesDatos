"use client"

import SelectorBar from "../molecules/2.SelectorBar";
import SearchBar from "../molecules/3.SearchBar";
import ResultsTable from "../molecules/4.ResultsTable";
import LoadingWheel from "../atoms/1.LoadingWheel";
import { useTableManagementStore } from "@/utils/TableStore";
import { useEffect } from "react";

const SearchView = () => {

  const { loadingState, tableNames, setTable } = useTableManagementStore();

  useEffect(() => {
    setTable(tableNames[0]);
  }, []);
    
  return (
    <>
      <div className="h-[63vh]">
        <SelectorBar/>
        <div className="max-w relative z-30 w-full bg-white shadow-lg">
          <div className="flex justify-center px-3 pt-3">
            <SearchBar/>
          </div>
          <div className="p-4">
            <ResultsTable/>
          </div>
        </div>
      </div>      
      {loadingState.isLoading && <LoadingWheel waitMessage={loadingState.loadingMessage}/>}
    </>
  );
};

export default SearchView;
