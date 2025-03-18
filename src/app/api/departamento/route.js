import { NextResponse } from "next/server"
import { prisma } from '@/libs/prisma'
import { Prisma } from '@prisma/client'

import { getColumnsInfo, defaultConstraints, validateAllRegisters } from "@/utils/apiUtils";

const columnasModificables = ['poblacion','gobernador'];
const ids = ['nombre'];
const notChoosableInCreate = []

export async function GET(request) {
    try {

        const {searchParams} = new URL(request.url);
        const nombre = searchParams.get('nombre')
        const area = searchParams.get('area')
        const poblacion = searchParams.get('poblacion')
        const gobernador = searchParams.get('gobernador')        

        const filters = {};
        if (nombre) filters.nombre = { contains: nombre, mode: 'insensitive' }; // Búsqueda parcial
        if (area) filters.area = {lte : parseInt(area)}; // Menor o igual al área
        if (poblacion) filters.poblacion = { lte: parseInt(poblacion) }; // Menor o igual a población
        if (gobernador) filters.gobernador = { contains: gobernador, mode: 'insensitive' }; // Búsqueda parcial
        //console.log(filters)
        const data = await prisma.departamento.findMany({
            where: filters,
            orderBy: {
                nombre: 'asc',  
            },
        });

        const columnasInfo = await getColumnsInfo('Departamento');
        
        // Determinar cuáles columnas son modificables


        function defPossibleValues(column_name, colsInfo) {
            let constraints = Object.assign({}, defaultConstraints);
        
            // Obtener información de la columna correspondiente
            const columnInfo = colsInfo.find(col => col.column_name === column_name);
            
            if (columnInfo.data_type === "character varying") {
                constraints.maxLength = columnInfo.character_maximum_length;
            }

            // Dependiendo del tipo de dato y la columna, establecer las restricciones
            switch (column_name) {
                case 'gobernador':
                    constraints.minLength = 4;
                    break;
                case 'nombre':            
                    constraints.minLength = 2;
                    break;
                case 'area':
                    constraints.min = 1;
                    break;
            }
        
            return constraints;
        }
        
        // Formatear la información de las columnas
        const headers = columnasInfo.reduce((acc, col) => {
            
            const constraints = defPossibleValues(col.column_name, columnasInfo);
            
            acc[col.column_name] = {
                type: col.data_type,
                modifiable: columnasModificables.includes(col.column_name),
                constraints: constraints,
                possibleValues: null,
                isPrimaryKey: ids.includes(col.column_name),
                choosableInCreate: !notChoosableInCreate.includes(col.column_name),
            };
            return acc;
        }, {});

        return NextResponse.json({headers,data, erasable: true})       

    } catch (error) {
    console.error('Error en el endpoint:', error);
    res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud' });
    }    
}

export async function PUT (request){
       
    try {   
        
        const { id, data } = await request.json();

        // Validar que el ID y los datos existen
        if (!id || !data) {
            return NextResponse.json(
                {error: 'El ID y los datos son obligatorios'},
                {status: 400}
            )
        }

      // Actualizar el registro en la base de datos
      await prisma.departamento.update({
        where: { nombre: id }, // Identifica el registro
        data, // Datos para actualizar
      });

      // Devolver la respuesta
      return NextResponse.json(
        {message: 'Departamento actualizado'},
        {status: 200}
      )
    } catch (e) {
      // console.log(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return NextResponse.json({
            error: 'Error en el ciente',
        }, { status: 400 });        
      }
      return NextResponse.json(
        {message: 'Error actualizando el departamento'},
        {status: 500}
      );
    }
} 

export async function POST (request){
    
    try{
        const {data} = await request.json();

        console.log("Aquí vamos")

        const { allParameters, missingParameters } = await validateAllRegisters(
            'Departamento',
            data,
            notChoosableInCreate
        )

        console.log("Aquí seguimos")

        if (!allParameters){
            return NextResponse.json(
                { message: `Faltran atributos: ${missingParameters}` },
                { status: 400},
            );
        }

        await prisma.departamento.create({
            data: data
        })

        return NextResponse.json({ message: "Departamento Creado"});
    } catch (e){
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({
                error: 'Datos inválidos',
            }, { status: 400 }); // Respuesta 400: error del cliente            
            /*
            if (e.code === 'P2003') {}
            */
        } else {
            console.log(e);
            return NextResponse.json({
                error: 'Ocurrió un error inesperado al procesar la solicitud.',
            }, { status: 500 }); // Respuesta 500: error del servidor            
        }       
    }

}   

export async function DELETE(request) {
    
    try {
        const {searchParams} = new URL(request.url);
        const id = searchParams.get('id');

        // Intentamos eliminar el departamento
        await prisma.departamento.delete({
            where: {
                nombre: String(id)
            }
        });

        return NextResponse.json({ message: "Departamento removido" });
    } catch (e) {

        
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({
                error: 'Otras referencias dependen del departamento',
            }, { status: 400 }); // Respuesta 400: error del cliente            
            /*
            if (e.code === 'P2003') {}
            */
        }

        // Manejo de errores genéricos
        return NextResponse.json({
            error: 'Ocurrió un error inesperado al procesar la solicitud.',
        }, { status: 500 }); // Respuesta 500: error del servidor
    }    
}

