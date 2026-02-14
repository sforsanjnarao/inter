"use client"
import React, { useState } from 'react'

type AllTodos = {
  id:number
  data:string
  done:boolean
}[]

const Home = () => {
  const [input, setInput]= useState('')
  const [todos, setTodos]= useState<AllTodos>([])
  const [toggle, setToggle]=useState<boolean>(false)

  const Todo:AllTodos=[]
  const handelAddTodo=()=>{
    const theTodo={id:Date.now(), data:input , done:false}
    Todo.push(theTodo)
    setTodos(Todo)
    setInput("")
  }
  const handelToggle=(id:number)=>{
    const toggleObj=todos.find((item)=>item.id==id)
    todos.map((id)=>id.done=true)
  }
 

  return (
    <div>
      {
        todos.map((m)=>(
          <div key={m.id}>
            <p>{m.data}</p>
        <button onClick={()=>handelToggle(m.id)}>toggle</button>
          </div>
        ))
      }
      <input type="text"  placeholder='enter todo'
      value={input}
      onChange={(e)=>setInput(e.target.value)}
      />
      
      <button onClick={()=>handelAddTodo}>add todo</button>
    </div>
  )
}

export default Home