'use client'
import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

interface todoTypes{
    id:string,
    task:string,
    done:boolean
}
const TodoAgain03 = () => {
    const [input, setInput]=useState('')
    const [message, setMessage]=useState<todoTypes[]>([])
    function handleAddTask(){
        console.log('lala')
        setMessage((prev)=>[...prev,{id:uuid(), task:input, done:false}])
        setInput("")
    }

   function handleToggle(id:string){
    const allTodo= message.map((todo)=>{
        if(todo.id==id){
            todo.done=!todo.done
            return todo
        }else{
            return todo
        }
    })
    setMessage(allTodo)
   }

    
  return (
    <div>
        {
            message.map((todo)=>(
                <div key={todo.id}>
                    <p>{todo.task}</p>
                    <button onClick={()=>handleToggle(todo.id)}>{todo.done?"completed":"pending"}</button>
                </div>
            ))
        }
        <input type="text" placeholder='enter task' value={input} onChange={(e)=>setInput(e.target.value)}/>
        <button onClick={handleAddTask}>add task</button>
    </div>
  )
}

export default TodoAgain03