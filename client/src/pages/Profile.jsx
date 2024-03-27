import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { app } from '../Firebase';
import {getStorage,ref, uploadBytesResumable,getDownloadURL} from 'firebase/storage'
import { updateUserStart, updateUserFailure,updateUserSuccess } from '../redux/user/userSlice';


export default function Profile() {
  const fileRef=useRef(null);
  const dispatch = useDispatch();
  const [image,setImage]=useState(undefined);
  const [imagePercent,setImagePercent]=useState(0)
  const [imageError,setImageError]=useState(false)
  const [formData,setFormData]=useState({});
  const {currentUser,loading,error}=useSelector((state)=>state.user);
  console.log(imagePercent);
  console.log(image);
  console.log(formData)
  console.log(imageError)
  useEffect(()=>{
    if(image){
      handleFileUpload(image)
    }
  },[image])
  const handleFileUpload= async (image)=>{
    const storage=getStorage(app);
    const fileName= new Date().getTime() + image.name;
    const storageRef=ref(storage,fileName);
    const uploadTask=uploadBytesResumable(storageRef,image);
    uploadTask.on(
      'state_changed',
      (snapshot)=>{
        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setImagePercent(Math.round(progress))
      },
      (error)=>{
        console.log(error)
        setImageError(true)

      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        ); 
      })
  }
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try{
      dispatch(updateUserStart())
      console.log(currentUser);
      const res =await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data=await res.json();
      console.log(data);
      if(data.success === false){
        dispatch(updateUserFailure(data))
        return;
      }    
      dispatch(updateUserSuccess(data))
      }
    catch(error){
      dispatch(updateUserFailure(error))      
      console.log(error);
    }
  }
  
  console.log(formData);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input hidden type='file' ref={fileRef} accept="image/*" onChange={(e)=>{ setImage(e.target.files[0])}}/>
        <img className='h-24 w-24 self-center rounded-full object-cover cursor-pointer' src={formData.profilePicture || currentUser.profilePicture} onClick={()=>fileRef.current.click()}></img>
        <p className='text-sm self-center'>
          {imageError ? (
            <span className='text-red-700'>
              Error uploading image (file size must be less than 2 MB)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
          ) : imagePercent === 100 ? (
            <span className='text-green-700'>Image uploaded successfully</span>
          ) : (
            ''
          )}
        </p>
        <input defaultValue={currentUser.username}type="text" id="username" placeholder='Username' className='bg-slate-100 rounded-lg p-3' onChange={handleChange}></input>
        <input defaultValue={currentUser.email} type="text" id="email" placeholder='Email' className='bg-slate-100 rounded-lg p-3' onChange={handleChange}></input>
        <input type="password" id="password" onChange={handleChange} placeholder='Password' className='bg-slate-100 rounded-lg p-3'></input>
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
        
