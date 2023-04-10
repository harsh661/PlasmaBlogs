import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { db } from '../firebase';

const Categories = () => {
  const {darkMode, setPosts, posts, categories} = useContext(UserContext)
  const [backup, setBackup] = useState(posts)
  const [all, setAll] = useState(true)
  const data = []

  const getCategoryData = async (e) => {
    setAll(false)
    const q = query(collection(db, "posts"), where("category", "==", e.target.value), orderBy('timestamp', 'asc'))

    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
    data.push(doc.data())
    })
    setPosts(data)
  }
  const getAllPosts = async () => {
    setAll(true)
    setPosts(backup)
  }

  return (
    <div id='categories' className='w-full py-2 overflow-x-scroll'>
        <div className={`flex items-center md:max-w-[984px] overflow-scroll p-2 gap-3 lg:mx-auto mx-5`}>
                <label className="container">
                    <input
                    type="radio" 
                    onClick={getAllPosts} 
                    name='radio' 
                    className={`hidden`}
                    />
                    <span className={`checkmark whitespace-nowrap py-2 px-5 rounded-full ${darkMode?'bg-light text-dark-text': 'bg-light-mode'}`}>All</span>
                </label>
                {categories.map((category, i) => (
                <label key={i} className="container w-full h-full">
                    <input
                    type="radio" 
                    onChange={getCategoryData} 
                    name='radio' 
                    value={category}
                    className={`hidden`}
                    />
                    <span className={`checkmark whitespace-nowrap py-2 px-3 rounded-full ${darkMode?'bg-light text-dark-text': 'bg-light-mode'}`}>{category}</span>
                </label>
            ))}
        </div>
    </div>
  )
}

export default Categories