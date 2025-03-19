import { NextResponse } from "next/server"
import { prisma } from '@/libs/prisma'
import { Prisma } from '@prisma/client'

import { validateAllRegisters } from "@/utils/apiUtils";

const notChoosableInCreate = []

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

