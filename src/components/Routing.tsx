import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Pagination from './ui/Pagination'
import Movie from './Movie'
import Home from './Home'
import InfiniteScroll from './InfiniteScroll'
import User from "../components/User"

export default function Routing() {
  return (
    <div>
      <Routes>
         <Route path="/" element={<Home/>}/>
        <Route path="/movie" element={<Movie/>}/>
        <Route path="/pagination" element={<Pagination/>}/>
        <Route path="/infinite" element={<InfiniteScroll/>}/>
        <Route path="/users" element={(<User/>)}/>
      </Routes>
    </div>
  )
}
