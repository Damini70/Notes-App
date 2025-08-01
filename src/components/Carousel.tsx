import React, { useEffect, useState } from 'react'
import movie from '../lib/movieData'


export default function Carousel() {
    const [data,setData]=useState(movie);
    const [showid,setShowId]=useState(1);

    useEffect(()=>{
        let timer;
        timer=setTimeout(()=>{
            setShowId(prev=>{
                if(prev<data.length)return prev+1;
                return 1;
            });
            
        },1000);
        return ()=>clearInterval(timer)

    },[showid])

    


  return (
   <>
    <div>
      {data.map((item)=>{
        return <div key={item.id}>{showid===item.id&&<div>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
        </div>}</div>
      })}
    </div></>
  )
}
