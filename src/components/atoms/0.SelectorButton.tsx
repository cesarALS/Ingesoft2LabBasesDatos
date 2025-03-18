import React from "react";
import { toUpperCaseFirst } from "@/utils/stringUtils";
import { useTableManagementStore } from "@/utils/TableStore";

interface SelectorButtonProps {
  buttonTable: string;  
}

export default function SelectorButton({ buttonTable }: SelectorButtonProps) {
  
  const { setTable, table } = useTableManagementStore();
  const { tableName } = table;
  
  return (
    <button 
      className={`z-10 mx-1 rounded-t ${tableName===buttonTable ? "bg-blue-700" : "bg-blue-400"} px-4 py-2 font-bold text-white shadow-lg hover:bg-blue-700`}
      onClick={() => setTable(buttonTable)}
      title={`Ver vista de ${buttonTable}`}
    >
      {toUpperCaseFirst(buttonTable)}
    </button>
  );
}
