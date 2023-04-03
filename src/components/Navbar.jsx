import React, { useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'
import {IoMdAdd} from 'react-icons/io'
import {MdLightMode, MdNightlightRound, MdClose, MdLogout, MdLogin} from 'react-icons/md'
import {FaRegUserCircle} from'react-icons/fa'
import {HiOutlineMenuAlt1, HiOutlineMoon} from 'react-icons/hi'
import {AiOutlineTwitter, AiOutlineInstagram, AiFillLinkedin, AiFillGithub} from 'react-icons/ai'
import {BiEditAlt} from 'react-icons/bi'
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false)

  const {setUserInfo, userInfo, darkMode, setDarkMode,} = useContext(UserContext)

  const logout = () => {
    // log out user
  const auth = getAuth();
      signOut(auth).then(() => {
        // Sign-out successful.
        setNavOpen(false)
      }).catch((error) => {
        // An error happened.
      });
  }

  return (
    <nav className={`${darkMode ? 'bg-dark': 'bg-white shadow-md'} z-10 px-5 flex items-center justify-center sticky top-0`}>
      <div className='h-[60px] md:relative w-full flex items-center justify-between max-w-6xl'>
        <Link to='/' className='hidden md:flex'>
          <img className='w-24' src={darkMode ? '/logo-dark.png' : '/logo.png'} alt="" />
        </Link>
        <div onClick={() => setNavOpen(prev => !prev)} className={`${darkMode && 'text-dark-text'} ${navOpen && 'hidden'} md:hidden text-3xl z-50`}>
          <HiOutlineMenuAlt1 />
        </div>
        <div onClick={() => setNavOpen(prev => !prev)} className={`${darkMode && 'text-dark-text'} ${!navOpen && 'hidden'} md:hidden text-4xl z-50`}>
            <MdClose />
        </div>

        <div className='flex items-center gap-5 text-white'>
          { userInfo !== null 
             ?
             <>
             <button 
             className={`${darkMode?'text-dark-text':'text-light-mode-text'}`}
             onClick={() => setDarkMode((mode) => !mode)}
              >
                {darkMode && <MdLightMode size={25}/>}
                {!darkMode && <HiOutlineMoon size={25}/>}

              </button>
              <Link to='/create' className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} flex items-center`}>
                <IoMdAdd size={30}/>
              </Link>
              <div onClick={()=>setNavOpen(prev => !prev)} className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} hidden md:flex`}>
                <img src={userInfo?.photoURL} alt="User" className='w-10 h-10 rounded-full'/>
              </div>
              </>
            :
            <>
            <button 
              className={`${darkMode?'text-dark-text':'text-light-mode-text'}`}
              onClick={() => setDarkMode((mode) => !mode)}
            >
              {!darkMode && <MdLightMode size={25}/>}
              {darkMode && <MdNightlightRound size={25}/>}

            </button>
            <Link to='/login' className='text-accent px-3 border py-1 rounded-md border-accent font-semibold cursor-pointer' onClick={()=>setNavOpen(false)}>Login</Link>
            </>
          } 
        </div>
        { (navOpen) && (
          <div className={`${darkMode ? 'bg-darker': 'bg-light-mode md:bg-white md:border shadow-md'} animate-slidein w-4/5 md:w-auto md:animate-slideinSmall absolute md:left-auto left-0 top-0 md:top-16 md:right-0 flex flex-col justify-between p-5 pt-20 md:pt-5 h-screen md:h-auto md:justify-between md:items-center md:rounded-lg md:absolute`}>
              {userInfo ? 
                <div className='text-dark-text h-full text-lg gap-5 flex flex-col justify-between'>
                  <div className={`flex items-center text-lg gap-5 ${darkMode ? 'text-dark-text': 'text-black'}`}>
                    <div className='md:hidden'>
                      {userInfo
                        ?<img src={userInfo?.photoURL} className='w-102 h-10 rounded-full object-cover'/>
                        :<FaRegUserCircle size={25}/>
                      }
                    </div>
                    {userInfo?.displayName}
                    {userInfo && <Link to={`/details/${userInfo?.displayName}`} onClick={()=>setNavOpen(false)}>
                        <BiEditAlt size={25}/>
                      </Link>}
                  </div>
                  <div onClick={logout} className={`cursor-pointer flex items-center gap-5 text-red pt-5 pb-10 md:pb-5 border-t ${darkMode ? 'border-dark-text': 'border-light-mode-text'}`}>
                    <div><MdLogout size={25}/></div>
                    Logout
                  </div>
                </div>
                :
                <div className='flex flex-col h-full text-xl gap-5 justify-between'>
                  <div className={`flex items-center text-base gap-3 ${darkMode ? 'text-dark-text text-xl': 'text-black text-xl'}`}>
                    <span><FaRegUserCircle size={30}/></span>
                    <p>You are not Signed in</p>
                  </div>
                  <Link to='/login' onClick={()=>setNavOpen(prev => !prev)} className={`cursor-pointer flex items-center gap-5 text-blue pt-5 pb-10 md:pb-5 border-t ${darkMode ? 'border-dark-text': 'border-light-mode-text'}`}>
                      <div><MdLogin size={30}/></div>
                      Login
                  </Link>
                </div>
                }
              <div className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} flex justify-center gap-5 text-2xl`}>
                <a target='_blank' href='https://twitter.com/Harsh_script'><AiOutlineTwitter/></a>
                <a target='_blank' href='https://www.linkedin.com/in/harsh-raj-1b6638258/'><AiFillLinkedin /></a>
                <a target='_blank' href='https://github.com/harsh661'><AiFillGithub /></a>
                <a target='_blank' href='https://instagram.com/harsh.script'><AiOutlineInstagram/></a>
              </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar