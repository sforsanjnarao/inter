"use client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import z from 'zod'

// interface SignupAuth{
//     name:string,
//     email:string,
//     password:string
// }
const userSchema=z.object({
    name:z.string().min(4),
    email:z.string().email(),
    password: z.string().min(8).max(15)
})
type SignupAuth=z.infer<typeof userSchema>
// interface SignupValidation{
//     name?:string[]
//     email?:string[]
//     password?:string[]
// }
type SignupValidation=Partial<Record<keyof SignupAuth,string[]>>
const Auth = () => {
  const [formData, setFormData] = useState<SignupAuth>({name:"", email:"", password:""});
  const [error, setError]=useState<SignupValidation>({})
  const [res, setRes]=useState<string>('')
  const [loading, setLoading]=useState<boolean>(false)
  const navigation=useRouter()

  const handleSubmit=async (e:React.FormEvent)=>{
    e.preventDefault()
    setError({})
    setLoading(true)
    const result=userSchema.safeParse(formData)
    if(!result.success){
        const message=result.error.flatten().fieldErrors
         setError(message) 
         
         setLoading(false)
        return  
        // if(result.error instanceof z.ZodError){
        //     result.error
        // }
       
    }
    try{
        const response=await axios.post('https://localhost:3000/api/signup',formData)
        console.log('lalla',response.data)
        
        setRes(response.data)
        
        setFormData({name:"", email:"", password:""})
        navigation.push('/dashboard')
    }catch(err:any){
        console.log('the error:',err)
        const serverMessage=err.response?.data?.message
        //this thing is comeing from our backend
        setRes(serverMessage ||"An unexpected error occurred")
    }finally{
        setLoading(false)
    }
  }
  const handelChange=(e:ChangeEvent<HTMLInputElement>)=>{
    const {name, value}=e.target
    setError((prev)=>({...prev,[name]:undefined}))
    setFormData(prev=>({...prev,[name]:value}))
  }
  return (
    <div>
      <form action="" onSubmit={(e)=>handleSubmit(e)}>

        <p>Name:</p>
      <input type="text" name="name" value={formData.name} onChange={handelChange} />
      {error.name?(
        <div>
            {error.name[0]}
        </div>
      ) :<></>}

      <p>Email:</p>
      <input type="text" name="email" value={formData.email} onChange={handelChange} />
      {error.email?(
        <div>
            {error.email[0]}
        </div>
      ) :<></>}

      <p>Password:</p>
      <input type="password" name="password" value={formData.password} onChange={handelChange} />
      {error.password?(
        <div>
            {error.password[0]}
        </div>
      ) :<></>}
        {loading?(
           <>
            <button>loading...</button>
           </>
        ):(
             <div>
                <button type="submit">signup</button>
            </div>
        )}
      
      <>{res}</>
      </form>
       
    </div>
  );
};

export default Auth;
