import { NextResponse } from "next/server"
import {prisma} from '@/libs/prisma'
import { Prisma } from '@prisma/client'
import JSONBig from 'json-bigint';

export async function GET(request, {params}) {    

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

        const data = await prisma.persona.findMany({
            //where: filters
        });
        
        // Consulta de nombres y tipos de columnas
        const columnasInfo = await prisma.$queryRaw
        `
            SELECT column_name, data_type, character_maximum_length, numeric_precision
            FROM information_schema.columns
            WHERE table_name = 'Persona'
            ORDER BY ordinal_position;
        `
        ;
        
        // Determinar cuáles columnas son modificables
        const columnasModificables = ['telefono','genero','vivienda_id'];
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
                case 'telefono':
                    constraints.min = 3000000000
                    constraints.max = 3999999999
                    break;
            }            
            
            return constraints;

        }
        
        async function defRange(column_name) {
            switch (column_name) {
                case 'genero':
                    return ['femenino', 'masculino', 'otro'];
                case 'vivienda_id':
                    const viviendas = await prisma.vivienda.findMany({
                        select: { id: true },
                    });
                    return viviendas.map(vivienda => vivienda.id);
                default:
                    return null;
            }
        }
    
        const headers = {};
        for (const col of columnasInfo) {
            const constraints = defPossibleValues(col.column_name, columnasInfo);
            const possibleValues = await defRange(col.column_name);
    
            headers[col.column_name] = {
                type: col.data_type,
                modifiable: columnasModificables.includes(col.column_name),
                constraints: constraints,
                possibleValues: possibleValues,
                isPrimaryKey: ids.includes(col.column_name)
            };
        }

        // Cuerpo de la respuesta
        const responseBody = { headers, data, erasable: true };

        // Serializar usando JSONBig
        const serializedBody = JSONBig.stringify(responseBody);

        // Crear la respuesta manualmente con NextResponse
        return new NextResponse(serializedBody, {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });      
     
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
      const updatedPersona = await prisma.persona.update({
        where: { id: id }, // Identifica el registro
        data, // Datos para actualizar
      });

      // Devolver la respuesta
      return NextResponse.json(
        {message: 'Persona actualizada'},
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
        {message: 'Error actualizando la persona'},
        {status: 500}
      );
    }
} 
  
export async function DELETE(request, {params}) {
    
    try {
        const {searchParams} = new URL(request.url);
        const id = searchParams.get('id');

        // Intentamos eliminar la persona
        const personaEliminada = await prisma.persona.delete({
            where: {
                id: Number(id)
            }
        });

        return NextResponse.json({ message: "Vivienda removida" });
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