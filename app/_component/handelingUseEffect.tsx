// 'use client'
// import axios from 'axios'
// import React, { useEffect, useState } from 'react'

// const handelingUseEffect = () => {

//     const [data, setData]=useState([])

//     useEffect(()=>{
//         async function featchData(){
//             const res=await axios.get('')
//             const data =res.data
//             setData(data)
//             return data
//         }

//         featchData()
//     },[])

//   return (
//     <div>
//         {
//             data.map((i, index)=>{
//                 <div key={index}>
//                     <p></p>
//                 </div>
//             })
//         }   
//     </div>
//   )
// }

// export default handelingUseEffect