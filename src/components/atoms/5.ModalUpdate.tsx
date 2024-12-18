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

    const onSubmit = () => {
        console.log(formik.values)
        // Aquí iría la confirm option, que no haría otra cosa que enviar la solicitud a la BD de update
    }
    

    const formik = useFormik({
        initialValues: initVals,
        onSubmit
    })

    console.log(formik)

    return (
        <>
            <h2 className="text-xl font-bold mb-4 text-center">
                Actualiza el Registro
            </h2> 
            <form onSubmit={formik.handleSubmit}>
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
                            minLength={headers[attr].constraints?.minLength}
                            maxLength={headers[attr].constraints?.maxLength}
                            min={headers[attr].constraints?.min}
                            max={headers[attr].constraints?.max}
                            pattern={headers[attr].constraints?.pattern}
                            value={formik.values[attr]}
                            onChange={formik.handleChange}
                            />                            
                        ) : (
                            <p className="text-center"> {entry[attr]} </p>    
                        )}
                        
                    </div>
                </div>
                ))}
            </div>                
                <div className="flex justify-center gap-6">
                    <button
                        type="submit"
                        className={`bg-yellow-400 hover:bg-yellow-500 text-gray-500 px-4 py-2 rounded`}
                    >
                        Actualizar
                    </button>
                    <button
                        type="button"
                        onClick={cancelAction}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"                        
                    >                            
                        Cancelar
                    </button>                  
                </div>    
            </form>                   
        </>
    );
}