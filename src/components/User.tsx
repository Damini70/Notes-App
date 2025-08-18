import React, { useEffect, useState } from 'react'
import  {userData}  from '@/lib/userData'

const User = () => {
  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    async function getData(){
     try {
       const res=await userData();
       if(res){
        setData(res)
       }
     } catch (error) {
      console.log(error)
     }finally{
      setLoading(false)
     }
    }
    getData()

  },[])
  

  return (
    <div className="overflow-x-auto p-4">
  <table className="min-w-full border border-red-300 text-sm">
    <thead className="bg-gray-100">
      <tr>
        <th className="p-3 text-left font-semibold border-b border-gray-300">Name</th>
        <th className="p-3 text-left font-semibold border-b border-gray-300">Email</th>
        <th className="p-3 text-left font-semibold border-b border-gray-300">Gender</th>
        <th className="p-3 text-left font-semibold border-b border-gray-300">Height</th>
      </tr>
    </thead>
    <tbody>
     {loading? <tr>
    {[...Array(4)].map((_, i) => (
      <td key={i} className="p-3 border-b border-gray-200 ">
        <div className="h-full bg-gray-300 rounded w-full animate-pulse"></div>
      </td>
    ))}
  </tr>:<> {data.map((item: any, index: number) => (
        <tr
          key={index}
          className="hover:bg-gray-50 even:bg-gray-50 transition-colors"
        >
          <td className="p-3 border-b border-gray-200">{item.firstName}</td>
          <td className="p-3 border-b border-gray-200">{item.email}</td>
          <td className="p-3 border-b border-gray-200">{item.gender}</td>
          <td className="p-3 border-b border-gray-200">{item.height}</td>
        </tr>
      ))}</>}
    </tbody>
  </table>
</div>

  )
}

export default User
