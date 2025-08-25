import React, { useState } from 'react';
 import {
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'

export default function SearchDropdown() {
    const [selectChange,setSelectChange]=useState("")

    //  const queryClient = useQueryClient();

    async function getCategories(){
       const res=await fetch("https://dummyjson.com/products/categories")
       const data=await res.json();
    //    console.log(data)
    return data
     }
    async function getDetails(){
     if(selectChange){
        const res=await fetch(selectChange);
       const data=await res.json();
       return data;
     }
     }
    
  // Queries
  const { data:categories, isPending, error }= useQuery({ queryKey: ['categories'], queryFn: getCategories })
  const {data:{products}={},isPending:loading,error:err}=useQuery({queryKey:["details",selectChange],queryFn:getDetails,enabled: !!selectChange })
  // console.log(products)
  function handleSelect(e:any){
    setSelectChange(e.target.value)
    // getDetails(e.target.value)
  }
  return (
    <div>
  {isPending?<>loading...</>:  <div>
     <select onChange={handleSelect} value={selectChange}>
        <option value="">Select a category</option>{categories.map((item:any)=>{
          return <option value={item.url} key={item.slug}>{item.name}</option>
       })}
    </select>
    {selectChange&&<div>{loading?<>loading.....</>:<>{products.map((item:any)=>{
      return <h1 key={item.id}>{item.title}</h1>
    })}</>}</div>}
  </div> }
    </div>
  )
}
