import { NextResponse } from "next/server"
import {prisma} from '@/libs/prisma'
import JSONBig from 'json-bigint';
import { Prisma } from '@prisma/client'

export async function GET(request, {params}) {
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
        const ids = ['nombre'];
        const notChoosableInCreate = []

        function defPossibleValues(column_name, colsInfo) {
            let constraints = {
                minLength: 0,
                maxLength: 100,
                min: 0,
                max: 999999999999,
                pattern: ".*",
            };
        
            // Obtener información de la columna correspondiente
            const columnInfo = colsInfo.find(col => col.column_name === column_name);
        
            if (!columnInfo || !columnasModificables.includes(column_name)) {
                return null; // Si no es modificable, no definimos constraints
            }
        
            // Dependiendo del tipo de dato y la columna, establecer las restricciones
            switch (column_name) {
                case 'gobernador':
                    constraints.maxLength = columnInfo.character_maximum_length;
                    constraints.minLength = 10;
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

export async function PUT (request, {params}){
       
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
      const updatedDepartamento = await prisma.departamento.update({
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

export async function DELETE(request, {params}) {
    
    try {
        const {searchParams} = new URL(request.url);
        const id = searchParams.get('id');

        // Intentamos eliminar el departamento
        const departamentoEliminado = await prisma.departamento.delete({
            where: {
                nombre: String(id)
            }
        });

        return NextResponse.json({ message: "Departamento removido" });
    } catch (e) {

        
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({
                error: 'Error en el cliente',
            }, { status: 400 }); // Respuesta 400: error del cliente            
            /*
            if (e.code === 'P2003') {

            }
            */
        }

        // Manejo de errores genéricos
        return NextResponse.json({
            error: 'Ocurrió un error inesperado al procesar la solicitud.',
        }, { status: 500 }); // Respuesta 500: error del servidor
    }    
}

