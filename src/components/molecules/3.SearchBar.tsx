import React from "react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid"
import { toUpperCaseFirst } from "@/utils/stringUtils";
import { TableHeader } from "@/types/types"

interface SearchBarProps {
  headers: TableHeader;
  erasable: boolean
}

// Aquí hay que pasar los campos de la pestaña elegida para que sirvan como opciones, falta también hacer funcionar el botón de busqueda y el de agregar entrada para que muestre la CreateView respectiva, que debería funcionar majo menos igual que la UpdateView, pero con los campos vacíos

// Falta también programar la busqueda, que no es sino actualizar componentes después de haber hecho el query a la base de datos

export default function SearchBar({ headers, erasable }: SearchBarProps) {
  
  return (
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
        {/*headers.map((entry) => (
          <option key={entry.name} value={entry.name}>
            {toUpperCaseFirst(entry.name)}
          </option>
        ))*/}
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
  );
}
