import { NextResponse } from "next/server"
import {prisma} from '@/libs/prisma'
import { Prisma } from '@prisma/client'

import { validateAllRegisters } from "@/utils/apiUtils";

const notChoosableInCreate = ['id']

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
        await prisma.municipio.update({
          where: { id: id }, // Identifica el registro
          data, // Datos para actualizar
        });
  
        // Devolver la respuesta
        return NextResponse.json(
          {message: 'Municipio actualizado'},
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
          {message: 'Error actualizando el municipio'},
          {status: 500}
        );
      }
  } 

export async function POST (request){
    
    try{
        const {data} = await request.json();

        const { allParameters, missingParameters } = await validateAllRegisters(
            'Municipio',
            data,
            notChoosableInCreate
        )

        if (!allParameters){
            return NextResponse.json(
                { message: `Faltran atributos: ${missingParameters}` },
                { status: 400},
            );
        }

        await prisma.municipio.create({
            data: data
        })

        return NextResponse.json({ message: "Municipio Creado"});
    } catch (e){
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({
                error: 'Datos inválidos',
            }, { status: 400 }); // Respuesta 400: error del cliente            
            /*
            if (e.code === 'P2003') {}
            */
        } else {
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

        // Intentamos eliminar el municipio
        await prisma.municipio.delete({
            where: {
                id: Number(id)
            }
        });

        return NextResponse.json({ message: "Municipio removido" });
    } catch (e) {

        
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({
                error: 'Hay otras referencias que dependen del municipio',
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