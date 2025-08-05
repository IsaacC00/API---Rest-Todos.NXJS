import React from 'react'
import { Todo } from '@/generated/prisma'
import styles from './TodoItem.module.css'
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5'

interface Props {
    todo: Todo
    // TODO: ACCIONES REST
}

export const TodoItem = ({ todo }: Props) => {

    return (
        <div className={todo.complete ? styles.todoDone : styles.todoPending}>
            <div className='flex flex-col sm:flex-row justify-start items-center gap-4'>

                <div className={`${todo.complete ? 'bg-blue-100':'bg-red-100'}flex p-2 rounded-md hover:bg-blue-100/50 `}>
                    {
                        todo.complete ? 
                        <IoCheckboxOutline size={30} /> :
                        <IoSquareOutline size={30} /> 

                    }

                    <div className='text-center sm:text-left'>
                        {todo.description}
                    </div>
                </div>
            </div>
        </div>
    )
}
