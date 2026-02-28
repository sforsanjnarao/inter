import React, { useState } from 'react'
type dataType={
    name:string,
    email:string
}
const ProfileTab = () => {
    const [data, setData]=useState<dataType>({name:"", email:""})
    function handleSubmit(){
        console.log('lalalal')
    }
    function handleOnchange(e:React.ChangeEvent<HTMLInputElement>){
        e.preventDefault()
        const {name, value}=e.target
        setData(prev=>({...prev,[name]:value}))
    }
  return (
    <div>
        <form action="" onSubmit={()=>( handleSubmit)}>
            <label htmlFor="" >Name:</label>
            <input type="text" name='name' placeholder='Enter your name' value={data.name} onChange={(e)=>handleOnchange(e)}/>
            {}
            <label htmlFor="">Email:</label>
            <input type="text" name="email" placeholder='Enter your email' value={data.email} onChange={(e)=>handleOnchange(e)} />
                <button type='submit'>click</button>
        </form>
    </div>
  )
}

export default ProfileTab