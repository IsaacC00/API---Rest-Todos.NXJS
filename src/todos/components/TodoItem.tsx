import React from 'react'
import { Todo } from '@/generated/prisma'
import styles from './TodoItem.module.css'
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5'

interface Props {
    todo: Todo
    // TODO: ACCIONES REST
    toggleTodo: (id:string, complete:boolean)=>Promise<Todo|void>
}

export const TodoItem = ({ todo, toggleTodo }: Props) => {

    return (
        <div className={todo.complete ? styles.todoDone : styles.todoPending}>
            <div className='flex flex-col sm:flex-row justify-start items-center gap-4'>

                <div 
                onClick={() => toggleTodo(todo.id, !todo.complete)}
                className={`${todo.complete ? 'bg-blue-200' : 'bg-red-200'} 
                flex p-2 rounded-md hover:bg-opacity-60 `}>
                    {
                        todo.complete ?
                            <IoCheckboxOutline size={30} /> :
                            <IoSquareOutline size={30} />
                    }

                </div>
                <div className='text-center sm:text-left'>
                    {todo.description}
                </div>
            </div>
        </div>
    )
}
