import { useState, useEffect } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { FaTrash } from "react-icons/fa";
import { Modal } from "@/components/molecules/6.Modal"
import { Table } from "@/components/organisms/0.SearchView"
import ModalContent from "@/components/molecules/2.ModalContent"

// Tanto las entradas como las cabeceras de la tabla son dinámicas, falta también asignar las acciones a los botones de editar y eliminar, hay varias maneras de hacerlo, aunque creo que la ideal es por contexto o por la ruta actual, para que todo dependa de la pestaña en la que uno se encuentre actualmente

// El componente recibe un arreglo de strings con los nombres de las cabeceras y un arreglo de objetos con las entradas de la tabla, falta asignar las funciones a los botones de editar y eliminar, el editar debería abrir el UpdateView con la información de la entrada respectiva y el eliminar debería eliminar la entrada respectiva, tanto en la base de datos como aquí en el front

async function deleteRow(entryId: string, tableName: string): Promise<{status: number, message: string}> {

  try {
    
    console.log(`Enviamos el request DELETE al Endpoint, con id ${entryId}, de la tabla ${tableName}`);
    
    //Especificamos el ID del registro a borrar en los parámetros de la búsqueda (después de ?)
    const response = await fetch(`/api/${tableName}?id=${entryId}`,{  
      method: "DELETE",
      headers: {
          "Content-Type": "application/json",
      },
    });
    
    // Esta sección se ejecuta si la consulta llegó al endpoint, y por lo tanto en el endpoint, o se 
    // pudo borrar, o no se pudo (jeje) Si no se pudo, se ejecuta el catch
    
    const responseData = await response.json();

    if (response.ok) {
      return {
        status: response.status,
        message: `Registro con Identificador ${entryId} Borrado con éxito`
      }
    } else {
      return {
        status: response.status,
        message: `No se pudo borrar, porque: ${response.status}: ${responseData.message}`
      }
    }
  } catch(error){
    // Esta sección se ejecuta si hay un error en la solicitud al endpoint
    console.error("Error al hacer la solicitud al Endpoint!!! ", error.message);
    return {
        status: 500,
        message: `Error al hacer la solicitud. Vuelve a intentarlo`
    }
  }

};

interface ResultsTableProps {
  tableName: string
  tableData: Table;
  loadingState: Function
}

export default function ResultsTable({ tableName, tableData, loadingState }: ResultsTableProps) {

  const { headers, data, erasable } = tableData
  
  const [itemToDelete, setItemToDelete] = useState<any>(null);
  const [itemToUpdate, setItemToUpdate] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState(false)

  const handleDelete = (entry: {}) => {
    // Muestra el modal cuando se presiona el botón de eliminar
    setItemToDelete(entry);
    setShowModal(true);
  };
  
  const confirmDelete = async () => {
    const deleteData = async () => {
      
      loadingState({on: true, message: "Borrando"});
      const res = await deleteRow(Object.entries(itemToDelete)[0][1], tableName);
      
      if (res.status === 200 || res.status === 202 || res.status === 204){
        console.log(`Éxito! ${res.message}`)
      } else { console.log(res.message)}
      
      loadingState({on: false, message: ""});
    }
      
    await deleteData();
    setShowModal(false);
  };

  useEffect(() => {}, []); // Esta función será importante para rehacer la búsqueda de la tabla

  //------------------------------------------------------------------------

  const handleUpdate = (entry: {}) => {
    setItemToUpdate(entry);
    setShowModal(true);
  }

  const confirmUpdate = () => {
    if (itemToUpdate) {
      confirmDelete();
      setShowModal(false);
    }
  }

  const cancel = () => {
    setItemToDelete(null);
    setItemToUpdate(null);
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
                  {header.name.charAt(0).toUpperCase() + header.name.slice(1)}
                </th>
              ))}
              <th className="border-b px-4 py-2 bg-gray-300">Editar</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
            <tr key={index} className="border-b hover:bg-gray-200">
              {Object.keys(entry).map((key) => (
                <td key={key} className="text-center px-4 py-2">
                  {entry[key]}
                </td>
              ))}
              <td className="flex justify-center px-4 py-2">
                {erasable ? (
                    <>
                      <button 
                      className="flex items-center justify-center rounded-l bg-blue-500 px-2 py-2 text-white hover:bg-blue-600"
                      title = "Editar este registro"
                      onClick={() => handleUpdate(entry)}
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
                    </>                    
                  ) : (
                    <button 
                    className="flex items-center justify-center rounded-md bg-blue-500 px-2 py-2 text-white hover:bg-blue-600"
                    title = "Editar este registro"
                    onClick={() => handleUpdate(entry)}
                    >
                      {/* Botón Editar */}
                      <PencilIcon className="h-5 w-5" />
                    </button>    
                  )
                }

              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
      
      {/* PopUp de Delete */}
      {showModal && itemToDelete && (
        <Modal son={
          <ModalContent 
            title={"¿Estás seguro de borrar este registro?"}
            actionType = {"delete"}
            headers={headers}
            entry={itemToDelete}
            confirmAction={confirmDelete}
            cancelAction={cancel}
            firstButton={{text: "Borrar", color:"bg-red-500", hoverColor: "bg-red-600"}}
          />
        } />
      )}

      {/* Ventana de edición!!! */}
      {showModal && itemToUpdate && (
        <Modal son = {
          <ModalContent 
          title = {"Modifica el registro"}
          actionType = {"update"}
          headers = {headers}
          entry = {itemToUpdate}
          confirmAction = {confirmUpdate}
          cancelAction = {cancel}
          firstButton={{text: "Actualizar", color:"bg-yellow-400", hoverColor: "bg-yellow-600"}}
          />
        } />
      )}
    </div>
  );
}
