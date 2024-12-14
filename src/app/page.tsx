import React from "react";
import Header from "@/components/molecules/0.Header";
import Footer from "@/components/molecules/1.Footer";
import SearchView from "@/components/organisms/0.SearchView";

export default function Main() {
  return (
    // Donde va todo el contenido de la página, centradito y con padding en todas las direcciones, aqui van los tres bloques, el header, el footer y el viewport
    // En el viewport se muestra la barra de busqueda, las pestanas de cada tipo de contenido y también los modos de adición y edición de contenido
    <div className="m-gray-500 mx-14 my-10 bg-gray-100">
      <Header />

      {/* Este sería el viewport */}
      <div>
        <SearchView />
      </div>

      <Footer />
    </div>
  );
}
