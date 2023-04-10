import React, {useContext, useEffect} from 'react'
import Blog from '../components/Blog'
import Footer from '../components/Footer'
import { UserContext } from '../UserContext'
import { Link } from 'react-router-dom'
import {IoMdAdd} from 'react-icons/io'
import {AiOutlineTwitter, AiOutlineInstagram, AiFillLinkedin, AiFillGithub} from 'react-icons/ai'
import { auth } from '../firebase'
import Categories from '../components/Categories'

const Home = () => {
  const {darkMode, userInfo, setUserInfo} = useContext(UserContext)

  useEffect(() => {
    auth.onAuthStateChanged(state => {
      setUserInfo(state)
    })
  }, [userInfo])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  return (
    <>
    <div className={`${darkMode ? 'bg-dark': ''} flex flex-col items-center min-h-body pb-20`}>
      <div className='flex flex-col gap-5 items-center p-5'>
        <h2 className={`${darkMode && 'text-white'} text-3xl`}>Plasma Blogs</h2>
        <div className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} flex justify-center gap-5 text-2xl`}>
          <a target='_blank' href='https://twitter.com/Harsh_script'><AiOutlineTwitter/></a>
          <a target='_blank' href='https://www.linkedin.com/in/harsh-raj-1b6638258/'><AiFillLinkedin /></a>
          <a target='_blank' href='https://github.com/harsh661'><AiFillGithub /></a>
          <a target='_blank' href='https://instagram.com/harsh.script'><AiOutlineInstagram/></a>
        </div>
      </div>
      <Categories />
      <Blog />
      {
        userInfo && (
          <Link to='/create' className='flex flex-col items-center cursor-pointer text-white bg-accent z-10 rounded-full fixed right-5 p-4 bottom-5'>
          <IoMdAdd size={30}/>
        </Link>
        )
      }
    </div>
    <Footer />
    </>
  )
}

export default Home