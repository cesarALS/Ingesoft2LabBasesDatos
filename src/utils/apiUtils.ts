// Varias funciones que las APIS necesitan

import {prisma} from '@/libs/prisma'
import { toUpperCaseFirst } from './stringUtils';

interface ColumnInfo {
    column_name: string,
    data_type: string,
    character_maximum_length: number | null,
    numeric_precision: null | number,
}

export async function getColumnsInfo(tableName: string): Promise<ColumnInfo[]>{
    
    const upperTableName = toUpperCaseFirst(tableName)
    
    const columnasInfo = await prisma.$queryRaw<ColumnInfo[]>
    `
        SELECT column_name, data_type, character_maximum_length, numeric_precision
        FROM information_schema.columns
        WHERE table_name = ${upperTableName}
        ORDER BY ordinal_position;
    `
    ;
    
    console.log(columnasInfo);
    return columnasInfo;
}

interface ResponseValidateAllRegisters {
    allParameters: boolean,
    missingParamenters: string[]
}

export async function validateAllRegisters(
    tableName: string, 
    parameters: object, 
    exceptions: string[]
) : Promise <ResponseValidateAllRegisters>{
        
    const columnsInfo = await getColumnsInfo(tableName);
    
    const columnInRequest: {[key: string]: boolean} = {}; // Arreglo que verifica que estén todas las entradas
    
    for (const column of columnsInfo) {
        const colName: string = column.column_name;
        columnInRequest[String(colName)] = false;
    }
    
    let allParameters = true;
    const missingParameters = []
    
    for (const attr in columnInRequest){
        if (attr in parameters) {
            columnInRequest[attr] = true;
            if (!exceptions.includes(attr)){
                allParameters = false;
                missingParameters.push(attr)
            }
        }
    }

    return {
        allParameters: allParameters,
        missingParamenters: missingParameters
    };
}

export const defaultConstraints =  {
    minLength: 0,
    maxLength: 100,
    min: 0,
    max: 999999999999,
    pattern: ".*",
}