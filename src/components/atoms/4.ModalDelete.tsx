
import { TableHeaders, DataEntry } from "@/types/types"
import { getFormType } from "@/utils/BDUtils";
import { toUpperCaseFirst } from "@/utils/stringUtils"
import React from "react"

interface ModalDeleteProps {
    headers: TableHeaders,
    entry: DataEntry,
    confirmAction: () => void,
    cancelAction: () => void,
};

export default function ModalDelete (
    {headers, entry, confirmAction, cancelAction} : ModalDeleteProps
){

    const columns = Object.keys(headers);

    return (
        <>
            <h2 className="text-xl font-bold mb-4 text-center">
                ¿Estás seguro de borrar este registro?
            </h2>              
            <table>
                <thead>
                    <tr>
                        {columns.map(col => (
                            <th 
                                key={col} 
                                className="border-b px-4 py-2 bg-gray-300 text-center border-2"
                            >
                                {toUpperCaseFirst(col)}
                            </th>
                        ))}
                    </tr>
                </thead>      
                <tbody>
                <tr key="unique-entry" className="border-b">
                    {columns.map(col => (
                    <td key={col} className="text-center px-4 py-2">                        
                        {getFormType(headers[col].type).transform(entry[col])}
                    </td>
                    ))}
                </tr>                        
                </tbody>                      
            </table>
            <div className="flex justify-center gap-6">
                <button
                onClick={confirmAction}
                className={`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded`}
                >
                    Borrar
                </button>
                <button
                onClick={cancelAction}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"                        
                >                            
                    Cancelar
                </button>                  
            </div>            
        </>
    )
}