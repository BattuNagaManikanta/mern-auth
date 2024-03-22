import React from 'react'
import { Link } from 'react-router-dom'
import {  useSelector } from 'react-redux'

export default function Header() {
  const {currentUser}=useSelector((state)=>state.user)
  // console.log(currentUser.profilePicture);
  return (
    <div className='bg-slate-100'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
            <div className='font-bold'>Auth App</div>
            </Link>
            <ul className='flex gap-4'>
                <Link to='/'>
                <li>Home</li>
                </Link>
                <Link to='/about'>
                <li>About</li>
                </Link>
                <Link to='/profile'>
                  {currentUser ? (<img src={currentUser.profilePicture} alt="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbdaTHqZmtLjjVA2ccckCvN-1nomTyUdP5ew&s" className='h-7 w-7 rounded-full object-cover'></img>):(<li>Sign In</li>)}
                </Link>


            </ul>
        </div>
        
    </div>
    
  )
}
