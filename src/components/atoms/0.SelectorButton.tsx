"use client"

import React from "react";

interface SelectorButtonProps {
  buttonText: string;
  onClick: () => void;
  activeTable: string;
}

export default function SelectorButton({ buttonText, onClick, activeTable }: SelectorButtonProps) {
  var col = "bg-blue-400"
  if (activeTable==buttonText){
    col = "bg-blue-700"
  }
  return (
    <button 
      className={`z-10 mx-1 rounded-t ${col} px-4 py-2 font-bold text-white shadow-lg hover:bg-blue-700`}
      onClick={onClick}
      title={`Ver vista de ${buttonText}`}
    >
      {buttonText}
    </button>
  );
}
