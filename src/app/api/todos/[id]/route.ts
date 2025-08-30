import { NextResponse, NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import * as yup from 'yup'
import { Todo } from '@/generated/prisma'
import { getUserServerSession } from '@/app/auth/actions/auth-actions'

interface Segments {
    params: {
        id: string
    }
}


//? simplificamos las funciones para reutilizar codigo
const getTodo = async (id: string): Promise<Todo | null> => {
    
    const user = await getUserServerSession();
    if (!user) {
        return null;
    }

    const todo = await prisma.todo.findFirst({ where: { id } });

    if (todo?.userId !== user.id) {
        return null;
    }

    return todo;
}


export async function GET(request: Request, { params }: Segments) {

    const { id } = params;
    const todo = await getTodo(id);
    //? no podemos retornar un NextResponse por la limitacions de Next.js v13

    if (!todo) {
        return NextResponse.json({ message: `No se encontro el ToDo con id ${id}` }, { status: 400 })
    }

    return NextResponse.json(todo);
}

//? Schema para PUT
const putSchema = yup.object({
    description: yup.string().optional(),
    complete: yup.boolean().optional(),
})

//? Actulizamos un ToDo
export async function PUT(request: Request, { params }: Segments) {

    const { id } = params;

    const todo = await getTodo(id);
    //? no podemos retornar un NextResponse por la limitacions de Next.js v13

    if (!todo) {
        return NextResponse.json({ message: `No se encontro el ToDo con id ${id}` }, { status: 400 })
    }

    try {

        const { complete, description } = await putSchema.validate(await request.json());

        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: { complete, description }
        })

        return NextResponse.json(updatedTodo);

    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }


}

