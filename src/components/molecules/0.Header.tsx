// Create a component for the Header
import React from "react";

export default function Header() {
  return (
    <header className="flex items-center justify-center">
      <div className="max-w mb-2 flex w-full bg-white p-6 text-left text-2xl shadow-lg">
        <h1>Bienvenido</h1>
      </div>
    </header>
  );
}
