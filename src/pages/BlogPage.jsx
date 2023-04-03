import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {BsCalendar, BsPerson} from 'react-icons/bs'
import {BiEditAlt, BiArrowBack} from 'react-icons/bi'
import { UserContext } from '../UserContext';
import Loader from '../components/Loader';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';

const BlogPage = () => {

  const {id} = useParams()
  const {userInfo, darkMode, info, setInfo} = useContext(UserContext)
  const getData = async () => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setInfo(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  useEffect(() => {
    getData()
  }, [])

  if(!info) return <Loader/>

  return (
    <div className={`${darkMode ? 'bg-gradient-to-b from-dark to-darker': ''} min-h-body`}>
      <div className="max-w-4xl mx-auto flex flex-col items-center p-5 animate-slideUp">
          <Link to='/' className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} md:hidden flex items-center gap-2 text-xl hover:underline underline-offset-4 pb-5 -translate-x-5`}>
            <BiArrowBack/> Back to Home
          </Link>
          <h1 className={`${darkMode && 'text-white'} text-4xl font-bold text-left w-full pt-5 pb-5 sm:pb-10`}>{info.title}</h1>
          <div className='pb-10 flex gap-5 items-center flex-wrap w-full'>
              <span className={`flex gap-3 items-center ${darkMode ? 'text-dark-text':'text-light-mode-text'}`}>
                <BsCalendar />
                {new Date(info?.timestamp?.seconds*1000).toDateString()}
              </span>
              <span className={`flex gap-3 items-center ${darkMode ? 'text-dark-text':'text-light-mode-text'}`}>
                <BsPerson size={20}/>
                {info.author?.userName}
                {userInfo?.email === info?.author.email && (
                  <Link to={`/edit/${info.id}`} className='pl-1'>
                    <BiEditAlt size={25}/>
                  </Link>
                  )} 
              </span>
          </div>
          <div className='w-full'>
              <img src={info.files}
              alt="Blog image" 
              className="max-h-96 w-full object-cover object-center"
              />
          </div>
          <div dangerouslySetInnerHTML={{__html: info.content}} className={`${darkMode ? 'content-dark' : 'content'} w-full py-10 flex flex-col justify-start`}/>
      </div>
    </div>
  )
}

export default BlogPage