import { NextResponse } from "next/server"
import {prisma} from '@/libs/prisma'


export async function GET(){
    const dptmts = await prisma.departamento.findMany()
    console.log(dptmts)
    return NextResponse.json(dptmts)
}