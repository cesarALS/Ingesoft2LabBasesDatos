import { NextResponse } from "next/server"
import {prisma} from '@/libs/prisma'
import { Prisma } from '@prisma/client'
import JSONBig from 'json-bigint';

export async function GET(request, {params}) {
    try {

        /*const {searchParams} = new URL(request.url);
        const id = searchParams.get('id')
        const nombre_completo = searchParams.get('nombre')
        const telefono = searchParams.get('telefono')
        const fecha_nacimiento = searchParams.get('fechaNacimiento')
        const genero = searchParams.get('genero')
        const vivienda = searchParams.get('vivienda')
        const municipio = searchParams.get('municipio')

        const filters = {};
        if (id) filters.id = id
        if (nombre_completo) filters.nombre = { contains: nombre, mode: 'insensitive' }; // Búsqueda parcial
        if (area) filters.area = {lte : parseFloat(area)}; // Menor o igual al área
        if (poblacion) filters.poblacion = { lte: parseInt(poblacion) }; // Menor o igual a población
        if (alcalde) filters.gobernador = { contains: alcalde, mode: 'insensitive' }; // Búsqueda parcial
        if (departamento) filters.departamento = { contains: departamento, mode: 'insensitive' }; // Búsqueda parcial

        console.log(filters)*/

        const data = await prisma.vivienda.findMany({
            //where: filters
        });

        // Consulta de nombres y tipos de columnas
        const columnasInfo = await prisma.$queryRaw
        `
            SELECT column_name, data_type, character_maximum_length, numeric_precision
            FROM information_schema.columns
            WHERE table_name = 'Vivienda'
            ORDER BY ordinal_position;
        `
        ;
        
        // Determinar cuáles columnas son modificables
        const columnasModificables = ['direccion','pisos'];
        const ids = ['id']

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
                case 'direccion':
                    constraints.maxLength = columnInfo.character_maximum_length;
                    break;
                case 'pisos':
                    constraints.min = 1
                    constraints.max = 10
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
                isPrimaryKey: ids.includes(col.column_name)      
            };
            return acc;
        }, {});

        //console.log(data)
        return NextResponse.json({headers,data,erasable:true})       

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
      const updatedPersona = await prisma.vivienda.update({
        where: { id: id }, // Identifica el registro
        data, // Datos para actualizar
      });

      // Devolver la respuesta
      return NextResponse.json(
        {message: 'Vivienda actualizada'},
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
        {message: 'Error actualizando la vivienda'},
        {status: 500}
      );
    }
} 

export async function DELETE(request, { params }) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        const viviendaEliminada = await prisma.vivienda.delete({
            where: {
                id: Number(id),
            },
        });

        return NextResponse.json({ message: "Vivienda removida" });
    } catch (e) {

        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            // console.log(e)
            return NextResponse.json({
                error: 'La vivienda está siendo referenciada por otra entidad',
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