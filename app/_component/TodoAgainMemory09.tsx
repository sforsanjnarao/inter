'use client'
import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'

type todoType={
    id:string,
    task:string,
    completed:boolean
}
const TodoAgainMemory09 = () => {
    const [input, setInput]=useState('')
    const [todos, setTodos]=useState<Map<string,todoType>>(new Map())
    const [isEditing, setIsEditing]=useState(false)
    const [editInput, setEditInput]=useState('')
    const [editingId, setEditingId]=useState('')
    function handleAddTask(){
        setTodos(prev=>{
            const id=uuid()
            const newMap=new Map(prev)
            newMap.set(id,{id:uuid(), task:input, completed:false})
            return newMap
        })
        setInput('')
    }
    function handleToggle(id:string){
        setTodos(prev=>{
            const newMap=new Map(prev)
            const todo=newMap.get(id)
            if(todo){
                newMap.set(id,{...todo,completed:!todo.completed})
            }
            return newMap
        })
    }
    function handleDelete(id:string){
        setTodos(prev=>{
            const newMap=new Map(prev)
            const todo=newMap.get(id)
            if(todo){
                newMap.delete(id)
            }
            return newMap
        })
    }
    function handleEdit(id:string){
        if(!isEditing){
            setIsEditing(!isEditing)
            setEditingId(id)
            return
        }
        setTodos(prev=>{
            const newMap=new Map(prev)
            const todo=newMap.get(editingId)
            if(todo){
                newMap.set(editingId,{...todo,task:editInput})
            }
            return newMap
        })
        setIsEditing(!isEditing)
        setEditInput('')
    }
  return (
    <div>
        {[...todos.entries()].map(([key, value])=>(
            <div key={value.id}>
                <p>{value.task}</p>
                <button onClick={()=>handleToggle(key)}>{value.completed?'Done':"unDone"}</button>
                <button onClick={()=>handleDelete(key)}>X</button>
                {isEditing && key==editingId?(
                    <div>
                        <input type="text" value={editInput} onChange={(e)=>setEditInput(e.target.value)}/>
                        <button onClick={()=>handleEdit(key)}>editing</button>
                    </div>
                ):(
                    <div>
                        <button onClick={()=>handleEdit(key)}>edited</button>
                    </div>
                )}
            </div>
        ))}
        <input type="text" value={input} onChange={(e)=>setInput(e.target.value)}/>
        {
            isEditing?<></>:<button onClick={()=>handleAddTask()}>add Task</button>
        }
    </div>
  )
}

export default TodoAgainMemory09