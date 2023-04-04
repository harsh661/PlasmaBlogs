import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {BsCalendar, BsPerson} from 'react-icons/bs'
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import {BiEditAlt, BiArrowBack, BiMessageSquare} from 'react-icons/bi'
import { UserContext } from '../UserContext';
import Loader from '../components/Loader';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';

const BlogPage = () => {

  const {id} = useParams()
  const {userInfo, darkMode, info, setInfo} = useContext(UserContext)
  const [isLiked, setIsLiked] = useState(false)
  const getData = async () => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setInfo(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  const addlike = async () => {
    setIsLiked(prev => !prev)
  }

  useEffect(() => {
    setInfo(null)
    window.scrollTo(0, 0)
    getData()
  }, [])

  if(!info) return <Loader/>

  return (
    <div className={`${darkMode ? 'bg-gradient-to-b from-dark to-darker': ''} min-h-body`}>
      <div className='flex max-w-4xl mx-auto'>
        <div className={`${darkMode?'bg-card text-dark-text md:bg-transparent':'bg-white text-light-mode-text md:bg-transparent'} md:sticky fixed w-full md:w-auto md:top-40 bottom-0 flex md:flex-col gap-10 md:gap-5 h-max items-center justify-center z-50 pt-1 md:p-5`}>
          <span className='flex flex-col items-center'>
            {isLiked? <AiFillHeart onClick={addlike} className='text-red' size={27}/>: <AiOutlineHeart size={27} onClick={addlike}/>}
            {info.likes || 0}
          </span>
          <span className='flex flex-col items-center'>
            <BiMessageSquare size={25}/>
            3
          </span>
        </div>
        <div className="flex flex-col items-center p-5 animate-slideUp relative">
            <div className='w-full'>
              <span className='bg-accent p-1 text-white'>
                #{info.category}
              </span>
            </div>
            <h1 className={`${darkMode && 'text-white'} text-4xl font-bold text-left w-full pt-5 pb-5 sm:pb-10`}>{info.title}</h1>
            <div className='pb-10 flex flex-col gap-5 items-center flex-wrap w-full'>
                <span className={`flex gap-3 items-center ${darkMode ? 'text-dark-text':'text-light-mode-text'}`}>
                  {info.author?.profile 
                  ? <img src={info?.author?.profile} className='rounded-full w-10'/>
                  :<BsPerson size={20}/>}
                  {info.author?.userName}
                  {userInfo?.email === info?.author.email && (
                    <Link to={`/edit/${info.id}`} className='pl-1'>
                      <BiEditAlt size={25}/>
                    </Link>
                    )} 
                </span>
                <span className={`flex gap-3 items-center ${darkMode ? 'text-dark-text':'text-light-mode-text'}`}>
                  <BsCalendar />
                  {new Date(info?.timestamp?.seconds*1000).toDateString().slice(4,15)}
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
    </div>
  )
}

export default BlogPage