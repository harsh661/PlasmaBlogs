import React, {useContext, useState} from 'react'
import {MdAddAPhoto} from 'react-icons/md'
import {IoMdReverseCamera} from 'react-icons/io'
import {BiArrowBack} from 'react-icons/bi'
import { UserContext } from '../UserContext';
import { updateProfile } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate, Link } from 'react-router-dom';

const FileInput = () => {
    const [image, setImage] = useState(null)
    const {url, setUrl, userInfo, darkMode} = useContext(UserContext)

    const uploadImage = async (e) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append("image", image)

      const response = await fetch("https://api.imgbb.com/1/upload?key=52d55e3fe45e98af912de1d70861a822", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      console.log(data?.data?.url)
      setUrl(data?.data?.url)
    };

    const handleFileInputChange = (e) => {
      setImage(e.target.files[0])
    }

  
    return (
    <div className='flex flex-col items-center'>
    <div className='w-28 h-28 rounded-full outline-none relative'>
        <img src={url !== ''? url : userInfo?.photoURL} className='w-full h-full rounded-full object-cover'/>
        <label htmlFor="image" className='absolute right-0 bottom-2'>
            {url =='' ? <MdAddAPhoto size={25} className='text-green-600'/>:<IoMdReverseCamera size={25} className='text-red'/>}
        </label>
        <input type="file" className='hidden' id='image' onChange={handleFileInputChange} />
    </div>
        <button onClick={uploadImage} className={`mt-5 p-1 text-white rounded-lg ${darkMode?'bg-light-mode-text':'bg-darker'}`}>Upload</button>
        <span className='text-xs pt-1'>*Hit upload for changes to take place</span>
    </div>
    );
  };

const UserInfo = () => {
    const {darkMode, userInfo, url} = useContext(UserContext)
    const navigate = useNavigate()
    const photoURL = url !== '' ? url : userInfo?.photoURL
    const [name, setName] = useState(userInfo?.displayName || '')

    const updateUser = (e) => {
        e.preventDefault()
        updateProfile(auth.currentUser, {
            displayName: name, 
            photoURL: photoURL,
          }).then(() => {
            // Profile updated!
            console.log(userInfo)
            navigate('/')
          }).catch((error) => {
            // An error occurred
            console.log(error)
          });
    }
  
    return (
        <div className={`${darkMode ? 'bg-dark': 'sm:bg-light-mode'} min-h-body w-screen flex items-center justify-center`}>
            <div className={`${darkMode ? 'bg-darker':'bg-white'} sm:rounded-xl shadow-form flex flex-col items-center pb-5 sm:pb-10 sm:w-[500px] w-full sm:min-h-max min-h-body`}>
                <Link to='/' className={`${darkMode ? 'text-dark-text': 'text-light-mode-text'} md:hidden flex items-center gap-2 text-xl hover:underline underline-offset-4 pt-5 -translate-x-5`}>
                  <BiArrowBack/> Back to Home
                </Link>
                <h1 className={`${darkMode ? ' text-white': ''} text-2xl md:text-3xl font-bold text-center mt-10 mb-5`}>Welcome to PlasmaBlogs</h1>
                <form onSubmit={updateUser} className='flex flex-col sm:px-16 px-10 pb-5 pt-5 flex-1 w-full justify-between'>
                    <div className='flex flex-col gap-5 items-center justify-center'>
                        <FileInput />
                    <input 
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        type="name" 
                        name="name" 
                        id="name" 
                        size={1}
                        className={`${darkMode?'bg-card text-white':'border-light-mode border-2 text-black'} p-4 text-lg rounded-xl outline-none placeholder:text-sm w-full`} placeholder='What should we call you' 
                        required
                    />
                    </div>
                    <div className='flex flex-col gap-5 sm:pb-0 pb-10'>
                    <button className='bg-accent text-white font-semibold p-4 my-5 rounded-2xl hover:bg-accent-dark'>Continue</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UserInfo