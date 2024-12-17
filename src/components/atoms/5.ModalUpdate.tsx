import { useFormik } from "formik"
import { TableHeaders, DataEntry } from "@/types/types";
import { toUpperCaseFirst } from "@/utils/stringUtils";
import { getFormType } from "@/utils/BDUtils"

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
    var initVals: {[key: string]: String|Number} = {};
    
    Object.keys(entry).forEach(attr => {
        console.log(attr)
        if (headers[attr].modifiable) {
            console.log(`${attr}: Modifiable`)
            initVals[String(attr)] = ""
        }
    })

    console.log(initVals)

    const formik = useFormik({initialValues: initVals})
    console.log(formik)
    
    return (
        <>
            <h2 className="text-xl font-bold mb-4 text-center">
                Actualiza el Registro
            </h2> 
            <form>
            <div className="grid rounded-md">
                {Object.keys(headers).map((attr) => (
                <div
                    key={attr}
                    className="grid grid-cols-2 items-center hover:bg-gray-100"
                >
                    <div className="flex border-2 h-[100%] items-center justify-center p-2">
                        <p className="font-bold text-center">{toUpperCaseFirst(attr)}</p>
                    </div>
                    <div className="flex border-2 h-[100%] items-center justify-center p-2">
                        {headers[attr].modifiable ? (
                            <input
                            className="text-center rounded-md border-[0.1em]"
                            type={getFormType(headers[attr].type)}
                            id={attr}
                            placeholder={entry[attr]}
                            value={formik.values.attr}
                            onChange={formik.handleChange}
                            />                            
                        ) : (
                            <p className="text-center"> {entry[attr]} </p>    
                        )}
                        
                    </div>
                </div>
                ))}
            </div>
            </form>   
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