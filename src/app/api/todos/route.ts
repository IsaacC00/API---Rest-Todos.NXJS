import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server';
import * as yup from 'yup';

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url);
    //? de los searchParams tomamos los N ToDos caso contrario tomamos 10
    //? metodo Number para transforma en numero 
    const take = Number(searchParams.get('take')) ?? '10';
    //? de los searchParams saltamos N ToDos caso contrario no saltamos
    const skip = Number(searchParams.get('skip')) ?? '0';

    //? en caso de que no manden un numero 
    if (isNaN(take)) {
        //? status 400 de bad request
        return NextResponse.json({ message: 'Take debe ser numero' }, { status: 400 })
    }
    if (isNaN(skip)) {
        //? status 400 de bad request
        return NextResponse.json({ message: 'Skip debe ser numero' }, { status: 400 })
    }

    //? regresamos todos los todos
    const todos = await prisma.todo.findMany({
        take: take,
        skip: skip
    });
    return NextResponse.json(todos);

}


//? utilizamos una libreria para validar la informacion 
//? que manda el user para crear un todo
const postSchema = yup.object({
    description: yup.string().required(),
    complete: yup.boolean().optional().default(false),
})


export async function POST(request: Request) {

    //? si la creacion falla podemos manejarlo con un trycatch
    try {
        //? obtenemos la informacion para luega insertarla en nuestra base de datos
        //? validamos la data que nos llegue
        //? solo tomamos lo que queremos del request
        //? en este caso complete y description en caso de que se mande algo mas
        //? no lo tomamaos, ademas podemos utilizar yup.shape para moldear nuestro body
        const { complete, description } = await postSchema.validate(await request.json());
        //? creamos el todo
        const todo = await prisma.todo.create({ data: { description, complete } })
        return NextResponse.json(todo)

    } catch (error) {

        //? 400 bad request
        return NextResponse.json(error, { status: 400 });

    }


}

export async function DELETE() {

    //? si la eliminacion falla podemos manejarlo con un trycatch
    const existData = await prisma.todo.count({where:{complete:true}})
    if (existData === 0) {
         return NextResponse.json('NO EXISTEN TODOS PARA ELIMINAR')
    }
    try {
        //? creamos el todo
        await prisma.todo.deleteMany({where:{complete:true}})
        return NextResponse.json('TODOS ELIMINADOS')

    } catch (error) {

        //? 400 bad request
        return NextResponse.json(error, { status: 400 });

    }


}