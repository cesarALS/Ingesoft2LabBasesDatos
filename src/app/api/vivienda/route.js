import { NextResponse } from "next/server"
import {prisma} from '@/libs/prisma'
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
            SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'Vivienda'
            ORDER BY ordinal_position;
        `
        ;
        
        // Determinar cuáles columnas son modificables
        const columnasModificables = ['direccion','pisos'];

        // Formatear la información de las columnas        
        const headers = columnasInfo.reduce((acc, col) => {
            acc[col.column_name] = {
                type: col.data_type,
                modifiable: columnasModificables.includes(col.column_name),
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

export async function DELETE(request, {params}){
    try{
        const {searchParams} = new URL(request.url);
        const id = searchParams.get('id')
        const vivendaEliminada = await prisma.vivienda.delete({
            where: {
                id : Number(id)
            }
        })
    return NextResponse.json("Vivienda removida")
    }catch(error) {
        console.error('Error en el endpoint:', error);
        return NextResponse.json({ error: 'Ocurrió un error al procesar la solicitud' });
    }    
}