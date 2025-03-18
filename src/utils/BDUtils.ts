/*
    Esta función sirve para los formularios, dado que toma el tipo de dato
    que bota la BD, y lo convierte en una entrada válida para "type" de 
    un form
*/

import { toUpperCaseFirst } from "./stringUtils";

export function getFormType(BDType: string){ 

    const typeEquivalence: {
        [key: string]: {
            jsType: string, 
            defaultValue: string | number, 
            transform: (value: string | number | Date) => string | number
        }
    } = {
        "integer": {
            jsType: "number", 
            defaultValue: 0, 
            transform: (value) => parseInt(String(value))
        },
        "double precision": {
            jsType: "number", 
            defaultValue: 0.0, 
            transform: (value) => parseFloat(String(value))
        },
        "bigint": {
            jsType: "number", 
            defaultValue: 0, 
            transform: (value) => parseInt(String(value))
        },
        "character varying": {
            jsType: "text", 
            defaultValue: "", 
            transform: (value) => toUpperCaseFirst(value as string)
        },
        "text": {
            jsType: "text", 
            defaultValue: "", 
            transform: (value) => toUpperCaseFirst(value as string)            
        },
        "USER-DEFINED": {
            jsType: "text", 
            defaultValue: "", 
            transform: (value) => toUpperCaseFirst(value as string)            
        },        
        "date": {
            jsType: "date", 
            defaultValue: new Date().toISOString().split("T")[0], 
            transform: (value) =>  new Date(value).toISOString().split("T")[0]    
        } 
    }

    return typeEquivalence[BDType];
};

