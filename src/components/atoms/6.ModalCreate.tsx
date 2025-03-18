import { useFormik } from "formik"
import { toUpperCaseFirst } from "@/utils/stringUtils";
import { getFormType } from "@/utils/BDUtils";
import { TableHeaders } from "@/types/types";

interface ModalCreateProps {
    headers: TableHeaders,
    confirmAction: (data: {
        [key: string]: string | number | readonly string[] | undefined;
    }) => Promise<void>,
    cancelAction: () => void,
}

export default function ModalCreate(
    { headers, confirmAction, cancelAction } : ModalCreateProps
){

    const initialValues: {[key: string]: string|number|readonly string[] | undefined} = {};
    
    Object.keys(headers).forEach(attr => {
        const column = headers[attr];

        if (column.modifiable) {
            if (!column.possibleValues) initialValues[attr] = getFormType(column.type).defaultValue;
            else initialValues[attr] = column.possibleValues[0];            
        }
    });

    const onSubmit = () => {
        
        const data = formik.values
        for (const key in data) {
            data[key] = getFormType(headers[key].type).transform(key);            
        }
        confirmAction(data);        
    }    

    const formik = useFormik({initialValues, onSubmit});

    return (
        <>
        <p className="text-[1.3em] font-bold mb-4 text-center">
                Crea un nuevo registro
        </p>
        <form onSubmit={formik.handleSubmit}>
            <div className="grid gap-7">
                <div className="grid rounded-md">
                    {Object.entries(headers).map(([column, colInfo]) => (
                        <div
                            key={column}
                            className="grid grid-cols-2 items-center hover:bg-gray-100"
                        >
                            <div className="flex border-2 h-[100%] items-center justify-center p-2">
                                <p className="font-bold text-center">{toUpperCaseFirst(column)}</p>
                            </div>
                            <div className="flex border-2 h-[100%] items-center justify-center p-2">                    
                                {!colInfo.possibleValues ? (
                                    <input
                                        className="text-center rounded-md border-[0.1em]"
                                        type={getFormType(colInfo.type).jsType}
                                        id={column}
                                        placeholder={String(initialValues[column])}
                                        minLength={colInfo.constraints?.minLength}
                                        maxLength={colInfo.constraints?.maxLength}
                                        min={colInfo.constraints?.min}
                                        max={colInfo.constraints?.max}                            
                                        pattern={colInfo.constraints?.pattern}
                                        value={formik.values[column]}
                                        onChange={formik.handleChange}
                                        required={true}
                                    />
                                ) : (
                                    <select
                                        id={column}
                                        className="text-center rounded-md border-[0.1em]"
                                        value={formik.values[column]}
                                        onChange={formik.handleChange}  
                                        itemType=""                              
                                    >
                                        {
                                            colInfo.possibleValues.map((valueInRange) => (
                                                <option 
                                                key={valueInRange} 
                                                value={valueInRange}
                                                >
                                                    {toUpperCaseFirst(String(valueInRange))}
                                                </option>
                                            ))}
                                    </select>
                                )}                            
                            </div>                    
                        </div>
                    ))}
                </div>                
                
                <div className="flex justify-center gap-6">
                    <button
                        type="submit"
                        className={`bg-green-400 hover:bg-green-500 text-gray-700 px-4 py-2 rounded`}
                    >
                        Crear
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
    )
}