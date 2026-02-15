'use client'
import React, { useState } from 'react'
import { v4 as uuid } from 'uuid'


type todosType={
    id:string,
    task:string,
    done:boolean
}[]
const TodoAgain05 = () => {
    const [input ,setInput]=useState('')
    const [editInput  ,setEditInput]=useState('')
    const [todos, setTodos]=useState<todosType>([])
    const [isEditing, setIsEditing]=useState<boolean>(false)
    const [editTodoId , setTodoId] = useState('')

    function handleAddTodo(){
        setTodos((prev)=>[...prev,{id:uuid(), task:input, done:false}])
        setInput('')
    }
    function handleToggle(id:string){
        const allTodos=todos.map((todo)=>{
            if(todo.id==id){
                todo={...todo,done:!todo.done}
            }
            console.log('toggle',todo)
                return todo
        })
        setTodos(allTodos)
    }
    function handleStartEdit(id:string){
        if(isEditing == false){ 
            setIsEditing(!isEditing)
            setTodoId(id)
            return ;
        }
        const todosCopy = [...todos]
        todosCopy.map((todo)=>{
            if(todo.id==id){
                console.log("yes bhai id same hai wow")
                todo.task = editInput
                 console.log("krdia sir edit , paise do ab")
            }
        })
        setTodos(todosCopy)
        setEditInput('')
        setIsEditing(!isEditing)
    }

  return (
    <div>
        <input type="text" placeholder='enter task' value={input} onChange={(e)=>setInput(e.target.value)}/>
        <button onClick={handleAddTodo}>add Task</button>
        {
            todos.map((todo , i )=>(
                <div key={i}>
                    <p>{todo.task}</p>
                    <button className={"mr-2"} onClick={()=>handleToggle(todo.id)}>{todo.done?'done ':'undone '}</button> 
                    {/* {(isEditing && editTodoId == todo.id)  ?  <input type="text" placeholder='enter task' value={editInput} onChange={(e)=>setEditInput(e.target.value)}/> : <></>} */}
                    {(isEditing && editTodoId == todo.id) ?  
                    <div>
                        <input type="text" placeholder='enter task' value={editInput} onChange={(e)=>setEditInput(e.target.value)}/> 
                        <button onClick={()=>handleStartEdit(todo.id)}>done</button> 
                        </div>:  <button onClick={()=>handleStartEdit(todo.id)}>edit</button> } 
                </div>
            ))
        } 

    </div>
  )
}

export default TodoAgain05