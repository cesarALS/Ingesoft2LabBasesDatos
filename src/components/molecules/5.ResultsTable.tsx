import { useState, useEffect } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
import { FaTrash } from "react-icons/fa";
import { Modal } from "@/components/molecules/6.Modal"
import ModalContentTabular from "@/components/molecules/2.ModalContentTabular"
import ModalContentMessage from "../atoms/3.ModalContentMessage";
import { deleteRow  } from "@/services/requestFunctions";
import { Table } from "@/types/types"

import { toUpperCaseFirst } from "@/utils/stringUtils";


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
  //Para los modales de mensajes de éxito o fracaso
  const [modalMessage, setModalMessage] = useState<{on: boolean, message: string}>({on: false, message: ""}) 

  const handleDelete = (entry: {}) => {
    // Muestra el modal cuando se presiona el botón de eliminar
    setItemToDelete(entry);
    setShowModal(true);
  };
  
  const confirmDelete = async () => {
    const deleteData = async () => {
      
      loadingState({on: true, message: "Borrando"});
      const res = await deleteRow(Object.entries(itemToDelete)[0][1], tableName);
      loadingState({on: false, message: ""});

      setItemToDelete(null);      

      if (res.status === 200 || res.status === 202 || res.status === 204){        
        setModalMessage({on: true, message: `Éxito! ${res.message}`})
      } else { setModalMessage({on: true, message: `Error ${res.message}`})}
      
    }
      
    await deleteData();
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
    setModalMessage({on: false, message: ""})
  };

  return (
    <div>
      <div className="overflow-x-auto h-[40vh] rounded-md">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index} className="border-b px-4 py-2 bg-gray-300">
                  {toUpperCaseFirst(header.name)}
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
          <ModalContentTabular 
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
          <ModalContentTabular 
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

      {/* Ventana de Mensaje */}
      {showModal && modalMessage.on && (
        <Modal son ={
          <ModalContentMessage
          title = "Resultado" 
          message = {modalMessage.message} 
          acceptHandle = {cancel}
          />
        }/>
      )}
    </div>
  );
}
