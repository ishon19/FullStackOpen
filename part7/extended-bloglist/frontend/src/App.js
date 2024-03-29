import { Box, Button, Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AddBlog from "./components/AddBlog";
import Blog from "./components/Blog";
import LoginView from "./components/LoginView";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(window.localStorage.getItem("loggedInUser"))?.token
  );
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

  /*   useEffect(() => {
    if (window.localStorage.getItem("loggedInUser")) {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      setLoggedIn(true);
      blogService.setToken(loggedInUser.token);
    }
  }, []); */

  const handleLogin = async () => {
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
      console.log("Response from server, ", user);
      displayNotification("success", `Welcome, ${user.username}!`);
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
      setBlogs(await blogService.getAll());
    } catch (error) {
      displayNotification("error", "Unable to post this blog..");
    }
  };

  const updateLikeHandler = async (id) => {
    try {
      await blogService.updateBlog(id);
      setBlogs(await blogService.getAll());
      displayNotification("success", "Updated Blog List");
    } catch (error) {
      displayNotification("error", "Unable to update likes for this blog..");
    }
  };

  const deletePostHandler = async (id) => {
    try {
      await blogService.deleteBlog(id);
      setBlogs(await blogService.getAll());
      displayNotification("success", "Updated Blog List");
    } catch (error) {
      displayNotification("error", "Unable to delete this blog..");
    }
  };

  return (
    <Box marginTop="100px">
      <Notification type={messageType} message={message} />
      {loggedIn ? (
        <Grid container direction="column" spacing={6}>
          <Grid item container direction="row" justify="space-between">
            <Grid>
              <Typography variant="h5">Blog List</Typography>
            </Grid>
            {/* Welcome, {JSON.parse(localStorage.getItem("loggedInUser")).name}! */}
            <Grid>
              <Button variant="outlined" onClick={logout}>
                Logout
              </Button>
            </Grid>
          </Grid>
          <Grid item container direction="column">
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateLikes={updateLikeHandler}
                deletePostHandler={deletePostHandler}
              />
            ))}
          </Grid>
          <Grid item>
            <AddBlog
              title={title}
              author={author}
              url={url}
              titleChangerHandler={handleTitleChange}
              authorChangeHandler={handleAuthorChange}
              urlChangeHandler={handleURLChange}
              addBlogHandler={submitNewBlog}
            />
          </Grid>
        </Grid>
      ) : (
        <LoginView
          loginHandler={handleLogin}
          usernameChangeHandler={handleUsernameChange}
          passwordChangeHandler={handlePasswordChange}
        />
      )}
    </Box>
  );
};

export default App;
