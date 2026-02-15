'use client'
import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

type todoType={
    id:string
    task:string
    completed:boolean
}[]
function TodoAgain06() {
    const [input, setInput]=useState('')
    const [todos, setTodos]=useState<todoType>([])
    const [isEditing, setIsEditing]=useState(false)
    const [editingId, setEditingId]=useState<string>('')
    const [editInput, setEditInput]=useState('')

    function handleAddTask(){
        setTodos((prev)=>[...prev,{id:uuid(), task:input, completed:false}])
        setInput('')
    }
    // function handleIsComplete(id:string){
    //     const allTodo=[...todos]
    //     allTodo.map((todo)=>{
    //         if(todo.id==id){
    //             todo.completed=!todo.completed
    //         }
    //         return todo
    //     })
    //     setTodos(allTodo)
    // }
    function handleIsComplete(id:string){
        setTodos((prev)=>prev.map((todo)=>
            todo.id==id ? {...todo,completed:!todo.completed}: todo 
        ))
    }

    // function handleEdit(id:string){
    //     if(!isEditing){
    //         setIsEditing(!isEditing)
    //         setEditingId(id)
    //         return
    //     }
    //     const allTodo=[...todos]
    //     allTodo.map((todo)=>{
    //         if(todo.id==editingId){
    //             todo.task=editInput
    //         }
    //         return todo
    //     })
    //     setTodos(allTodo)
    //     setIsEditing(!isEditing)
    //     setEditInput('')
    // }

    function handleEdit(id:string){
        if(!isEditing){
            setIsEditing(!isEditing)
            setEditingId(id)
            return
        }
       setTodos(prev=>prev.map(todo=>
        todo.id==editingId?{...todo, task:editInput}: todo
       ))
        setIsEditing(!isEditing)
        setEditInput('')
    }
    function handleDelete(id:string){
        setTodos((prev)=>prev.filter((todo)=>todo.id!=id))
    }
  return (
    <div>
         {todos.map((todo)=>(
        <div key={todo.id}>
            <p>{todo.task}</p>
            <button onClick={()=>handleIsComplete(todo.id)}>{todo.completed?"done":"doing.."}</button>
            <button onClick={()=>handleDelete(todo.id)}>XX</button>
            {isEditing && todo.id==editingId? (
                <div>
                    <input type="text" value={editInput} onChange={(e)=>setEditInput(e.target.value)}/>
                    <button onClick={()=>handleEdit(todo.id)}>done</button>
                </div>
                ):(
                <div>
                    <button onClick={()=>handleEdit(todo.id)}>edit</button>
                </div>
                )}
        </div>
        ))}
        <input type="text"  value={input} onChange={(e)=>setInput(e.target.value)}/>
        {isEditing?<></>:
        <button onClick={()=>handleAddTask()}>add task</button>}
    </div>
  )
}

export default TodoAgain06