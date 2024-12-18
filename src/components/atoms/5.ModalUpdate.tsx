import { useFormik } from "formik"
import { TableHeaders, DataEntry } from "@/types/types";
import { toUpperCaseFirst } from "@/utils/stringUtils";
import { getFormType } from "@/utils/BDUtils"

interface ModalUpdateProps {
    headers: TableHeaders
    entry: DataEntry,
    confirmAction: (id: string, bod: {}) => Promise<void>
    cancelAction: (() => void) | {} | (() => void)    
}

export default function ModalUpdate(
    { headers, entry, confirmAction, cancelAction } : ModalUpdateProps
){
    
    // Si da el tiempo, se pueden añadir tipos de Date
    var initVals: {[key: string]: string|number|readonly string[] | undefined} = {};
    
    Object.keys(entry).forEach(attr => {
        if (headers[attr].modifiable) {
            if (!headers[attr].possibleValues){
                switch (getFormType(headers[attr].type)){
                    case "text":
                        initVals[String(attr)] = "";
                        break;
                    case "number":
                        initVals[String(attr)] = 0;
                        break;
                    case "date":
                        initVals[String(attr)] = "";
                        break;
                    default:
                        initVals[String(attr)] = "";                        
                }
            } else {
                initVals[String(attr)] = headers[attr].possibleValues[0]
            }
            
        }
    })

    const onSubmit = () => {
        console.log(formik.values)
        var pk = "";
        Object.keys(entry).forEach(attr =>{
            if (headers[attr].isPrimaryKey) pk = entry[attr];
        })
        const data = formik.values
        for (let key in data) {
            if(getFormType(headers[key].type) === "number"){
                data[key] = parseInt(String(data[key]), 10)
            }
        }
        confirmAction(pk, data);
        // Aquí iría la confirm option, que no haría otra cosa que enviar la solicitud a la BD de update
    }
    

    const formik = useFormik({
        initialValues: initVals,
        onSubmit
    })

    return (
        <>
            <p className="text-[1.3em] font-bold mb-4 text-center">
                Actualiza el Registro
            </p> 
            <form onSubmit={formik.handleSubmit}>
                <div className="grid gap-7">
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
                            {
                                !headers[attr].modifiable ? (
                                    <p className="text-center"> 
                                        {!(headers[attr].type === "date") ? (
                                            entry[attr]
                                        ) : (
                                            new Date(entry[attr]).toISOString().split("T")[0]
                                        )                                        
                                        } 
                                    </p>   
                                ) : (
                                    !headers[attr].possibleValues ? (
                                        <input
                                        className="text-center rounded-md border-[0.1em]"
                                        type={getFormType(headers[attr].type)}
                                        id={attr}
                                        placeholder={String(entry[attr])}
                                        minLength={headers[attr].constraints?.minLength}
                                        maxLength={headers[attr].constraints?.maxLength}
                                        min={headers[attr].constraints?.min}
                                        max={headers[attr].constraints?.max}                            
                                        pattern={headers[attr].constraints?.pattern}
                                        value={formik.values[attr]}
                                        onChange={formik.handleChange}
                                        required={true}
                                        />
                                    ) : (
                                        <select
                                        id={attr}
                                        className="text-center rounded-md border-[0.1em]"
                                        value={formik.values[attr]}
                                        onChange={formik.handleChange}  
                                        itemType=""                              
                                        >
                                            {
                                                headers[attr].possibleValues.map((valueInRange) => (
                                                    <option 
                                                    key={valueInRange} 
                                                    value={valueInRange}
                                                    >
                                                        {toUpperCaseFirst(String(valueInRange))}
                                                    </option>
                                                ))}
                                        </select>
                                    )
                                )
                            }
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
                </div>        
            </form>                   
        </>
    );
}