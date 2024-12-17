// Los anuncios que se despliegan en la mitad de la pantalla y que oscurecen el fondo de la misma

import { Component } from "react";

interface modalSon {
    son: Component;
}

export function Modal( { son }: modalSon ){
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="flex flex-col gap-4 justify-center bg-white p-8 rounded-md shadow-lg">
                {son}
            </div>
        </div>
    );
}


