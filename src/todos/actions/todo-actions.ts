'use server';
import { Todo } from "@/generated/prisma";
//? use server ayuda a llamar directamente la funcion del el componente deseado
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache";

export const sleep = async (second: number = 0) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
            }, second * 1000);
    })
}

export const toggleTodo = async (id: string, complete: boolean) => {

    await sleep(3)

    const todo = await prisma.todo.findFirst({ where: { id } })

    if (!todo) {
        throw `Todo con id ${id} no encontrado`;
    }

    const updatedTodo = await prisma.todo.update({
        where: { id },
        data: { complete }
    });

    //? actualizamos la ruta 
    revalidatePath('/dashboard/server-todos');

    return updatedTodo;
}

export const newTodo = async (description: string): Promise<Todo | { message: string }> => {
    try {
        const newTodo = await prisma.todo.create({ data: { description } })
        revalidatePath('/dashboard/server-todos');
        return newTodo;
    } catch (error) {
        return {
            message: 'Error al crear nuevot Todo'
        }
    }
}

export const deleteTodo = async (): Promise<void | { message: string }> => {
    try {
        await prisma.todo.deleteMany({ where: { complete: true } })
        revalidatePath('/dashboard/server-todos');

    } catch (error) {
        return {
            message: 'Error al crear nuevot Todo'
        }
    }
}