import { AttributeConstraints, PrismaModelName, TableHeader, Tables } from "@/types/types";
import { defConstraints, getColumnsInfo } from "@/utils/apiUtils";
import { NextRequest, NextResponse } from "next/server"
import { prisma } from '@/libs/prisma'
import JSONBig from 'json-bigint';

const tables: Tables = {
    "departamento": {
        name: "Departamento",
        prismaName: "departamento",
        constraints: {
            "gobernador": {
                minLength: 4,
            },
            "nombre":{
                minLength: 2,
            },
            "area":{
                min: 1,
            }            
        },
        modifiableColumns: ['poblacion','gobernador'],
        ids: ['nombre'],
        notChoosableInCreate: [],
        hasBigInt: false,
    },
    "municipio": {
        name: "Municipio",
        prismaName: "municipio",
        constraints: {
            "alcalde":{
                minLength: 4,
            },
            "nombre":{
                minLength: 2,
            },
            "area":{
                min: 1
            }
        },
        modifiableColumns: ['poblacion','alcalde'],
        ids: ['id'],
        notChoosableInCreate: ['id'],
        defRange: async (columnName) => {
            if(columnName === 'departamentoNombre'){
                const departamentos = await prisma.departamento.findMany({
                    select: { nombre: true },
                    orderBy: {
                        nombre: 'asc'
                    }
                });
                return departamentos.map(departamento => departamento.nombre);                
            } else return null;
        },
        hasBigInt: false,
    },
    "vivienda": {
        name: "Vivienda",
        prismaName: "vivienda",
        constraints: {
            "direccion":{
                minLength: 3
            },
            "tamano":{
                max: 1000
            },
            "pisos":{
                min: 1,
                max: 10,
            }
        },
        modifiableColumns: ['direccion','pisos'],
        defRange: async (columnName) => {
            if(columnName === 'municipioId'){
                const municipios = await prisma.municipio.findMany({
                    select: { id: true },
                    orderBy: {
                        nombre: 'asc',
                    },
                });
                return municipios.map(municipio => municipio.id);               
            } else return null;
        },
        ids: ['id'],
        notChoosableInCreate: ['id'],
        hasBigInt: false,
    },
    "persona": {
        name: "Persona",
        prismaName: "persona",
        constraints: {
            "telefono":{
                min: 3000000000,
                max: 3999999999,
            },
            "nombre": {
                minLength: 3,
            },
        },
        modifiableColumns: ['telefono','genero','vivienda_id','nombre'],
        defRange: async (columnName) => {
            switch (columnName) {
                case 'genero':
                    return ['femenino', 'masculino', 'otro'];
                case 'vivienda_id':
                    const viviendas = await prisma.vivienda.findMany({
                        select: { id: true },
                        orderBy: {
                            id: 'asc'
                        }
                    });
                    return viviendas.map(vivienda => vivienda.id);
                default:
                    return null;
            }
        },
        ids: ['id'],
        notChoosableInCreate: [],
        hasBigInt: true,
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const models: Record<PrismaModelName, any> = {
    departamento: prisma.departamento,
    municipio: prisma.municipio,
    vivienda: prisma.vivienda,
    persona: prisma.persona,
};

export const GET = async (request: NextRequest) => {

    try {

        let err: {error: string , status: number} | null = null;

        const params = request.nextUrl.searchParams;
        
        const table = params.get('table');
        if(!table) return NextResponse.json(
            {error: "TABLE_NOT_PROVIDED"}, 
            {status: 400}
        );
        
        const tableInfo = tables[table];
        if(!tableInfo) return NextResponse.json(
            { error: "NON_EXISTENT_TABLE" },
            { status: 400 } 
        );  
        
        const prismaName = tableInfo.prismaName;
        const data = await models[prismaName].findMany({});

        const columnsInfo = await getColumnsInfo(tableInfo.name);  

        const tableHeaders: Record<string, TableHeader> = {};

        for (const col of columnsInfo) {
            const constraints = defConstraints(col.column_name, columnsInfo, table, tables);
            if (!constraints) {
                err = { error: "INTERNAL_SERVER_ERROR", status: 500 };
                continue;
            }

            tableHeaders[col.column_name] = {
                type: col.data_type,
                modifiable: tableInfo.modifiableColumns.includes(col.column_name),
                constraints: constraints as AttributeConstraints,
                possibleValues: tableInfo.defRange ? await tableInfo.defRange(col.column_name) : null,
                isPrimaryKey: tableInfo.ids.includes(col.column_name),
                choosableInCreate: !tableInfo.notChoosableInCreate.includes(col.column_name),
            };
        }

        if(err) return NextResponse.json(
            {error: err.error},
            {status: err.status},
        );

        return NextResponse.json({
            status: 200,
            headers: tableHeaders,
            data: tableInfo.hasBigInt? JSONBig.stringify(data) : data,
            erasable: true,
            hasBigInt: tableInfo.hasBigInt,
        });

    } catch(e){
        console.error("Error en el endpoint: ", e as string);
        return NextResponse.json(
            {error: "INTERNAL_SERVER_ERROR"},
            {status: 500},            
        );
    }
    
};