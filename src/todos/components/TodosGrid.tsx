'use client';
import React from 'react'
import { Todo } from '@/generated/prisma'
import { TodoItem } from './TodoItem';

//? podemos tipar con los modelos queu ofrece prisma 
//? pero DevTalles recomienda crear una propia interface 
//? en caso de que el modelo cambie constantemente 

interface Props {
    todos?: Todo[]
}

export const TodosGrid = ({ todos = [] }: Props) => {
    console.log(todos);

    return (
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
            {
                todos.map(todo => (<TodoItem key={todo.id} todo={todo} />))
            }
        </div>
    )
}
