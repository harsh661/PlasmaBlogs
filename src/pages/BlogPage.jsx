import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import {BsCalendar, BsPerson} from 'react-icons/bs'
import {BiEditAlt, BiArrowBack, BiCommentDetail} from 'react-icons/bi'
import { UserContext } from '../UserContext';
import Loader from '../components/Loader';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { auth } from '../firebase';
import { Helmet } from 'react-helmet';
import Comments from '../components/Comments'

const BlogPage = () => {
  const {id} = useParams()
  const {userInfo,setUserInfo, darkMode, info, setInfo} = useContext(UserContext)

  const getData = async () => {
    const docRef = doc(db, "posts", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setInfo(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }

  const showComment = (e) => {
    const elem = document.querySelector('#main')
    window.scrollTo(
      { left: 0,
        top: elem?.offsetHeight,
        behavior: "smooth" }
    )
  };
  useEffect(() => {
    auth.onAuthStateChanged(state => {
      setUserInfo(state)
    })
  }, [userInfo])

  useEffect(() => {
    setInfo(null)
    window.scrollTo(0, 0)
    getData()
  }, [])

  if(!info) return <Loader/>

  return (
    <div className={`${darkMode ? 'bg-dark': 'bg-white'} min-h-body`}>

      {/* React Helmet for Meta data */}
      <Helmet>
        <title>{info?.title}</title>
        <meta name="description" content={info?.summary} />
        <meta property='og:description' content={info?.summary}/>
        <meta property='og:title' content={info?.title}/>
        <meta property='og:author' content={info?.author?.userName}/>
        <meta property='og:keywords' content={info?.category}/>
        <meta name='keywords' content={info?.category}/>
        <meta name='image' content='https://www.agilitypr.com/wp-content/uploads/2020/02/technology-1-1-980x368.jpg'/>
        <meta property='og:image' content='https://www.agilitypr.com/wp-content/uploads/2020/02/technology-1-1-980x368.jpg'/>
        <meta name="author" content={info?.author?.userName} />        
      </Helmet>

      <div className='flex flex-col md:flex-row max-w-4xl mx-auto'>
        <div onClick={showComment}>
          <span className='flex flex-col items-center cursor-pointer text-white bg-accent z-10 rounded-full fixed right-5 p-4 bottom-5'>
            <BiCommentDetail size={25}/>
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
                className="max-h-96 rounded-lg w-full object-cover object-center"
                />
            </div>
            <div dangerouslySetInnerHTML={{__html: info.content}} className={`${darkMode ? 'content-dark' : 'content'} w-full py-10 flex flex-col justify-start`}/>
            <div className='hidden md:flex w-full'>
              <Comments/>
            </div>
        </div>
        <div className='md:hidden z-20'>
          <Comments/>
        </div>
      </div>
    </div>
  )
}

export default BlogPage