import { NextResponse } from "next/server"
import {prisma} from '@/libs/prisma'
import JSONBig from 'json-bigint';

export async function GET(request, {params}) {
    try {

        const {searchParams} = new URL(request.url);
        const nombre = searchParams.get('nombre')
        const area = searchParams.get('area')
        const poblacion = searchParams.get('poblacion')
        const gobernador = searchParams.get('gobernador')        

        const filters = {};
        if (nombre) filters.nombre = { contains: nombre, mode: 'insensitive' }; // Búsqueda parcial
        if (area) filters.area = {lte : parseFloat(area)}; // Menor o igual al área
        if (poblacion) filters.poblacion = { lte: parseInt(poblacion) }; // Menor o igual a población
        if (gobernador) filters.gobernador = { contains: gobernador, mode: 'insensitive' }; // Búsqueda parcial
        //console.log(filters)
        const data = await prisma.departamento.findMany({
            where: filters
        });

        // Consulta de nombres y tipos de columnas
        const columnasInfo = await prisma.$queryRaw
        `
            SELECT column_name, data_type, character_maximum_length, numeric_precision
            FROM information_schema.columns
            WHERE table_name = 'Departamento'
            ORDER BY ordinal_position;
        `
        ;
        
        // Determinar cuáles columnas son modificables
        const columnasModificables = ['poblacion','gobernador'];
        const erasable = []    

        function defPossibleValues(column_name, colsInfo) {
            let constraints = {
                minLength: 0,
                maxLength: 0,
                min: 0,
                max: 0,
                step: 0,
                pattern: "",
            };
        
            // Obtener información de la columna correspondiente
            const columnInfo = colsInfo.find(col => col.column_name === column_name);
        
            if (!columnInfo || !columnasModificables.includes(column_name)) {
                return null; // Si no es modificable, no definimos constraints
            }
        
            // Dependiendo del tipo de dato y la columna, establecer las restricciones
            switch (column_name) {
                case 'poblacion':
                    constraints.min = 0; 
                    constraints.step = 1000; 
                    break;
                case 'gobernador':
                    constraints.maxLength = columnInfo.character_maximum_length;
                    break;
            }
        
            return constraints;
        }
        
        // Formatear la información de las columnas
        const headers = columnasInfo.reduce((acc, col) => {
            const constraints = defPossibleValues(col.column_name, columnasInfo);

            console.log(constraints)
            
            acc[col.column_name] = {
                type: col.data_type,
                modifiable: columnasModificables.includes(col.column_name),
                constraints: constraints,
                possibleValues: null
            };
            return acc;
        }, {});

        console.log(headers);
        // console.log(data)
        return NextResponse.json({headers,data, erasable: false})       

    } catch (error) {
    console.error('Error en el endpoint:', error);
    res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud' });
    }    
  }

