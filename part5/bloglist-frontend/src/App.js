import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginView from "./components/LoginView";
import loginService from "./services/login";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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

  // useEffect(() => {
  //   if (window.localStorage.getItem("loggedInUser")) {
  //     setLoggedIn(true);
  //   }
  // }, []);

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

  return (
    <div>
      <div className="App-header">
        <h1>Blogs App</h1>
      </div>
      <Notification type={messageType} message={message} />
      {loggedIn ? (
        <>
          <h2>Blog List</h2>
          <div className="card">
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </>
      ) : (
        <LoginView
          username={username}
          password={password}
          loginHandler={handleLogin}
          usernameChangeHandler={handleUsernameChange}
          passwordChangeHandler={handlePasswordChange}
        />
      )}
    </div>
  );
};

export default App;
