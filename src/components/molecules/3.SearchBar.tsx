import React, { useState } from "react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid"
import { toUpperCaseFirst } from "@/utils/stringUtils";
import { Modal } from "./5.Modal";
import ModalCreate from "@/components/atoms/6.ModalCreate"
import { TableHeader } from "@/types/types"


interface SearchBarProps {
  headers: TableHeader;
  erasable: boolean
}

export default function SearchBar({ headers, erasable }: SearchBarProps) {
  
  const [showModal, setShowModal] = useState<boolean>(false)

  const handleUpdate = () => {
    setShowModal(true);
  }

  const cancel = () => {
    setShowModal(false)
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
          {Object.entries(headers).map(([key, entry]) => (
            <option key={key} value={key}>
              {toUpperCaseFirst(key)}
            </option>
          ))}        
        </select>

        { erasable ? (          
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
              onClick={handleUpdate}
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
      {showModal && (
        <Modal
        son = {
          <ModalCreate
          cancelAction={cancel}   
          headers={headers}       
          />
        }
        />
      )}
    </>  
  );
}
