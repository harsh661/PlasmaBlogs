import React, { useContext } from 'react'
import { UserContext } from '../UserContext'

const Loader = () => {
    const {darkMode} = useContext(UserContext)
  return (
    <div className={`flex items-center justify-center w-full min-h-body ${darkMode ? 'bg-dark': ''}`}>
    <div className="lds-ellipsis">
        <div className={!darkMode ? 'bg-black': 'bg-white'}></div>
        <div className={!darkMode ? 'bg-black': 'bg-white'}></div>
        <div className={!darkMode ? 'bg-black': 'bg-white'}></div>
        <div className={!darkMode ? 'bg-black': 'bg-white'}></div>
    </div>
    </div>
  )
}

export default Loader