//? permite que el manejo de cache sea dinamico 
//? para que en caso de que cambie algo en DB 
//? la pagina se recargue sola
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NewTodo, TodosGrid } from "@/todos";
import prisma from "@/lib/prisma";
import { getUserServerSession } from "@/app/auth/actions/auth-actions";
import { redirect } from "next/navigation";


export const metadata = {
  title: 'Listado de ToDos',
  description: 'Listado de ToDos',
};

export default async function RestTodosPage() {
    
    const user = await getUserServerSession();
    if (!user) redirect('/api/auth/signin')
    
    const todos = await prisma.todo.findMany({

    where:{ userId: user.id },
    orderBy: { description: "asc" } 
  })

  return (
    <>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
}