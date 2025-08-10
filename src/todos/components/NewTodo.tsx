'use client';

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { IoTrashOutline } from "react-icons/io5";
import * as api from '../helpers/todos'

export const NewTodo = () => {

  const router = useRouter();
  const [description, setDescription] = useState('');

  const onSubmit = async (e: FormEvent) => {

    e.preventDefault();
    if (description.trim().length === 0) return;
    const newTodo = await api.createTodo(description);
    //? una ventaja de refresh es que recarga solo el componente que queremos mas no
    //? toda la pagina lo cual es algo bueno por que no consume tanta memoria
    router.refresh();
    console.log('submitted', newTodo);
    setDescription('')
  }

  const deleteCompleted = async () => {
    const resp = await api.deleteTodo();
    router.refresh();
    console.log({resp});
    
  }

  return (
    <form onSubmit={onSubmit} className='flex w-full'>
      <input type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?" />

      <button type='submit' className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all">
        Crear
      </button>

      <span className='flex flex-1'></span>

      <button
        onClick={ () => deleteCompleted() }
        type='button' className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all">
        <IoTrashOutline />
        <span>
          Borrar
        </span>
      </button>


    </form>
  )
}