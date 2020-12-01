import React, { useEffect, useState } from "react";
import AddBlog from "./components/AddBlog";
import Blog from "./components/Blog";
import LoginView from "./components/LoginView";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setURL] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const displayNotification = (type, message) => {
    setMessage(message);
    setMessageType(type);
    setTimeout(() => setMessage(null), 3000);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    if (window.localStorage.getItem("loggedInUser")) {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      setLoggedIn(true);
      blogService.setToken(loggedInUser.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      displayNotification("error", "Please enter the username & password!");
      return;
    }
    try {
      console.log("Login Submit Handler");
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setLoggedIn(true);
      displayNotification("success", `Welcome, ${user.name}!`);
    } catch (error) {
      console.log(error);
      displayNotification("error", "Login Failed");
    }
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const logout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleURLChange = (event) => {
    setURL(event.target.value);
  };

  const submitNewBlog = async (event) => {
    event.preventDefault();
    if (!(title && author && url)) {
      displayNotification(
        "error",
        "Please enter all the fields before posting the blog!"
      );
      return;
    }
    try {
      const payload = {
        title: title,
        author: author,
        url: url,
      };
      await blogService.createBlog(payload);
      displayNotification("success", `New Blog - ${title} by ${author} Added!`);
      setTitle("");
      setURL("");
      setAuthor("");
      //update the blog list
      blogService.getAll().then((blogs) => setBlogs(blogs));
    } catch (error) {
      displayNotification("error", "Unable to post this blog..");
    }
  };

  return (
    <div>
      <div className="App-header">
        <h1>Blogs App</h1>
      </div>
      <Notification type={messageType} message={message} />
      {loggedIn ? (
        <>
          <div className="info">
            <div className="info-left">
              <b>Blog List</b>
            </div>
            <div className="info-right">
              Welcome, {JSON.parse(localStorage.getItem("loggedInUser")).name}!
              {"  "}
              <button onClick={logout}>Logout</button>
            </div>
          </div>
          <div className="card">
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
          <AddBlog
            title={title}
            author={author}
            url={url}
            titleChangerHandler={handleTitleChange}
            authorChangeHandler={handleAuthorChange}
            urlChangeHandler={handleURLChange}
            addBlogHandler={submitNewBlog}
          />
        </>
      ) : (
        <LoginView
          loginHandler={handleLogin}
          usernameChangeHandler={handleUsernameChange}
          passwordChangeHandler={handlePasswordChange}
        />
      )}
    </div>
  );
};

export default App;
