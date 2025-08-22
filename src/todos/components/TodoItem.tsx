'use client';
import React, { startTransition, useOptimistic } from 'react'
import { Todo } from '@/generated/prisma'
import styles from './TodoItem.module.css'
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5'
import { boolean } from 'yup';

interface Props {
    todo: Todo
    // TODO: ACCIONES REST
    toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {

    //? utilizacion del hook de react 19 para dar ala impresion
    //? al usuario que el state cambia apesar de que la respuesta
    //? del servidor es lenta

    const [todoOptimistic, todoToogleOptimistic] = useOptimistic(todo,
        (state, newCompleteValue: boolean) => ({ ...state, complete: newCompleteValue })
    );

    const onToggleTodo = async () => {
        try {
            startTransition(() =>  todoToogleOptimistic(!todoOptimistic.complete))
            await toggleTodo(todoOptimistic.id, !todoOptimistic.complete)
        } catch (error) {
            return {
                message: error
            }
        }
    }

    return (
        <div className={todoOptimistic.complete ? styles.todoDone : styles.todoPending}>
            <div className='flex flex-col sm:flex-row justify-start items-center gap-4'>

                <div
                    onClick={onToggleTodo}
                    // onClick={() => toggleTodo(todoOptimistic.id, !todoOptimistic.complete)}
                    className={`${todoOptimistic.complete ? 'bg-blue-200' : 'bg-red-200'} 
                flex p-2 rounded-md hover:bg-opacity-60 `}>
                    {
                        todoOptimistic.complete ?
                            <IoCheckboxOutline size={30} /> :
                            <IoSquareOutline size={30} />
                    }

                </div>
                <div className='text-center sm:text-left'>
                    {todoOptimistic.description}
                </div>
            </div>
        </div>
    )
}
