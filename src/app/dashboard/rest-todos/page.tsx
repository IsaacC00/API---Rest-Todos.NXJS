import { TodosGrid } from "@/todos";
import prisma from "@/lib/prisma";


export const metadata = {
 title: 'Listado de ToDos',
 description: 'Listado de ToDos',
};

export default async function RestTodosPage() {

  const todos = await prisma.todo.findMany({orderBy:{description:"asc"}})

  return (
    <>
      <TodosGrid todos={todos} />
    </>
  );
}