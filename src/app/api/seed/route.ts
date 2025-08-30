import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) {

    //? queries, seed que se ejecutan al momento de hacer una en la base de datos
    //? comando que sirve apra borarr todo de la base de datos 
    await prisma.todo.deleteMany();
    await prisma.user.deleteMany();

    //? creamos un usuario ficticio
    const user = await prisma.user.create({
        data: {
            email: 'isaac@google.com',
            password: bcrypt.hashSync('123456'),
            roles: ['admin', 'super-user'],
            todos: {
                create: [
                    { description: 'TAREA #1', complete: true },
                    { description: 'TAREA #2' },
                    { description: 'TAREA #3' },
                    { description: 'TAREA #4' },
                    { description: 'TAREA #5' },
                ]
            }
        }
    });

    //? comando para crear alguns registros
    //    await prisma.todo.createMany({
    //     data:[
    //         {description:'TAREA #1',complete:true},
    //         {description:'TAREA #2'},
    //         {description:'TAREA #3'},
    //         {description:'TAREA #4'},
    //         {description:'TAREA #5'},
    //     ]
    //    });

    return NextResponse.json({
        message: 'Seed Executed'
    });
}