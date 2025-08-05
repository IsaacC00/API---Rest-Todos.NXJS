import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {

    //? queries
    //? comando que sirve apra borarr todo de la base de datos 
   await prisma.todo.deleteMany();

   //? comando para crear alguns registros
   await prisma.todo.createMany({
    data:[
        {description:'TAREA #1',complete:true},
        {description:'TAREA #2'},
        {description:'TAREA #3'},
        {description:'TAREA #4'},
        {description:'TAREA #5'},
    ]
   });

    return NextResponse.json({
        message: 'Seed Executed'
    });
}