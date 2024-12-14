import React from "react";
import Header from "@/components/0.Header";
import Footer from "@/components/1.Footer";

export default function Main() {
  return (
    // Donde va todo el contenido de la página, centradito y con padding en todas las direcciones, aqui van los tres bloques, el header, el footer y el viewport
    // En el viewport se muestra la barra de busqueda, las pestanas de cada tipo de contenido y también los modos de adición y edición de contenido
    <div className="mx-14 my-10">
      <Header />

      {/* Este sería el viewport */}
      <div className="w-full max-w bg-white p-6 shadow-md text-left">
        <p>Wenas, soy el viewport</p>
      </div>

      <Footer />
    </div>
  );
}
