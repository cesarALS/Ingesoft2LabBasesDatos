import React from "react";
import SelectorButton from "@/components/atoms/0.SelectorButton";

export default function SelectorBar() {
  return (
    <div className="max-w w-full pt-1">
      <SelectorButton buttonText="Municipios" />
      <SelectorButton buttonText="Viviendas" />
      <SelectorButton buttonText="Personas" />
      <SelectorButton buttonText="Departamentos" />
    </div>
  );
}
