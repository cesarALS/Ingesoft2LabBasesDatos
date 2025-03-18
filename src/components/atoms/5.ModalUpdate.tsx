import { useFormik } from "formik"
import { TableHeaders, DataEntry } from "@/types/types";
import { toUpperCaseFirst } from "@/utils/stringUtils";
import { getFormType } from "@/utils/BDUtils"

interface ModalUpdateProps {
    headers: TableHeaders
    entry: DataEntry,
    confirmAction: (id: string, bod: object) => Promise<void>,
    cancelAction: () => void,  
}

export default function ModalUpdate(
    { headers, entry, confirmAction, cancelAction } : ModalUpdateProps
){
        
    const initialValues: {[key: string]: string | number | readonly string[] | undefined} = {};
    
    Object.keys(entry).forEach(attr => {
        const column = headers[attr];

        if (column.modifiable) {
            if (!column.possibleValues) initialValues[attr] = getFormType(column.type).defaultValue;
            else initialValues[attr] = column.possibleValues[0];            
        }
    });

    const onSubmit = () => {        
        let pk = "";
        
        const data = formik.values;                

        for (const attr in data) {
            const column = headers[attr];
            
            if (column.isPrimaryKey) pk = entry[attr] as string;
            
            if(getFormType(column.type).jsType === "number"){
                data[attr] = parseInt(String(data[attr]), 10);
            }
        };

        confirmAction(pk, data);        
    }
    
    const formik = useFormik({initialValues, onSubmit});

    return (
        <>
            <p className="text-[1.3em] font-bold mb-4 text-center">
                Actualiza el Registro
            </p> 
            <form onSubmit={formik.handleSubmit}>
                <div className="grid gap-7">
                    <div className="grid rounded-md">
                        {Object.entries(headers).map(([col, column]) => (
                        <div
                            key={col}
                            className="grid grid-cols-2 items-center hover:bg-gray-100"
                        >
                            <div className="flex border-2 h-[100%] items-center justify-center p-2">
                                <p className="font-bold text-center">{toUpperCaseFirst(col)}</p>
                            </div>
                            <div className="flex border-2 h-[100%] items-center justify-center p-2">                    
                            {
                                !column.modifiable ? (
                                    <p className="text-center">                                         
                                        {getFormType(column.type).transform(entry[col])}
                                    </p>   
                                ) : (
                                    !column.possibleValues ? (
                                        <input
                                            className="text-center rounded-md border-[0.1em]"
                                            type={getFormType(column.type).jsType}
                                            id={col}
                                            placeholder={String(entry[col])}
                                            minLength={column.constraints?.minLength}
                                            maxLength={column.constraints?.maxLength}
                                            min={column.constraints?.min}
                                            max={column.constraints?.max}                            
                                            pattern={column.constraints?.pattern}
                                            value={formik.values[col]}
                                            onChange={formik.handleChange}
                                            required={true}
                                        />
                                    ) : (
                                        <select
                                            id={col}
                                            className="text-center rounded-md border-[0.1em]"
                                            value={formik.values[col]}
                                            onChange={formik.handleChange}  
                                            itemType=""                              
                                        >
                                            {
                                                column.possibleValues.map((valueInRange) => (
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