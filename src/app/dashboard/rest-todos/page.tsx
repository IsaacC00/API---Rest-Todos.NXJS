//? permite que el manejo de cache sea dinamico 
//? para que en caso de que cambie algo en DB 
//? la pagina se recargue sola
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { NewTodo, TodosGrid } from "@/todos";
import prisma from "@/lib/prisma";


export const metadata = {
  title: 'Listado de ToDos',
  description: 'Listado de ToDos',
};

export default async function RestTodosPage() {

  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } })

  return (
    <>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
}