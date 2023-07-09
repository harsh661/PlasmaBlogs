import React, {useContext, useEffect} from 'react'
import Blog from '../components/Blog'
import Footer from '../components/Footer'
import { UserContext } from '../UserContext'
import { Link } from 'react-router-dom'
import {IoMdAdd} from 'react-icons/io'
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
    <div className={`${darkMode ? 'bg-dark': 'bg-white'} flex flex-col items-center min-h-body pb-20`}>
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