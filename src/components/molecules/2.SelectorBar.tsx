import React from "react";
import SelectorButton from "@/components/atoms/0.SelectorButton";
import { useTableManagementStore } from "@/utils/TableStore";

export default function SelectorBar() {
  
  const { tableNames } = useTableManagementStore();

  return (
    <div className="max-w w-full pt-1">
      {tableNames.map((entry) => (
        <SelectorButton 
          key={entry} 
          buttonTable={entry}           
        />
      ))}
    </div>
  );
}
