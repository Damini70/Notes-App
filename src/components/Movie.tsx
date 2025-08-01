import React, { useState } from 'react';
import movie from '../lib/movieData'
import { useToast } from './ui/CustomToast/ToastContext';

export default function Movie() {
    const [data,setData]=useState(movie);
    const [search,setSearch]=useState("");
    const {showToast}=useToast()

    const handleSearch=(e:any)=>{
      setSearch(e.target.value)
      const update=data.filter((item)=>item.title.toLowerCase().includes(search.toLowerCase()))
      console.log(update)
    }
    
  return (
    <div>
      <input type="search" onChange={handleSearch} value={search}/>
      <div>{data.map((item)=>{
        return <div className='my-6'><h1>{item.title}</h1><p>{item.description}</p></div>
      })}</div>
      <button onClick={()=>showToast("Hey",3000)} className='bg-amber-950'>Click</button>
    </div>
  )
}
