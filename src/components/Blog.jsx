import React, {useContext, useEffect } from 'react'
import { UserContext } from '../UserContext'
import BlogPost from './BlogPost'
import Loader from './Loader'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';

const Blog = () => {

  const {darkMode, setPosts, posts} = useContext(UserContext)

  const getPosts = async () => {
    const postReference = await getDocs(collection(db, "posts"))
    const postData = postReference.docs.map(doc => doc.data())
    setPosts(postData)
  }

  useEffect(() => {
    // get posts
    window.scrollTo(0, 0)
    getPosts()
  }, [])

  if(!posts) return <Loader />

  return (
    <div className='max-w-5xl flex flex-col items-center p-3 md:p-5 overflow-x-hidden'>
      {posts?.length > 0 && posts?.map((blog, index) => (
        <BlogPost {...blog} key={index}/>
      ))}
      {posts?.length == 0 && (
        <h1 className={`${darkMode ? ' text-dark-text': ''} text-3xl font-bold text-center mt-10`}>No Posts yet!</h1>
      )}
    </div>
  )
}

export default Blog