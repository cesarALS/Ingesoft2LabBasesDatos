import React from "react";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/solid";

export default function SearchBar() {
  return (
    <div className="m-2 flex items-center rounded-lg bg-gray-200">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search..."
        className="flex-grow bg-transparent px-2 text-gray-700 outline-none"
      />

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
