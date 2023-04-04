import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext'
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';

const Comments = () => {
  const {darkMode, userInfo, info} = useContext(UserContext)
  console.log(info)
  const [comment, setComment] = useState(info?.comments)
  const [input, setInput] = useState('')

  const addComment = (e) => {
    setInput(e.target.value)
    console.log(comment)
  }

  const postComment = () => {
    let commentObj = {
        user: userInfo.displayName, 
        userImage: userInfo.photoURL, 
        comment: input,
    }
    let commentDetails = comment.unshift(commentObj)
    const docRef = doc(db, 'posts', info.id);
    console.log(commentObj)
    console.log(comment)
    updateDoc(docRef, {
        comments: comment
    });
   }

  return (
    <div className={`${darkMode?'bg-darker text-dark-text':'bg-light-mode text-light-mode-text'} p-5 pb-10 w-full flex flex-col`}>
        {userInfo &&
        <>
        <h3 className='pt-3 pb-5 text-2xl'>Comments</h3>
        <div className={`flex pb-5 flex-col items-center gap-3 border-b ${darkMode?'border-dark-text':'border-light-mode-text'}`}>
            <div className='flex items-center gap-3 w-full'>
                <img src={userInfo.photoURL} className='w-10 h-10 object-cover rounded-full'/>
                <span className={`${darkMode?'text-white': 'text-black'} font-semibold`}>{userInfo.displayName}</span>
            </div>
            <textarea
             type="text" 
             className={`bg-transparent w-full p-5 rounded-lg resize-none outline-none`} 
             value={input} 
             onChange={addComment} 
             placeholder='Write something...'
            />
            <div className='flex w-full justify-end'>
                <button onClick={postComment} className='py-2 px-3 bg-accent text-white text-sm rounded-full'>Comment</button>
            </div>
        </div>
        </>
        }
        <div className='flex flex-col py-10 gap-5'>
            {info?.comments?.map((comment, i) => (
                <div key={i} className='flex flex-col gap-3'>
                    <div className='flex items-center gap-3 pt-1'>
                        <img src={comment?.userImage} className='rounded-full w-8 h-8 max-w-none'/>
                        <span className={`${darkMode?'text-white':'text-dark'} font-semibold`}>{comment?.user}</span>
                    </div>
                    <div className={`${darkMode?'border-dark-text':'border-light-mode-text'} flex flex-col gap-3 w-full`}>
                        <span className={`${darkMode?'text-white':'text-dark'}`}>{comment?.comment}</span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Comments