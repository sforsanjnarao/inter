'use client'
import { useEffect, useState } from 'react'
import { v4 as uuid } from 'uuid'

type todoTypes={
    id:string,
    task:string,
    done:boolean
}[]
const TodoAgain = () => {
    const [input, setInput]=useState('')
    const [todos, setTodos]=useState<todoTypes>([])
    const handleAddTodo=()=>{
        //now need to add to the todos
        const addTodo={id:uuid(),task:input,done:false}
        setTodos((t)=>[...t,addTodo])
        setInput('')
    }
      useEffect(()=>{
            console.log(todos)
        },[todos])

    const handleToggle=(id:string)=>{
        const createTodo=todos.map((user)=>{
            if(user.id==id){
              user.done=!user.done
            }
            return user
        })
        setTodos(createTodo)
    }
  return (
    <div>
        {todos.map((todo)=>(
            //now i need to do conditional rendering if 
            <div key={todo.id}>
                    <div>
                        <p>{todo.task}</p>
                        {/* <button onClick={()=>handleToggle(todo.id)}>done</button> */}
                        <button onClick={()=>handleToggle(todo.id)}>{todo.done?"completed":"pendings"}</button>
                    </div>
            </div>
            
        ))}
        <input 
            type="text" 
            placeholder='enter your code'
            value={input}
            onChange={(e)=>setInput(e.target.value)}
        />
        <button onClick={handleAddTodo}>add todo</button>
    </div>
  )
}

export default TodoAgain