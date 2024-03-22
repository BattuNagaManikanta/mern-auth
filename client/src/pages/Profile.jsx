import React from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
  const {currentUser}=useSelector((state)=>state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img className='h-24 w-24 self-center rounded-full object-cover cursor-pointer' src={currentUser.profilePicture}></img>
        <input defaultValue={currentUser.username}type="text" id="username" placeholder='Username' className='bg-slate-100 rounded-lg p-3'></input>
        <input defaultValue={currentUser.email} type="text" id="email" placeholder='Email' className='bg-slate-100 rounded-lg p-3'></input>
        <input type="password" id="password" placeholder='Password' className='bg-slate-100 rounded-lg p-3'></input>
        <button className='bg-slate-700 p-3 text-white rounded-lg hover:opacity-95 disabled:opacity-85 '>update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-600 cursor-pointer'>
          Delete Account
        </span>
        <span className='text-red-600 cursor-pointer'>
          Signout
        </span>
      </div>
    </div>
    
  )
}
