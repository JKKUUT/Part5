import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Loggain from "./components/loggain";
import userService from "./services/user";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  if (user === null) {
    return (
      <div>
        <Loggain />
      </div>
    );
  }
  const handleAddPost = (event) => {
    event.preventDefault();
    const { title, author, url } = event.target;
    const newBlog = {
      Title: title.value,
      Author: author.value,
      Url: url.value,
    };
    blogService.addBlog(newBlog).then((res) => {
      // console.log("RES: ", res);
      setBlogs(blogs.concat(res));
      setShowForm(false);
    });
  };
  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.Username} logged in
        <button onClick={() => userService.logoutUser()}>Log Out</button>
      </p>
      <div>
        {showForm ? (
          <form onSubmit={handleAddPost}>
            <p>
              title:
              <input type="text" name="title" />
            </p>
            <p>
              author:
              <input type="text" name="author" />
            </p>
            <p>
              url:
              <input type="text" name="url" />
            </p>
            <button type="submit">Add new</button>
            <button type="reset" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </form>
        ) : (
          <button onClick={() => setShowForm(true)}>New note</button>
        )}
      </div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
