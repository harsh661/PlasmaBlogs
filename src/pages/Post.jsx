import React, { useState, useContext } from 'react'
import { v4 as uuid } from 'uuid';
import {MdAddAPhoto, MdRemoveCircle} from 'react-icons/md'
import {IoMdReverseCamera} from 'react-icons/io';
import { Navigate } from 'react-router-dom';
import Editor from '../components/Editor'
import { UserContext } from '../UserContext';
import { doc, setDoc, serverTimestamp } from "firebase/firestore"; 
import { db } from '../firebase';
import Categories from '../components/Categories';

const FileInput = () => {
  const [file, setFile] = useState(null)
  const {postImage, setPostImage, darkMode} = useContext(UserContext)
  const files = postImage == '' ? '' : postImage

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      e.preventDefault();
      setPostImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
  <div className='flex flex-col relative'>
    <label htmlFor="image" className='absolute right-2 top-2'>
    {postImage == '' ?<MdAddAPhoto size={25} className={`darkMode?'text-light-mode-text':'text-darker'`}/>:<IoMdReverseCamera size={25} className='text-red'/>}
    </label>
    <input type="file" className='hidden' id='image' onChange={handleFileInputChange} required/>
    <img src={files} className='h-52 object-cover border border-dark-text'/>
  </div>
  );
};

const Post = () => {
  const [title, setTitle] = useState('')
  const [summary, setSummary] = useState('')
  const [category, setCategory] = useState('')
  const [content, setContent] = useState('')
  const [redirect, setRedirect] = useState(false)
  const {darkMode, userInfo, postImage, categories} = useContext(UserContext)
  const files = postImage == '' ? '' : postImage

  const createNewPost = async(e) => {
    e.preventDefault()

    const unique_id = uuid();
    const _id = unique_id.slice(0,8).toUpperCase()

    // create new post
    await setDoc(doc(db, 'posts', _id), {
        title,
        summary,
        category,
        files,
        content,
        author: {
          userName: userInfo.displayName,
          email: userInfo.email,
          profile: userInfo.photoURL,
        },
        id:_id,
        timestamp: serverTimestamp(),
    });
    setRedirect(true)
  }

  if(redirect) {
    return <Navigate to='/' />
  }

  return (
    <div className={`${darkMode ? 'bg-gradient-to-b from-dark to-darker': ''} flex justify-center min-h-body`}>
      <div className='max-w-xl mx-auto flex flex-col items-center p-5 w-full'>
      <h1 className={`${darkMode ? 'text-white': ''} text-3xl font-semibold text-center mt-5 mb-10`}>Create a Post:</h1>
        <form className='flex flex-col gap-5' onSubmit={createNewPost}>
          <div className='flex flex-col gap-3'>
            <h2 className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} text-2xl`}>Enter a title:</h2>
            <input 
              className={`${darkMode ? 'text-white': ''} border border-dark-text p-2`}
              type="text"
              required 
              name="title" 
              id="title" 
              placeholder='Title'
              value={title}
              onChange={(e)=>setTitle(e.target.value)} 
            />
          </div>
          <div className='flex flex-col gap-3'>
            <h2 className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} text-2xl`}>Write a summary:</h2>
            <input 
            className={`${darkMode ? 'text-white': ''} border border-dark-text p-2 bg-transparent h resize-none h-24`}
            type="text"
            required 
            name="summary" 
            id="summary" 
            placeholder='Summary'
            value={summary}
            onChange={(e)=>setSummary(e.target.value)}
          />
          </div>
          <div className='flex flex-col gap-3'>
            <h2 className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} text-2xl`}>Select a category:</h2>
            <select name="category" id="category" onChange={(e) => setCategory(e.target.value)}  className={`${darkMode?'bg-dark-text':''} flex p-2 outline-none appearance-none`}>
              {categories.map((term) => (
                <option value={term}>{term}</option>
              ))}
            </select> 
          </div>
          <div className='flex flex-col gap-3'>
            <h2 className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} text-2xl`}>Add a cover image:</h2>
            <FileInput />
          </div>

          <div className='flex flex-col gap-3'>
            <h2 className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} text-2xl`}>Write your post:</h2>
            <Editor value={content} onChange={setContent} theme={darkMode && 'text-white'}/>
          </div>

          <button className='bg-accent text-white font-semibold p-4 my-10 rounded-2xl hover:bg-accent-dark'>Post Now</button>
        </form>
      </div>
    </div>
  )
}

export default Post