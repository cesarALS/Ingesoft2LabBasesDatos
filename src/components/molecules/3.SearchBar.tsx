import React, { useState } from "react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid"
import { toUpperCaseFirst } from "@/utils/stringUtils";
import Modal from "./5.Modal";
import ModalCreate from "@/components/atoms/6.ModalCreate"
import ModalContentMessage from "../atoms/3.ModalContentMessage";
import { createRow } from "@/utils/requestFunctions";
import { useTableManagementStore } from "@/utils/TableStore";
import { TableHeaders } from "@/types/types";

export default function SearchBar() {
  
  const { table, setLoadingState, reloadTable, modal, setModal } = useTableManagementStore();
  
  const [showModal, setShowModal] = useState<boolean>(false)
  const [creatingRegister, setCreatingRegister] = useState<boolean>(false);

  const handleCreate = () => {
    setShowModal(true);
    setCreatingRegister(true);
  }

  const confirmCreate = async (data: {
    [key: string]: string | number | readonly string[] | undefined;
}) => {    
      
    setLoadingState(true, "Creando");
    const res = await createRow(data, table.tableName);
    setLoadingState(false);    
      
    setCreatingRegister(false); 

    if (res.status === 200 || res.status === 202 || res.status === 204){        
      setModal(true, `Éxito: ${res.message}`, true);
    } else setModal(true, `Error: ${res.message}`, false);
            
  }

  const cancel = () => {
    setShowModal(false)
    setCreatingRegister(false)
    setModal(false);
  }
  
  return (
    <>
      <div className="m-2 flex items-center rounded-lg bg-gray-200 hover:bg-gray-300 w-[75%]">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Buscar..."
          className="flex-grow bg-transparent px-2 pl-6 text-gray-700 outline-none "
        />

        {/* "por" Text */}
        <span className="mx-2 text-gray-700 ">Por</span>

        {/* Dropdown List */}
        <select className="mx-2 rounded-lg bg-white px-2 py-1 text-gray-700 outline-none hover:bg-gray-100 ">
          {Object.entries(table.headers).map(([key]) => (
            <option key={key} value={key}>
              {toUpperCaseFirst(key)}
            </option>
          ))}        
        </select>

        { table.erasable ? (          
          <>
            <button
              type="button"
              className="flex items-center rounded-l-lg bg-blue-500 px-3 py-2 text-white hover:bg-blue-600 "
              title="Hacer la búsqueda"
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
              <span className="sr-only">Search</span> {/* For accessibility */}
            </button>

            <button
              type="button"
              className="flex items-center rounded-r-lg bg-green-500 px-3 py-2 text-white hover:bg-green-600 "
              title = "Añadir un nuevo registro"
              onClick={handleCreate}
            >
              <PlusIcon className="h-5 w-5" />
              <span className="sr-only">Add Entry</span> {/* For accessibility */}
            </button>        
          </>
        ) : (
          <>
          <button
            type="button"
            className="flex items-center rounded-md bg-blue-500 px-3 py-2 text-white hover:bg-blue-600 "
            title="Hacer la búsqueda"
          >
            <MagnifyingGlassIcon className="h-5 w-5" />
            <span className="sr-only">Search</span> {/* For accessibility */}
          </button>          
          </>
        )
        }

      </div>
      {showModal && creatingRegister && (
        <Modal>
          <ModalCreate
          cancelAction={cancel}   
          headers={table.headers as TableHeaders}    
          confirmAction={confirmCreate}   
          />        
        </Modal>
      )}
      {modal.isOpen && (
        <Modal>
          <ModalContentMessage
          title = "Resultado" 
          message = {modal.message as string} 
          success = {modal.success as boolean}
          acceptHandle = {() => {
            cancel(); 
            reloadTable();
          }}
          />
        </Modal>
      )}
    </>  
  );
}
