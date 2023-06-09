import React, {useContext, useEffect, useState} from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { GoogleAuthProvider, GithubAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth"
import { auth } from '../firebase';
import {FaGithub, FaFacebook} from 'react-icons/fa'
import {FcGoogle} from 'react-icons/fc'

const Login = () => {
  const [redirect, setRedirect] = useState(false);
  const [err, setErr] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const {setUserInfo,userInfo, darkMode} = useContext(UserContext)

  const loginWithGoogle = async (e) => {
    e.preventDefault()
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
      setErrorMessage(error.message)
    })
  }

  const loginWithFacebook = (e) => {
    e.preventDefault()
    const provider = new FacebookAuthProvider()
    signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      setUserInfo(user)
      setRedirect(true)
    })
    .catch((error) => {
      setErr(true)
      console.log(error.message)
      setErrorMessage(error.message)
  });
  }

  const loginWithGithub = (e) => {
    e.preventDefault()
    const provider = new GithubAuthProvider()
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user)
      setRedirect(true)
    }).catch((error) => {
      setErr(true)
      console.log(error.message)
      setErrorMessage(error.message)
    })
  }

  useEffect(() => {
    auth.onAuthStateChanged(state => {
      setUserInfo(state)
    })
  }, [userInfo])

  if(redirect) {
    return <Navigate to="/"/>
  }

  return (
    <div className={`${darkMode ? 'bg-dark': 'sm:bg-light-mode'} min-h-body w-screen flex items-center justify-center`}>
      <div className={`sm:rounded-xl shadow-form flex flex-col items-center py-5 pb-5 sm:pb-10 sm:w-[500px] w-full sm:min-h-max responsive-h`}>
          <h1 className={`${darkMode ? ' text-white': ''} text-2xl md:text-3xl px-5 font-bold text-center mt-10 mb-5`}>Login to PlasmaBlogs</h1>
          <span className={`p-2 ${err?'text-red':'text-gray-500'} text-sm`}>{err?errorMessage.split('(')[1].replace(')', ''): 'Please sign in to your account'}</span>
          <div className='flex flex-col sm:px-16 px-10 pb-5 pt-5 flex-1 w-full justify-between'>
              <div className='flex flex-col gap-5 sm:pb-0 pb-10'>
                <button onClick={loginWithGoogle} className='bg-white border-black border font-semibold p-4 my-2 rounded-2xl hover:bg-accent-dark'>
                  <span className='flex items-center justify-center gap-5 relative'>
                    <FcGoogle size={25} className='absolute left-0'/>
                    Sign in with Google
                  </span>
                </button>
                <button onClick={loginWithFacebook} className='bg-accent text-white font-semibold p-4 my-2 rounded-2xl hover:bg-accent-dark'>
                  <span className='flex items-center justify-center gap-5 relative'>
                    <FaFacebook size={25} className='absolute left-0'/>
                    Sign in with Facebook
                  </span>
                </button>
                <button onClick={loginWithGithub} className='bg-black outline-white outline text-white font-semibold p-4 my-2 rounded-2xl hover:bg-accent-dark'>
                  <span className='flex items-center justify-center gap-5 relative'>
                    <FaGithub size={25} className='absolute left-0'/>
                    Sign in with Github
                  </span>
                </button>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Login