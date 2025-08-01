import React, { useState } from 'react';
import { accordionData } from '@/lib/accordianData';

export default function Accordian() {
    const [openDetails,setOpenDetails]=useState<number[]>([]);
    function handleOpen(id:any){
        setOpenDetails((prev)=>{
            if(prev.indexOf(id)==-1){
               return [...prev,id];
            }else{
                return prev.filter((item)=>item!==id)
            }
        })
    }
    console.log(openDetails)
  return (
    <div>
     {accordionData.map((item)=>{
        return <div key={item.id} className='my-5 '><h1 onClick={()=>handleOpen(item.id)}>{item.title}</h1>{openDetails.indexOf(item.id)!==-1&&<div>{item.content}</div>}</div>
     })} 
    </div>
  )
}
