import { createContext, useState } from "react";


export const UserContext = createContext({})

 const isDark = window.matchMedia("(prefers-color-scheme:dark)").matches
 export function UserContextProvider({children}) {
    const [userInfo, setUserInfo] = useState(null)
    const [darkMode, setDarkMode] = useState(isDark)
    const [posts, setPosts] = useState(null)
    const [backup, setBackup] = useState(null)
    const [info, setInfo] = useState(null) 
    const [url, setUrl] = useState("")
    const [postImage, setPostImage] = useState('')
    const [newpostImage, setnewPostImage] = useState('')
    const [navOpen, setNavOpen] = useState(false)
    const categories = ['Web Development', 'Linux', 'AI & ML', 'JavaScript', 'HTML5', 'CSS3', 'React', 'Windows', 'Programming']

    return (
        <UserContext.Provider value={{navOpen, backup,setBackup, setNavOpen, categories, newpostImage, setnewPostImage, postImage, setPostImage, url, setUrl, userInfo, setUserInfo, darkMode, setDarkMode, posts, setPosts, info, setInfo}}>
            {children}
        </UserContext.Provider>
    )
}