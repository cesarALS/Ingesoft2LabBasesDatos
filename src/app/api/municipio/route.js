import { NextResponse } from "next/server"
import {prisma} from '@/libs/prisma'

export async function GET(request, {params}) {
    try {

        const {searchParams} = new URL(request.url);
        const id = searchParams.get('id')
        const nombre = searchParams.get('nombre')
        const area = searchParams.get('area')
        const poblacion = searchParams.get('poblacion')
        const alcalde = searchParams.get('alcalde')
        const departamento = searchParams.get('departamento')

        const filters = {};
        if (id) filters.id = id
        if (nombre) filters.nombre = { contains: nombre, mode: 'insensitive' }; // Búsqueda parcial
        if (area) filters.area = {lte : parseFloat(area)}; // Menor o igual al área
        if (poblacion) filters.poblacion = { lte: parseInt(poblacion) }; // Menor o igual a población
        if (alcalde) filters.gobernador = { contains: alcalde, mode: 'insensitive' }; // Búsqueda parcial
        if (departamento) filters.departamento = { contains: departamento, mode: 'insensitive' }; // Búsqueda parcial

        console.log(filters)

        const data = await prisma.municipio.findMany({
            where: filters
        });

        // Consulta de nombres y tipos de columnas
        const columnasInfo = await prisma.$queryRaw
        `
            SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = 'Municipio'
            ORDER BY ordinal_position;
        `
        ;
        
        // Determinar cuáles columnas son modificables
        const columnasModificables = ['Población','alcalde'];

        // Formatear la información de las columnas
        const headers = columnasInfo.map((col) => ({
            name: col.column_name,
            type: col.data_type,
            modifiable: columnasModificables.includes(col.column_name),        
        }));       

        headers.push({
            erasable: false
        });

        //console.log(data)
        return NextResponse.json({headers,data})       

    } catch (error) {
    console.error('Error en el endpoint:', error);
    res.status(500).json({ error: 'Ocurrió un error al procesar la solicitud' });
    }    
  }