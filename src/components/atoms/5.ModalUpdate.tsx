import { useFormik } from "formik"
import { TableHeaders, DataEntry } from "@/types/types";

interface ModalUpdateProps {
    headers: TableHeaders
    entry: DataEntry,
    confirmAction: (() => void) | {} | (() => void)
    cancelAction: (() => void) | {} | (() => void)    
}

export default function ModalUpdate(
    { headers, entry, confirmAction, cancelAction } : ModalUpdateProps
){
    
    // Si da el tiempo, se pueden añadir tipos de Date
    var initialValues: {[key: string]: String|Number} = {};
    
    Object.keys(entry).forEach(attribute => {
        console.log(attribute)
        if (headers[attribute].modifiable) {
            console.log(`${attribute}: Modifiable`)
            initialValues[String(attribute)] = ""
        }
    })

    console.log(initialValues)
    
    return (
        <>
            <h2 className="text-xl font-bold mb-4 text-center">
                Actualiza el Registro
            </h2> 
            {/* Aquí va la fucking tabla */} 
            <div className="flex justify-center gap-6">
                <button
                onClick={confirmAction}
                className={`bg-yellow-400 hover:bg-yellow-500 text-gray-500 px-4 py-2 rounded`}
                >
                    Actualizar
                </button>
                <button
                onClick={cancelAction}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"                        
                >                            
                    Cancelar
                </button>                  
            </div>                       
        </>
    );
}