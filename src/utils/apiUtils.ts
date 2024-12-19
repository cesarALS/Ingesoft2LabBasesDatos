// Varias funciones que las APIS necesitan

import {prisma} from '@/libs/prisma'
import { toUpperCaseFirst } from './stringUtils';


export async function getColumnsInfo(tableName: string){
    
    const upperTableName = toUpperCaseFirst(tableName)
    
    const columnasInfo = await prisma.$queryRaw
    `
        SELECT column_name, data_type, character_maximum_length, numeric_precision
        FROM information_schema.columns
        WHERE table_name = ${upperTableName}
        ORDER BY ordinal_position;
    `
    ;

    return columnasInfo;
}

interface ResponseValidateAllRegisters {
    allParameters: boolean,
    missingParamenters: string[]
}

export async function validateAllRegisters(
    tableName: string, 
    parameters: {}, 
    exceptions: string[]
) : Promise <ResponseValidateAllRegisters>{
        
    const columnsInfo = await getColumnsInfo(tableName);
    
    var columnInRequest: {[key: string]: boolean} = {}; // Arreglo que verifica que estén todas las entradas
    
    for (column in columnsInfo) {
        const colName = column.column_name;
        columnInRequest[String(colName)] = false;
    }
    
    var allParameters: boolean = true;
    var missingParameters = []
    
    for (attr in columnInRequest){
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