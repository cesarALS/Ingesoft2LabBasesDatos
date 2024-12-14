import React from "react";
import SelectorBar from "../molecules/3.SelectorBar";
import SearchBar from "../molecules/4.SearchBar";

export default function SearchView() {
  return (
    <div>
      <SelectorBar />
      <div className="max-w relative z-30 w-full bg-white shadow-lg">
        <div className="p-4">
          <SearchBar />
        </div>
        <div className="p-4">
          {/* Aquí va el contenido de la búsqueda */}
          Wenas
        </div>
      </div>
    </div>
  );
}
