import React, { useContext, useEffect, useState } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { UserContext } from '../UserContext';
import BlogPost from '../components/BlogPost';
import Loader from '../components/Loader';

const UserPosts = () => {
  const {userInfo, darkMode} = useContext(UserContext)
  const [userPosts, setUserPosts] = useState([])

  let data = []
  const getUserPosts = async () => {
    const q = query(collection(db, "posts"), where("uid", "==", userInfo.uid))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
    data.push(doc.data())
    })
    setUserPosts(data)
  }

  useEffect(() => {
    getUserPosts()
  }, [data])

  if(!data) return <Loader />

  return (
    <div className={`${darkMode&&'bg-darker'} max-w-5xl mx-auto flex flex-col gap-5 items-center p-3 md:p-5 overflow-x-hidden`}>
        {userInfo &&
        <div className='flex flex-col gap-3 items-center text-2xl'>
            <img src={userInfo?.photoURL} className='w-40 h-40 rounded-full object-cover'/>
            <div className={`${darkMode?'text-white':''} font-semibold`}>{userInfo?.displayName}</div>
            <span className={darkMode?'text-dark-text text-sm': 'text-light-mode-text text-sm'}>{userInfo?.email}</span>
            <h2 className={`${darkMode?'text-white':''} text-3xl font-semibold pt-5`}>Posts ({userPosts?.length})</h2>
        </div>
        }
      {userPosts?.length > 0 && userPosts?.map((blog) => (
        <BlogPost {...blog} key={blog.id}/>
      ))}
      {userPosts?.length == 0 && (
        <h1 className={`${darkMode ? ' text-dark-text': ''} text-3xl font-semibold text-center mt-20`}>No Posts yet!</h1>
      )}
    </div>
  )
}

export default UserPosts