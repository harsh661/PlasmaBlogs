import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {BsCalendar, BsPerson} from 'react-icons/bs'
import {AiOutlineHeart, AiFillHeart} from 'react-icons/ai'
import {BiEditAlt, BiArrowBack, BiMessageSquare, BiArrowToTop} from 'react-icons/bi'
import { UserContext } from '../UserContext';
import Loader from '../components/Loader';
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';
import Comments from '../components/Comments'

const BlogPage = () => {

  const {id} = useParams()
  const {userInfo, darkMode, info, setInfo, commentNum, setCommentNum,} = useContext(UserContext)
  const [isLiked, setIsLiked] = useState(false)
  const [likesNum, setLikesNum] = useState() 

  const getLikesComments = async () => {
    const docRef = doc(db, userInfo?.email, info?.id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setIsLiked(true)
    } else {
      console.log("No such document!");
    }
  }

  const getData = async () => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setInfo(docSnap.data());
      setCommentNum(docSnap.data()?.comments?.length)
      setLikesNum(docSnap.data()?.likes)
    } else {
      console.log("No such document!");
    }
    getLikesComments()
  }

  const addlike = async () => {
    setLikesNum(prev => prev + 1)
    const addedLikes = likesNum + 1
    const docRef = doc(db, 'posts', info.id);
    updateDoc(docRef, {
        likes: addedLikes,
    });
    setIsLiked(true)
  }

  const showComment = (e) => {
    const elem = document.querySelector('#main')
    window.scrollTo(
      { left: 0,
        top: elem?.offsetHeight,
        behavior: "smooth" }
    )
  };

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  useEffect(() => {
    setInfo(null)
    window.scrollTo(0, 0)
    getData()
  }, [])

  if(!info) return <Loader/>

  return (
    <div className={`${darkMode ? 'bg-dark': ''} min-h-body`}>
      <div className='flex flex-col md:flex-row max-w-4xl mx-auto'>
        <div className={`${darkMode?'bg-card text-dark-text md:bg-transparent':'bg-white text-light-mode-text md:bg-transparent'} md:sticky fixed w-full md:w-auto md:top-40 bottom-0 flex md:flex-col gap-10 md:gap-5 h-max items-center justify-center z-50 pt-1 p-5`}>
          <div className='flex flex-col md:hidden absolute left-5 cursor-pointer' onClick={goTop}>
            <BiArrowToTop size={30}/>          
          </div>
          <span className='flex flex-col items-center cursor-pointer'>
            {isLiked? <AiFillHeart className='text-red' size={27}/>: <AiOutlineHeart size={27} onClick={addlike}/>}
            {likesNum}         
          </span>
          <span className='flex flex-col items-center cursor-pointer'>
            <BiMessageSquare size={25} onClick={showComment}/>
            {info?.comments?commentNum:0}
          </span>
        </div>
        <div id='main' className="flex flex-col items-center p-5 animate-slideUp relative">
            <Link to='/' className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} flex items-center gap-2 text-xl hover:underline underline-offset-4 pb-5`}>
              <BiArrowBack/> Back to Home
            </Link>
            <div className='w-full'>
              <span className='bg-accent p-1 text-white'>
                #{info.category}
              </span>
            </div>
            <h1 className={`${darkMode && 'text-white'} text-4xl font-bold text-left w-full pt-5 pb-5 sm:pb-10`}>{info.title}</h1>
            <div className='pb-10 flex flex-col gap-5 items-start flex-wrap w-full'>
                <span className={`flex gap-3 md:text-xl items-center ${darkMode ? 'text-dark-text':'text-light-mode-text'}`}>
                  {info.author?.profile 
                  ? <img src={info?.author?.profile} className='rounded-full w-10 md:w-12'/>
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
                  {new Date(info?.timestamp?.seconds*1000).toDateString().slice(4)}
                </span>
            </div>
            <div className='w-full'>
                <img src={info.files}
                alt="Blog image" 
                className="max-h-96 w-full object-cover object-center"
                />
            </div>
            <div dangerouslySetInnerHTML={{__html: info.content}} className={`${darkMode ? 'content-dark' : 'content'} w-full py-10 flex flex-col justify-start`}/>
            <div className='hidden md:flex w-full'>
              <Comments/>
            </div>
        </div>
        <div className='md:hidden'>
          <Comments/>
        </div>
      </div>
    </div>
  )
}

export default BlogPage