import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";


const Register = () => {
  const [show, setShow] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errCode, setErrCode] = useState('')
  const [err, setErr] = useState(false)
  const [redirect, setRedirect] = useState(false);
  const {darkMode, setUserInfo, userInfo} = useContext(UserContext)

  async function register(e) {
    e.preventDefault()
    // register new user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        setUserInfo(user)
        console.log(user)
        setRedirect(true)
      })
      .catch((error) => {
        setErrCode(error.code)
        setErr(true)
      });
  }

  function handleShow() {
    setShow((prevShow) => !prevShow);
  }

  if(redirect) {
    return <Navigate to={`/details/${userInfo.email}`} />
  }

  return (
    <div className={`${darkMode ? 'bg-dark': 'sm:bg-light-mode'} min-h-body w-screen flex items-center justify-center`}>
      <div className={`${darkMode ? 'bg-darker':'bg-white'} sm:rounded-xl shadow-form flex flex-col items-center pb-5 sm:pb-10 sm:w-[500px] w-full sm:min-h-max min-h-body`}>
          <h1 className={`${darkMode ? ' text-white': ''} text-2xl md:text-3xl font-bold text-center mt-10 mb-5`}>Create New Account</h1>
          <span className='p-2 text-gray-500'>{err?(errCode.replace('auth/', '')):'Please fill the form to continue'}</span>
          <form onSubmit={register} className='flex flex-col sm:px-16 px-10 pb-5 pt-5 flex-1 w-full justify-between'>
              <div className='flex flex-col gap-5'>
                <input 
                onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email" 
                  name="email" 
                  id="email" 
                  className={`${darkMode?'bg-card text-white':'border-light-mode border-2 text-black'} ${errCode === 'auth/email-already-in-use' && 'border-2 border-red placeholder:text-red'} p-4 text-lg rounded-xl outline-none placeholder:text-sm`} 
                  placeholder={'Enter your Email'} 
                  required
                  />
                <div className='flex items-center bg-dark-lighter text-white text-lg rounded-xl outline-none placeholder:text-sm relative'>
                <input 
                onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type={show ? 'password': 'text'} 
                  name="pass" 
                  id="pass" 
                  className={`${darkMode?'bg-card text-white':'border-light-mode border-2 text-black'} ${errCode === 'auth/weak-password' && 'border-2 border-red placeholder:text-red'} p-4 text-lg rounded-xl outline-none placeholder:text-sm w-full`} 
                  placeholder='Enter your password' 
                  required
                  />
                <span className='absolute right-4 cursor-pointer text-gray-500' onClick={handleShow}>
                  <svg width="25" height="25" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                  </svg>
                </span>
                </div>
              </div>
              <div className='flex flex-col gap-5 sm:pb-0 pb-10'>
                <button className='bg-accent text-white font-semibold p-4 my-5 rounded-2xl hover:bg-accent-dark'>Sign up</button>
                <p className='text-gray-500 cursor-pointer text-center'>Already have an account? <Link to='/login' className='text-accent'>Log in</Link></p>
              </div>
          </form>
      </div>
    </div>
  );
};

export default Register;
