'use client';
import { useRouter } from 'next/navigation';
import { Todo } from '@/generated/prisma'
import { TodoItem } from './TodoItem';
import { toggleTodo } from '../actions/todo-actions';


//? podemos tipar con los modelos queu ofrece prisma 
//? pero DevTalles recomienda crear una propia interface 
//? en caso de que el modelo cambie constantemente 

interface Props {
    todos?: Todo[]
}

export const TodosGridServer = ({ todos = [] }: Props) => {

    const router = useRouter();
    
    //! ANTES
    // const toggleTodo = async(id: string, complete: boolean) => {
    //     const updatedsTodo = await todosApi.updateTodo(id,complete);
    //     console.log({updatedsTodo});
    //     router.refresh();
    //     return updatedsTodo;
    // }

    //? DESPUES

    return (
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
            {
                todos.map(todo => (<TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />))
            }
        </div>
    )
}
