"use client"
import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'


type todoTypes={
    id:string
    task:string
    done:boolean
}[]
const TodoAgain04 = () => {
    const [input, setInput]=useState('')
    const [todos,setTodos]=useState<todoTypes>([])


    function handleInput(){
        //need to handle input task
        setTodos((prev)=>[...prev,{id:uuid(), task:input, done:false}])
        setInput('')
    }
    function handleToggle(id:string){
        const allTodo=todos.map((todo)=>{
            if(todo.id==id){
                todo.done=!todo.done
            }
            return todo
        })
        setTodos(allTodo)
    }


  return (
    <div>
        {
            todos.map((todo)=>(
                <div key={todo.id}>
                    <p>{todo.task}</p>
                    <button onClick={()=>handleToggle(todo.id)}>{todo.done?'done':"not Done"}</button>
                </div>
            ))
        }
        <input type="text"
        placeholder='enter your task'
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        />
        <button onClick={handleInput}>add task</button>
    </div>
  )
}

export default TodoAgain04