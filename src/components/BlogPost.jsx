import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";


const BlogPost = ({id, title, summary, files:cover, author, timestamp}) => {
  const { darkMode } = useContext(UserContext);

  const dateInMillis  = timestamp.seconds * 1000
  var date = new Date(dateInMillis).toDateString().slice(4,15)

  return (
    <div
      className={`${
        darkMode ? "md:bg-card" : "md:bg-light-mode"
      } flex flex-col p-2 mt-5 md:rounded-lg gap-3 md:gap-5 w-full animate-slideUp`}
    >
      <div className="flex-[2]">
        <Link to={`/post/${id}`}>
          <img
            src={cover}
            alt="Blog iamge"
            className={`w-full h-52 object-cover rounded-lg text-white flex items-center justify-center`}
          />
        </Link>
      </div>
      <div className="flex-[3] flex flex-col justify-start px-3 md:py-3 md:px-0 relative group">
        <Link to={`/post/${id}`}>
          <h1
            className={`${darkMode ? "text-white" : ""} text-2xl font-semibold line-clamp-3`}
          >
            {title}
          </h1>
        </Link>
        <span className={`flex flex-wrap py-5 gap-2 items-center font-semibold ${darkMode ? 'text-dark-text': 'text-black'}`}>
            <span>{`By ${author.userName}`}</span>
            <div className={`h-3/4 w-[2px] ${darkMode?'bg-dark-text':'bg-black'}`}></div>
            {date}
        </span>
        <p
          className={`${darkMode ? "text-dark-text" : "text-light-mode-text"} line-clamp-3`}
        >
          {summary}
        </p>
      </div>
    </div>
  );
};

export default BlogPost;
