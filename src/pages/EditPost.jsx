import React, {useContext, useState} from 'react'
import Editor from '../components/Editor'
import {useParams, Navigate, useNavigate} from 'react-router-dom'
import {MdAddAPhoto} from 'react-icons/md'
import {IoMdReverseCamera} from 'react-icons/io';
import { UserContext } from '../UserContext'
import Loader from '../components/Loader'
import { updateDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { doc } from 'firebase/firestore'
import { db } from '../firebase'

const FileInput = () => {
  const [file, setFile] = useState(null)
  const {postImage, setPostImage, info, darkMode} = useContext(UserContext)
  const files = postImage == '' ? info.files : postImage

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
    <IoMdReverseCamera size={25} className='text-red'/>
    </label>
    <input type="file" className='hidden' id='image' onChange={handleFileInputChange} />
    <img src={files} className='h-52 object-cover border border-dark-text'/>
  </div>
  );
};

const EditPost = () => {
    
    const {darkMode, info, postImage} = useContext(UserContext)
    const navigate = useNavigate()
    const {id} = useParams()
    const [title, setTitle] = useState(info.title)
    const [summary, setSummary] = useState(info.summary)
    const [content, setContent] = useState(info.content)
    const [redirect, setRedirect] = useState(false)
    const files = postImage == '' ? info.files : postImage

    const updatePost = async (e) => {
        e.preventDefault()
        const docRef = doc(db, 'posts', info.id);

        updateDoc(docRef, {
            title,
            summary,
            files,
            content,
            timestamp: serverTimestamp(),
        });
        console.log(files)
        setRedirect(true)
    }
    const deletePost = async () => {
      await deleteDoc(doc(db, "posts", info.id))
      navigate('/')
    }
    

if(content === '') return <Loader />

if(redirect) {
    return <Navigate to={`/post/${id}`} />
}
  return (
    <div className={`${darkMode ? 'bg-gradient-to-b from-dark to-darker': ''} flex justify-center min-h-body`}>
      <div className='max-w-xl mx-auto flex flex-col items-center p-5 w-full'>
      <h1 className={`${darkMode ? 'text-white': ''} text-3xl font-semibold text-center mt-5 mb-10`}>Edit your Post:</h1>
        <form className='flex flex-col gap-5' onSubmit={updatePost}>
          <div className='flex flex-col gap-3'>
            <h2 className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} text-2xl`}>Enter a title:</h2>
            <input 
              className={`${darkMode ? 'text-white': ''} border border-dark-text p-2`}
              type="text"
              name="title" 
              id="title" 
              placeholder='Title'
              value={title}
              size={1}
              onChange={(e)=>setTitle(e.target.value)} 
            />
          </div>
          <div className='flex flex-col gap-3'>
            <h2 className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} text-2xl`}>Write a summary:</h2>
            <input 
            className={`${darkMode ? 'text-white': ''} border border-dark-text p-2 bg-transparent h resize-none h-24`}
            type="text"
            name="summary" 
            id="summary" 
            placeholder='Summary'
            value={summary}
            size={1}
            onChange={(e)=>setSummary(e.target.value)}
          />
          </div>
          <div className='flex flex-col gap-3'>
            <h2 className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} text-2xl`}>Add a cover image:</h2>
            <FileInput />
          </div>

          <div className='flex flex-col gap-3'>
            <h2 className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} text-2xl`}>Edit you Post content:</h2>
            <Editor value={content} onChange={setContent} theme={darkMode && 'text-white'}/>
          </div>

          <button className='bg-accent text-white font-semibold p-4 mt-10 rounded-2xl hover:bg-accent-dark'>Update the Post</button>
        </form>
          <button onClick={deletePost} className='bg-red mt-5 w-full text-white font-semibold p-4 rounded-2xl hover:bg-accent-dark'>Delete Post</button>
      </div>
    </div>
  )
}

export default EditPost