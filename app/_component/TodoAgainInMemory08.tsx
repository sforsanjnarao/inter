//in-memory
'use client'
import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'
type todoType={
    id:string,
    task:string,
    completed:boolean
}
const TodoAgainInMemory08 = () => {
    const [input, setInput]=useState('')
    const [todos, setTodos]=useState<Map<string,todoType>>(new Map())
    const [isEditing, setIsEditing]=useState(false)
    const [editingInput, setEditingInput]=useState('')
    const [editingId, setEditingId]=useState('')
    function handleAddTask(){
        const id=uuid()
        setTodos(prev=>{
            const newMap=new Map(prev) //clone
            newMap.set(id,{id:uuid(),task:input,completed:false}) //update
            return newMap //set
        })
        setInput('')
    }
    function handleDeleteTask(id:string){
        setTodos(prev=>{
            const newMap=new Map(prev)
            console.log(newMap.get(id))//the id is of value
            if(newMap.has(id)){
                newMap.delete(id)
            }
            return newMap 
    })
    }

    function handleToggle(id:string){
        setTodos(prev=>{
            const newMap=new Map(prev)
                const mapObject=newMap.get(id)
            if(mapObject){
                newMap?.set(id,{...mapObject,completed:!mapObject.completed})
            }
            return newMap
        })
    }
    function handleEditTask(id:string){
        if(!isEditing){
            setIsEditing(!isEditing)
            setEditingId(id)
            return
        }
        setTodos(prev=>{
            const newMap=new Map(prev)
            const todo=newMap.get(editingId)
            if(todo){
                newMap.set(editingId,{...todo,task:editingInput})
            }
            return newMap
        })
        setIsEditing(!isEditing)
        setEditingInput('')
    }

    //Map object can itrated by for..of
  return (
    <div>
        {
            [...todos.entries()].map(([key,value])=>(
                <div key={value.id}>
                    <p>{value.task}</p>
                    <button onClick={()=>handleDeleteTask(key)} >X</button>
                    <button onClick={()=>handleToggle(key)}>{value.completed? "done": "undone"}</button>
                    {isEditing && key==editingId?(
                        <div>
                            <input value={editingInput} onChange={(e)=>setEditingInput(e.target.value)}/>
                            <button onClick={()=>handleEditTask(key)}>editing</button>
                        </div>
                    ):(
                        <div>
                            <button onClick={()=>handleEditTask(key)}>edit</button>
                        </div>
                    )}
                </div>
            ))
        }
        <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} />
       {isEditing?<></>: <button onClick={()=>handleAddTask()}>add task</button>}
    </div>
  )
}

export default TodoAgainInMemory08