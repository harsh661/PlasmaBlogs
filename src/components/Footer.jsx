import React, { useContext } from 'react'
import { UserContext } from '../UserContext'

const Footer = () => {
  const {darkMode} = useContext(UserContext)
  return (
    <div className={`${darkMode ? 'bg-darker text-dark-text border-border': 'bg-light-mode border-border-light text-light-mode-text'} p-10 flex flex-col border-t items-center gap-5`}>
      <span>&#169; 2023 Harsh Raj</span>
      <span className='text-xs'><a href="https://plasmaharsh.netlify.app" className='underline'>My Portfolio Website</a></span>
    </div>
  )
}

export default Footer