import React, {useContext, useState} from 'react'
import {Link} from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from '../firebase';
import {FiGithub} from 'react-icons/fi'
import {FcGoogle} from 'react-icons/fc'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [err, setErr] = useState(false)
  const [userErr, setUserErr] = useState(false)
  const [show, setShow] = useState(true)
  const {setUserInfo, darkMode} = useContext(UserContext)

  function handleShow() {
    setShow(prevShow => !prevShow)
  }

  const loginWithGoogle = async (e) => {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      setUserInfo(user)
      setRedirect(true)
    }).catch((error) => {
      setErr(true)
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    })
  }

  const loginWithGithub = () => {
    const provider = new GithubAuthProvider()
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user)
      // setRedirect(true)
    }).catch((error) => {
      const errorCode = error.code;
      console.log(error)
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GithubAuthProvider.credentialFromError(error);
    })
  }

  if(redirect) {
    return <Navigate to="/"/>
  }

  return (
    <div className={`${darkMode ? 'bg-dark': 'sm:bg-light-mode'} min-h-body w-screen flex items-center justify-center`}>
      <div className={`${darkMode ? 'bg-darker':'bg-white'} sm:rounded-xl shadow-form flex flex-col items-center py-5 pb-5 sm:pb-10 sm:w-[500px] w-full sm:min-h-max responsive-h`}>
          <h1 className={`${darkMode ? ' text-white': ''} text-2xl md:text-3xl px-5 font-bold text-center mt-10 mb-5`}>Login to PlasmaBlogs</h1>
          <span className={`p-2 ${userErr?'text-red':'text-gray-500'}`}>{userErr?'User not found': 'Please sign in to your account'}</span>
          <form className='flex flex-col sm:px-16 px-10 pb-5 pt-5 flex-1 w-full justify-between'>
              <div className='flex flex-col gap-5 sm:pb-0 pb-10'>
                <button onClick={loginWithGoogle} className='bg-white border-black border font-semibold p-4 my-2 rounded-2xl hover:bg-accent-dark'>
                  <span className='flex items-center justify-center gap-5 relative'>
                    <FcGoogle size={25} className='absolute left-0'/>
                    Sign in with Google
                  </span>
                </button>
                <button onClick={loginWithGithub} className={`${darkMode ? 'bg-white text-black': 'bg-black text-white'}  font-semibold p-4 my-2 rounded-2xl hover:bg-accent-dark`}>
                  <span className='flex items-center justify-center gap-5 relative'>
                    <FiGithub size={25} className='absolute left-0'/>
                    Sign in with Github
                  </span>
                </button>
              </div>
          </form>
      </div>
    </div>
  )
}

export default Login