import { NextResponse } from "next/server"
import {prisma} from '@/libs/prisma'
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

        // Formatear la información de las columnas
        const headers = columnasInfo.reduce((acc, col) => {
            acc[col.column_name] = {
                type: col.data_type,
                modifiable: columnasModificables.includes(col.column_name),
            };
            return acc;
        }, {});

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
  
  
export async function DELETE(request, {params}){
    try{
        const {searchParams} = new URL(request.url);
        const id = searchParams.get('id')
        const vivendaEliminada = await prisma.persona.delete({
            where: {
                id : Number(id)
            }
        })
    return NextResponse.json("Persona removida")
    }catch(error) {
        console.error('Error en el endpoint:', error);
        return NextResponse.json({ error: 'Ocurrió un error al procesar la solicitud' });
    }    
}