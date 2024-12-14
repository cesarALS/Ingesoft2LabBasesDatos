import React from "react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid";

interface SearchBarProps {
  headers: string[];
}

// Aquí hay que pasar los campos de la pestaña elegida para que sirvan como opciones, falta también hacer funcionar el botón de busqueda y el de agregar entrada para que muestre la CreateView respectiva, que debería funcionar majo menos igual que la UpdateView, pero con los campos vacíos

// Falta también programar la busqueda, que no es sino actualizar componentes después de haber hecho el query a la base de datos

export default function SearchBar({ headers }: SearchBarProps) {
  return (
    <div className="m-2 flex items-center rounded-lg bg-gray-200">
      {/* Search Input */}
      <input
        type="text"
        placeholder="buscar..."
        className="flex-grow bg-transparent px-2 text-gray-700 outline-none"
      />

      {/* "por" Text */}
      <span className="mx-2 text-gray-700">por</span>

      {/* Dropdown List */}
      <select className="mx-2 rounded-lg bg-white px-2 py-1 text-gray-700 outline-none">
        {headers.map((entry) => (
          <option key={entry} value={entry}>
            {entry}
          </option>
        ))}
      </select>

      {/* Search Button */}
      <button
        type="button"
        className="flex items-center rounded-l-lg bg-blue-500 px-3 py-2 text-white hover:bg-blue-600"
      >
        <MagnifyingGlassIcon className="h-5 w-5" />
        <span className="sr-only">Search</span> {/* For accessibility */}
      </button>

      {/* Add Entry Button */}
      <button
        type="button"
        className="flex items-center rounded-r-lg bg-green-500 px-3 py-2 text-white hover:bg-green-600"
      >
        <PlusIcon className="h-5 w-5" />
        <span className="sr-only">Add Entry</span> {/* For accessibility */}
      </button>
    </div>
  );
}
