//? permite que el manejo de cache sea dinamico 
//? para que en caso de que cambie algo en DB 
//? la pagina se recargue sola

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getUserServerSession } from "@/app/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NewTodoServer, TodosGridServer } from "@/todos";
import { redirect } from "next/navigation";


export const metadata = {
  title: 'Server Todos',
  description: 'Server Todos',
};

export default async function ServerTodosPage() {
  
  const user = await getUserServerSession();
  if (!user) redirect('/api/auth/signin')

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { description: 'desc' },
  })
  return (
    <div>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodoServer />
      </div>
      <TodosGridServer todos={todos} />
    </div>
  );
}