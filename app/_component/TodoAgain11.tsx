'use client'
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

type Todo={
    id:string,
    task:string,
    isCompleted:boolean
}[]
 const TodoAgain11=()=>{
 const [input, setInput] = useState('')
 const [allTodos, setAllTodos]=useState<Todo>([])
 const [isEditing, setEditing]=useState<boolean>(false)
 const [editInput, setEditInput]=useState('')
 const [editingId, setEditingId]=useState<string>('')
 
 useEffect(()=>{
    localStorage.setItem('todo',JSON.stringify(allTodos))
 },[allTodos])


 function handleAddInput(){
    setAllTodos([...allTodos,{id:uuid(), task:input, isCompleted:false}])
    setInput('')
 }
 function handleToggle(id:string){
    setAllTodos((prev)=>{
        const todos=prev.map((t)=>{
           return t.id==id?{...t,isCompleted:!t.isCompleted}:t
        })
        return todos
    })
 }

 function handleEdit(id:string){
    if(!isEditing){
        setEditing(!isEditing)
        setEditingId(id)
        return
    }
     //doing true
    setAllTodos(prev=> {
        const editedTodo=prev.map((t)=>{
            return t.id==editingId?{...t,task:editInput}: t
        })
        return editedTodo
    })
    setEditing(!isEditing)
    setEditInput('')
 }
 function handleDelete(id:string){
    setAllTodos((prev)=>{
         return prev.filter((t)=>t.id!==id)
    })
 }
 const doneTask=allTodos.filter((t)=>t.isCompleted==true).length
 const totalTask=allTodos.filter((t)=>t).length
    return (
        <div>
            {allTodos.map((t)=>(
                <div key={t.id}>
                    <p>{t.task}</p>
                    <button onClick={()=>handleToggle(t.id)}>{t.isCompleted?'done':'undone'}</button>
                    <button onClick={()=>handleDelete(t.id)}>delete</button>
                    {isEditing && t.id==editingId?(
                        <div>
                            <input type="text" value={editInput} onChange={(e)=>setEditInput(e.target.value)}/>
                            <button onClick={()=>handleEdit(t.id)}>edited</button>
                        </div>
                    ):(
                        <div>
                            <button onClick={()=>handleEdit(t.id)}>edit</button>
                        </div>
                    )}
                </div>
            ))}

            <div className="flex ">
                <div>
                    {`totalTask: ${totalTask}`}
                    {`completedTask: ${doneTask}/${totalTask}`}
                </div>
                <div>
                    <input type="text" value={input} onChange={(e)=>setInput(e.target.value)}/>
                    <button onClick={()=>handleAddInput()}>{isEditing?'':"add"}</button>
                </div>
            </div>
        </div>
    )
}


export default TodoAgain11