import { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { FaTrash } from "react-icons/fa";

interface TableProps {
  headers: string[];
  results: [];
}

// Tanto las entradas como las cabeceras de la tabla son dinámicas, falta también asignar las acciones a los botones de editar y eliminar, hay varias maneras de hacerlo, aunque creo que la ideal es por contexto o por la ruta actual, para que todo dependa de la pestaña en la que uno se encuentre actualmente

// El componente recibe un arreglo de strings con los nombres de las cabeceras y un arreglo de objetos con las entradas de la tabla, falta asignar las funciones a los botones de editar y eliminar, el editar debería abrir el UpdateView con la información de la entrada respectiva y el eliminar debería eliminar la entrada respectiva, tanto en la base de datos como aquí en el front

export default function ResultsTable({ headers, results }: TableProps) {

  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<any>(null);

  const handleDelete = (entry: {}) => {
    // Muestra el modal cuando se presiona el botón de eliminar
    setItemToDelete(entry);
    setShowModal(true);
    console.log(itemToDelete)
  };
  
  const confirmDelete = () => {
    if (itemToDelete) {
      // deleteItem(itemToDelete); // Llama a la función para eliminar el item
      setShowModal(false);
    }
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
    <div>
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
              {Object.keys(entry).map((key) => (
                <td key={key} className="text-center px-4 py-2">
                  {entry[key]}
                </td>
              ))}
              <td className="flex justify-center px-4 py-2">
                <button 
                className="flex items-center justify-center rounded-l bg-blue-500 px-2 py-2 text-white hover:bg-blue-600"
                title = "Editar este registro"
                >
                  {/* Botón Editar */}
                  <PencilIcon className="h-5 w-5" />
                </button>
                <button 
                className="flex items-center justify-center rounded-r bg-red-500 px-2 py-2 text-white hover:bg-red-600"
                title = "Borrar este registro"
                onClick={() => handleDelete(entry)}
                >
                  {/* Botón Eliminar */}
                  <FaTrash className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      {/* Aviso de confirmación!!! */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="flex flex-col gap-4 justify-center bg-white p-8 rounded-md shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">¿Estás seguro de borrar este registro?</h2>
            <table className="w-full">
              <thead>
                <tr>
                  {headers.map((header, index) => (
                  <th key={index} className="border-b px-4 py-2 bg-gray-300 text-center border-2">
                    {header.charAt(0).toUpperCase() + header.slice(1)}
                  </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr key={itemToDelete.id} className="border-b">
                  {Object.keys(itemToDelete).map((key) => (
                  <td key={key} className="text-center px-4 py-2">
                    {itemToDelete[key]}
                  </td>
              ))}
                </tr>
              </tbody>
            </table>
            <div className="flex justify-center gap-6">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Sí, borrar
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
