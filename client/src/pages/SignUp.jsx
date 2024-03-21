import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
export default function SignUp() {

  const [formdata,setFormdata]=useState({});
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(false);
  const navigate=useNavigate();


  const handleChange=(e)=>{
    setFormdata({...formdata,[e.target.id]:e.target.value})
  }
  console.log(formdata)  

  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      setLoading(true)
      setError(false)
      const res=await fetch("http://localhost:3000/api/auth/signup",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formdata)
    })
    setLoading(false)
    const data=await res.json();
    console.log(data)
    if(data.success === false){
      setError(true)
      return
    }
    navigate('/sign-in')
  }
  catch(error){
    console.log(error)
    setError(true)
  }
    } 
    
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>SignUp</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input onChange={handleChange} type='text' placeholder='username' id='username'className='bg-slate-100 p-3 rounded-lg'/> 
      <input onChange={handleChange} type='text' placeholder='email' id='email'className='bg-slate-100 p-3 rounded-lg'/> 
      <input onChange={handleChange} type='text' placeholder='password' id='password'className='bg-slate-100 p-3 rounded-lg'/>
      <button disabled={loading} className='bg-slate-700 p-3 text-white rounded-lg hover:opacity-95 uppercase disabled:opacity-80'>{loading?'loading ..':'SIGNUP'}</button> 
      <div className='flex gap-3'>
        <p>Have an Account?</p>
        <Link to='/sign-in'>
            <span className='text-blue-700'>Sign in</span>
        </Link>
        
      </div>
    </form>
    <p className='text-red-700'>{error && 'something went wrong!'}</p>
    </div>
    
  )
}
