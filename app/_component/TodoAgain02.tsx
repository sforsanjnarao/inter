"use client"

import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'


type todoTypes={
    id:string,
    task:string,
    done:boolean
}[]
const TodoAgain02 = () => {
    const [input, setInput]=useState('')
    const [todos, setTodos]=useState<todoTypes>([])
    function handleInput(){
        setTodos((prev)=>[...prev,{id:uuid(),task:input, done:false }])
        setInput('')
    }

    function handleToggle(id:string){
        const allTodo=todos.map((todo)=>{
            if(todo.id==id){
                 todo.done=!todo.done  
                 console.log(todo) 
                 return todo
            }else{
                return todo
            }
        })
        
        setTodos(allTodo)
        
    }
  return (
    <div>
        {
            todos.map((todo)=>(
                <div key={todo.id}>
                    <p>{todo.task}</p>
                    <button onClick={()=>handleToggle(todo.id)}>{todo.done?"pending":"compeleted"}</button>
                </div>
            ))
        }
        <input type="text" placeholder='enter the task' value={input} onChange={(e)=>setInput(e.target.value)}/>
        <button onClick={handleInput}>enter task</button>
    </div>
  )
}

export default TodoAgain02