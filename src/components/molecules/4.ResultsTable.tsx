import { PencilIcon } from "@heroicons/react/24/solid";
import { FaTrash } from "react-icons/fa";
import ModalContentMessage from "../atoms/3.ModalContentMessage";
import { deleteRow, updateRow  } from "@/utils/requestFunctions";
import { DataEntry, TableHeaders } from "@/types/types"
import { toUpperCaseFirst } from "@/utils/stringUtils";
import ModalDelete from "../atoms/4.ModalDelete";
import ModalUpdate from "../atoms/5.ModalUpdate";
import Modal from "@/components/molecules/5.Modal"
import { useTableManagementStore } from "@/utils/TableStore";
import { getFormType } from "@/utils/BDUtils";

export default function ResultsTable() {

  const { 
    table, 
    reloadTable, 
    setLoadingState, 
    modal, 
    setModal, 
    CRUD, 
    setCRUDAction 
  } = useTableManagementStore();

  const { tableName, headers, data, erasable } = table;        
  
  const confirmDelete = async () => {    
      
    if (CRUD.currentEntry){
      setLoadingState(true, "Borrando");
      const res = await deleteRow(CRUD.currentEntry.id, tableName);
      setLoadingState(false);
  
      setCRUDAction(null);      
  
      if (res.status === 200 || res.status === 202 || res.status === 204){        
        setModal(true, `Éxito: ${res.message}`, true);
      } else setModal(true, `Error: ${res.message}`, false);

    } else console.error("No hay ítem para borrar");

  };
  
  const confirmUpdate = async (id: string, bod: object) => {    
    setLoadingState(true, "Actualizando");
    const res = await updateRow(id, bod, tableName);
    setLoadingState(false);
      
    setCRUDAction(null);

    if (res.status === 200 || res.status === 202 || res.status === 204){        
      setModal(true, `Éxito: ${res.message}`, true);
    } else setModal(true, `Error: ${res.message}`, false);        
  }

  const cancel = () => {
    setCRUDAction(null);        
    setModal(false);
  };
  
  const header = Object.entries(headers);

  return (
    <div>
      <div className="overflow-x-auto h-[40vh] rounded-md">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              {header.map(([col, ], index) => (                
                <th key={index} className="border-b px-4 py-2 bg-gray-300">
                  {toUpperCaseFirst(col)}
                </th>                
              ))}        
              <th className="border-b px-4 py-2 bg-gray-300">Editar</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr 
                key={index} 
                className="border-b hover:bg-gray-200"
              >                
                  {header.map(([col, colInfo], index) => (
                    <td key={index} className="text-center px-4 py-2">
                      {getFormType(colInfo.type).transform(entry[col])}
                    </td>                  
                  ))}
                <td className="flex justify-center px-4 py-2">
                  <>
                    <button 
                      className={`flex items-center justify-center ${erasable? "rounded-l" : "rounded-md"}  bg-blue-500 px-2 py-2 text-white hover:bg-blue-600`}
                      title = "Editar este registro"
                      onClick={() => setCRUDAction("U", entry)}
                    >                        
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    {erasable && (
                      <button 
                      className="flex items-center justify-center rounded-r bg-red-500 px-2 py-2 text-white hover:bg-red-600"
                      title = "Borrar este registro"
                      onClick={() => setCRUDAction("D", entry)}
                    >                        
                      <FaTrash className="h-5 w-5" />
                      </button>                    
                    )}                                        
                  </>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Modal de Delete */}
      {CRUD.currentAction === "D" && (
        <Modal>
            <ModalDelete
              headers={headers as TableHeaders}
              entry={CRUD.currentEntry as DataEntry}
              confirmAction={confirmDelete}
              cancelAction={cancel}
            />                  
        </Modal>
      )}

      {/* Modal de Update */}
      {CRUD.currentAction === "U" && (
        <Modal>
          <ModalUpdate
            headers={headers as TableHeaders}
            entry={CRUD.currentEntry as DataEntry}
            confirmAction={confirmUpdate}
            cancelAction={cancel}
          />
        </Modal>
      )}

      {/* Modal de Mensaje */}
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
    </div>
  );
}
