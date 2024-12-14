import React from "react";

interface SelectorButtonProps {
  buttonText: string;
}

export default function SelectorButton({ buttonText }: SelectorButtonProps) {
  return (
    <button className="z-10 mx-1 rounded-t bg-blue-400 px-4 py-2 font-bold text-white shadow-lg hover:bg-blue-500">
      {buttonText}
    </button>
  );
}
