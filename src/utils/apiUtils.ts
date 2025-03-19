// Varias funciones que las APIS necesitan

import { prisma } from '@/libs/prisma'
import { toUpperCaseFirst } from './stringUtils';
import { Tables } from '@/types/types';

export interface ColumnInfo {
    column_name: string,
    data_type: string,
    character_maximum_length: number | null,
    numeric_precision: null | number,
}

export async function getColumnsInfo(tableName: string): Promise<ColumnInfo[]>{    
    
    const columnasInfo = await prisma.$queryRaw<ColumnInfo[]>
    `
        SELECT column_name, data_type, character_maximum_length, numeric_precision
        FROM information_schema.columns
        WHERE table_name = ${toUpperCaseFirst(tableName)}
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

//Determinar las restricciones de las columnas:
export const defConstraints = (
    columnName: string, 
    columnsInfo: ColumnInfo[], 
    tableName: string,
    tables: Tables
) => {
    let constraints = structuredClone(
        {
            minLength: 0,
            maxLength: 100,
            min: 0,
            max: 999999999999,
            pattern: ".*",
        }
    );

    const columnInfo = columnsInfo.find(col => col.column_name === columnName);
    
    if(!columnInfo) {
        console.error("Problema con columnInfo");
        return undefined; 
    }

    if (columnInfo.data_type === "character varying") {
        constraints.maxLength = columnInfo.character_maximum_length
          ? columnInfo.character_maximum_length
          : constraints.maxLength;
      }

    const table = tables[tableName];
    if(table && table.constraints[columnName]){
        const tableConstraints = table.constraints[columnName];

        // Fusiona las restricciones de la tabla con las restricciones por defecto
        constraints = {
          ...constraints,
          ...tableConstraints,
        };
    };

    return constraints;
    
}