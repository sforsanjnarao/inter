'use client'
import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'


type todoTypes={
    id:string,
    task:string,
    completed:boolean
}[]
const TodoAgain07 = () => {
    const [input, setInput]=useState<string>("")
    const [todos, setTodos]=useState<todoTypes>([])
    const [isEditing,setIsEditing]=useState(false)
    const [editInput, setEditInput]=useState('')
    const [editingId, setEditingId]=useState('')
    

    function handleAddTask(){
        setTodos(prev=>[...prev,{id:uuid(), task:input, completed:false}])
        setInput('')
    }

    function handleCompleteTask(id:string){
        setTodos(prev=>
            prev.map(
                todo => todo.id==id ? 
                {...todo,completed:!todo.completed} : todo
            ))
    }
    function handleDelete(id:string){
        setTodos(prev=>prev.filter((todo)=>todo.id!==id))
    }

    function handleEdit(id:string){
        if(!isEditing){
            setIsEditing(!isEditing)
            setEditingId(id)
            return
        }
        setTodos(prev=>prev.map(todo=>todo.id==editingId?{...todo,task:editInput}:todo))
        setEditInput('')
        setIsEditing(!isEditing) 
    }
    

  return (
    <div>
        {todos.map(todo=>(
            <div key={todo.id}>
                <p>{todo.task}</p>
                <button onClick={()=>handleCompleteTask(todo.id)}>{todo.completed?'done':"undone"}</button>
                <button onClick={()=>handleDelete(todo.id)}>X</button>
                {
                    isEditing && todo.id==editingId? (
                        <div>
                            <input type="text" value={editInput} onChange={(e)=>setEditInput(e.target.value)}/>
                            <button onClick={()=>handleEdit(todo.id)}>done</button>
                        </div>
                    ):(
                        <div>
                            <button onClick={()=>handleEdit(todo.id)}>edit</button>
                        </div>
                    )
                }
            </div>
        ))} 
        <input type="text" value={input} onChange={(e)=>setInput(e.target.value)}/>
        {isEditing?<></>:<button onClick={()=>handleAddTask()}>add task</button>}
    </div>
  )
}

export default TodoAgain07