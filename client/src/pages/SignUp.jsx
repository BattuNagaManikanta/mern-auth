import React from 'react'
import { Link } from 'react-router-dom'
export default function SignUp() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>
    <form className='flex flex-col gap-4'>
      <input type='text' placeholder='username' id='username'className='bg-slate-100 p-3 rounded-lg'/> 
      <input type='text' placeholder='email' id='username'className='bg-slate-100 p-3 rounded-lg'/> 
      <input type='text' placeholder='password' id='username'className='bg-slate-100 p-3 rounded-lg'/>
      <button className='bg-slate-700 p-3 text-white rounded-lg hover:opacity-95 uppercase disabled:opacity-80'>Sign up</button> 
      <div className='flex gap-3'>
        <p>Have an Account?</p>
        <Link to='/sign-in'>
            <span className='text-blue-700'>Sign in</span>
        </Link>
        
      </div>
    </form>
    </div>
    
  )
}
