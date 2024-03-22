import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Gbutton from '../components/Gbutton';


export default function SignIn() {

  const [formdata,setFormdata]=useState({});
  const { loading,error } = useSelector((state)=>state.user)
  const navigate=useNavigate();
  const dispatch=useDispatch();

  console.log(loading);
  const handleChange=(e)=>{
    setFormdata({...formdata,[e.target.id]:e.target.value})
  }
  console.log(formdata)  

  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      dispatch(signInStart())
     
      const res=await fetch("http://localhost:3000/api/auth/signin",{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(formdata)
    })
    const data=await res.json();
    console.log(data);
    if(data.success === false){
      dispatch(signInFailure(data))
      return;
    }
    console.log(loading)
    dispatch(signInSuccess(data))
    navigate("/")
  }
  catch(error){
    dispatch(signInFailure(error))
  }
    } 
    
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>SignIn</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input onChange={handleChange} type='text' placeholder='email' id='email'className='bg-slate-100 p-3 rounded-lg'/> 
      <input onChange={handleChange} type='text' placeholder='password' id='password'className='bg-slate-100 p-3 rounded-lg'/>
      <button disabled={loading} className='bg-slate-700 p-3 text-white rounded-lg hover:opacity-95 uppercase disabled:opacity-80'>{loading?'loading ..':'SIGN IN'}</button> 
      <Gbutton/>
      <div className='flex gap-3'>
        <p>Dont Have an Account?</p>
        <Link to='/sign-up'>
            <span className='text-blue-700'>SIGN UP</span>
        </Link>
        
      </div>
    </form>
    <p className='text-red-700'>{error ? error.message || "somthing went wrong":" "}</p>
    </div>
    
  )
}
