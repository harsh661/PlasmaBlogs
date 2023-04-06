import {createHashRouter, Outlet, RouterProvider} from "react-router-dom";
import { UserContextProvider } from "./UserContext";
import Home from "./pages/Home";
import Navbar from './components/Navbar';
import Login from './pages/Login'
import Register from './pages/Register'
import Post from "./pages/Post";
import BlogPage from "./pages/BlogPage";
import EditPost from "./pages/EditPost";
import UserInfo from "./components/UserInfo";
import UserPosts from "./pages/UserPosts";


const Layout = () => {
  return (
    <UserContextProvider>
        <Navbar />
        <Outlet />
    </UserContextProvider>
)}

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/create",
        element: <Post />
      },
      {
        path: "/post/:id",
        element: <BlogPage />
      },
      {
        path: "/edit/:id",
        element: <EditPost />
      },
      {
        path: "/details/:id",
        element: <UserInfo />
      },
      {
        path: "/:id/posts",
        element: <UserPosts />
      },
    ] },
]);

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
