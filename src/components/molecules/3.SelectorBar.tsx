import React from "react";
import SelectorButton from "@/components/atoms/0.SelectorButton";

interface SelectorBarProps {
  botones: string[];
}

// Los botones también funcionan dinamicamente, falta asignar las funciones a cada uno, ahí lo que hacen es cambiar la vista, actualizando el viewport y el searchView con la info pertinente, cuando le den a municipios, pos que aparezcan las entradas y los campos de municipios, y así pa cada uno, no es sino cambiar las entradas de los componentes y ya dependiendo del contexto

export default function SelectorBar({ botones }: SelectorBarProps) {
  return (
    <div className="max-w w-full pt-1">
      {botones.map((entry) => (
        <SelectorButton key={entry} buttonText={entry} />
      ))}
    </div>
  );
}
