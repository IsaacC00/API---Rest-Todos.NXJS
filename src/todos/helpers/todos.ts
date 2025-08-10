import { Todo } from "@/generated/prisma"

//? metodo para actualizar ToDo solo apartado de true o false

export const updateTodo = async(id:string,complete:boolean):Promise<Todo> => {
  
    const body = {complete}
    const todo = await fetch(`/api/todos/${id}`,{
        method:'PUT',
        body:JSON.stringify(body),
        headers:{
            'Content-Type':'aplication/json'
        }

    })
    .then(resp => resp.json());
    console.log({todo});
    
    return todo
}

export const createTodo = async(description:string):Promise<Todo> => {
  
    const body = {description}
    const todo = await fetch(`/api/todos/`,{
        method:'POST',
        body:JSON.stringify(body),
        headers:{
            'Content-Type':'aplication/json'
        }

    })
    .then(resp => resp.json());
    console.log({todo});
    
    return todo
}

export const deleteTodo = async():Promise<void> => {
    
    const res = await fetch(`/api/todos/`,{
        method:'DELETE',
        headers:{
            'Content-Type':'aplication/json'
        }

    })
    console.log({res});
    
}

