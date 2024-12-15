import React from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { FaTrash } from "react-icons/fa";

interface Entry {
  id: number;
  name: string;
  email: string;
  date: string;
}

interface TableProps {
  headers: string[];
  results: Entry[];
}

// Tanto las entradas como las cabeceras de la tabla son dinámicas, falta también asignar las acciones a los botones de editar y eliminar, hay varias maneras de hacerlo, aunque creo que la ideal es por contexto o por la ruta actual, para que todo dependa de la pestaña en la que uno se encuentre actualmente

// El componente recibe un arreglo de strings con los nombres de las cabeceras y un arreglo de objetos con las entradas de la tabla, falta asignar las funciones a los botones de editar y eliminar, el editar debería abrir el UpdateView con la información de la entrada respectiva y el eliminar debería eliminar la entrada respectiva, tanto en la base de datos como aquí en el front

export default function ResultsTable({ headers, results }: TableProps) {
  
  
  return (
    <div className="overflow-x-auto h-[40vh] rounded-md">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="border-b px-4 py-2 bg-gray-300">
                {header.charAt(0).toUpperCase() + header.slice(1)}
              </th>
            ))}
            <th className="border-b px-4 py-2 bg-gray-300">Editar</th>
          </tr>
        </thead>
        <tbody>
          {results.map((entry) => (
            <tr key={entry.id} className="border-b">
              <td className="flex justify-center font-bold px-4 py-2">{entry.id}</td>
              <td className="text-center px-4 py-2">{entry.name}</td>
              <td className="text-center px-4 py-2">{entry.email}</td>
              <td className="text-center px-4 py-2">{entry.date}</td>
              <td className="flex justify-center px-4 py-2">
                <button className="flex items-center justify-center rounded-l bg-blue-500 px-2 py-2 text-white hover:bg-blue-600">
                  {/* Edit button */}
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button className="flex items-center justify-center rounded-r bg-red-500 px-2 py-2 text-white hover:bg-red-600">
                  {/* Remove button*/}
                  <FaTrash className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
