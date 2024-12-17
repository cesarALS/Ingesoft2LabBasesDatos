import React, { useState } from "react";
import { toUpperCaseFirst } from "@/utils/stringUtils";

// Este componente crea las tablas dentro de un modal (popUp)

interface ModalTableProps {
    headers: { name: string; type: string; modifiable: boolean }[];
    entry: { [key: string]: string | number | Date };
    actionType: string;
}

export default function ModalTable({ headers, entry, actionType }: ModalTableProps) {
    // Identificar columnas modificables
    const modifiableIndices: number[] = actionType === "update" 
        ? headers.map((header, index) => (header.modifiable ? index : -1)).filter(index => index !== -1)
        : [];
    
    // Determinar tipos de datos para cada columna
    const dataTypes: string[] = headers.map(header => {
        switch (header.type) {
            case "character varying":
                return "text";
            case "double precision":
            case "integer":
                return "number";
            case "date":
                return "date";
            default:
                return "text";
        }
    });

    // Crear un estado para los valores de entrada inicializados como vacíos
    const [formData, setFormData] = useState<{ [key: string]: string }>({});

    // Manejar cambios en los inputs
    const handleInputChange = (key: string, value: string) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [key]: value,
        }));
    };

    console.log(dataTypes);

    return (
        <table>
            <thead>
                <tr>
                    {/*headers.map((header, index) => (
                        <th key={index} className="border-b px-4 py-2 bg-gray-300 text-center border-2">
                            {toUpperCaseFirst(header.name)}
                        </th>
                    ))*/}
                    {Object.entries(headers).map(([key, header], index) => (
                    <th key={index} className="border-b px-4 py-2 bg-gray-300 text-center border-2">
                        {toUpperCaseFirst(key)}
                    </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <tr key="unique-entry" className="border-b">
                    {Object.keys(entry).map((key, index) => (                        
                        <td key={key} className="text-center py-2 px-2">
                            {modifiableIndices.includes(index) ? (
                                <input
                                    type={dataTypes[index]} // "date", "text", o "number"
                                    placeholder={
                                        headers[index].type === "date"
                                            ? new Date(entry[key]).toISOString().split("T")[0] // Convierte la fecha a YYYY-MM-DD
                                            : String(entry[key]) // Muestra el valor actual para otros tipos
                                    }
                                    value={
                                        headers[index].type === "date"
                                            ? formData[key] || new Date(entry[key]).toISOString().split("T")[0] // Formatea fechas correctamente
                                            : formData[key] || "" // Otros valores inicializan vacíos
                                    }
                                    onChange={(e) => handleInputChange(key, e.target.value)}
                                    className="px-2 py-1 rounded-md hover:bg-gray-200 selected:bg-gray-200"
                                />
                            ) : (
                                entry[key] instanceof Date
                                    ? new Date(entry[key]).toLocaleDateString() // Formatear fechas para visualización no editable
                                    : String(entry[key]) // Convertir otros valores a cadena
                            )}
                        </td>
                    ))}
                </tr>
            </tbody>
        </table>
    );
}

// Este componente servirá para crear el freaking input, manejando casos donde sea fecha, 
// donde sea string, y donde sea número
function InputForm(){
    return (
        <>
        </>
    );
}