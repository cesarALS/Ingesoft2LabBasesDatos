import React from "react";

export default function LoadingWheel() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="grid place-items-center text-center items-center justify-center gap-4 w-[20vh]">
        <h1 className="text-gray-100 text-[2em] font-semibold">Cargando</h1>
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-transparent border-white"></div>
      </div>
    </div>
  );
}