import React, { useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../UserContext'
import {IoMdAdd} from 'react-icons/io'
import {MdLightMode, MdNightlightRound, MdClose, MdLogout, MdLogin, MdOutlineFeed} from 'react-icons/md'
import {FaRegUserCircle} from'react-icons/fa'
import {HiOutlineMenuAlt1, HiOutlineMoon, HiOutlineBookmark} from 'react-icons/hi'
import {AiOutlineTwitter, AiOutlineInstagram, AiFillLinkedin, AiFillGithub} from 'react-icons/ai'
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
  const {userInfo, darkMode, setDarkMode, navOpen, setNavOpen} = useContext(UserContext)

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
  if(navOpen){
    document.body.classList.add('fix')
  } else {
    document.body.classList.remove('fix')
  }

  return (
    <nav className={`${darkMode ? 'bg-dark': 'bg-white'} z-50 px-5 flex items-center justify-center sticky top-0`}>
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
              <Link to={`/details/${userInfo?.displayName}`}>
                <img src={userInfo?.photoURL} alt="User" className='w-10 h-10 rounded-full object-cover'/>
              </Link>
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
          <div className={`${darkMode ? 'bg-darker': 'bg-light-mode md:bg-white md:border-2'} animate-slidein w-4/5 md:w-auto md:animate-slideinSmall absolute md:left-auto left-0 top-0 md:top-16 md:right-0 flex flex-col justify-between p-5 pt-20 md:pt-5 responsive-h md:min-h-fit md:justify-between md:items-center md:rounded-lg md:absolute`}>
              {userInfo ? 
                <div className='text-dark-text h-full max-w-full text-lg gap-5 flex flex-col justify-between w-80'>
                  <div className={`flex md:flex-col items-center text-lg gap-5 md:gap-2 ${darkMode ? 'text-white': 'text-black'}`}>
                    <div>
                      {userInfo
                        ?<Link to={`/details/${userInfo?.displayName}`} onClick={()=>setNavOpen(false)}>
                            <img src={userInfo?.photoURL} className='w-12 h-12 md:w-16 md:h-16 rounded-full object-cover border border-light-mode-text'/>
                          </Link>
                        :<FaRegUserCircle size={25}/>
                      }
                    </div>
                    {userInfo?.displayName}
                  </div>
                  <div className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} h-full flex flex-col pl-5 md:pl-2 pt-10 md:pt-0 gap-5`}>
                      <Link onClick={() => setNavOpen(false)} to={`/${userInfo.displayName}/posts`} className={`flex items-center gap-2 cursor-pointer ${darkMode?'hover:text-white':'hover:text-black'}`}><MdOutlineFeed/>Your Posts</Link>
                      <span className={`flex items-center gap-2 cursor-pointer ${darkMode?'hover:text-white':'hover:text-black'}`}><HiOutlineBookmark/>Bookmarks</span>
                  </div>
                  <div onClick={logout} className={`cursor-pointer flex items-center gap-5 text-red pt-5 pb-10 md:pb-5 border-t ${darkMode ? 'border-dark-text': 'border-light-mode-text'}`}>
                    <div><MdLogout size={25}/></div>
                    Logout
                  </div>
                </div>
                :
                <div className='flex flex-col h-full text-xl gap-5 justify-between'>
                  <div className={`flex items-center gap-3 ${darkMode ? 'text-dark-text text-xl': 'text-black text-xl'}`}>
                    <span><FaRegUserCircle size={30}/></span>
                    <p>Not signed in</p>
                  </div>
                  <Link to='/login' onClick={()=>setNavOpen(prev => !prev)} className={`cursor-pointer flex items-center gap-5 text-accent pt-5 pb-10 md:pb-5 border-t ${darkMode ? 'border-dark-text': 'border-light-mode-text'}`}>
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