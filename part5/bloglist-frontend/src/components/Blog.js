/* eslint-disable linebreak-style */
import React, { useState } from "react";

const Blog = ({ blog, updateLikes, deletePostHandler }) => {
  const [visible, setVisible] = useState(false);
  const style = { display: visible ? "" : "none" };

  return (
    <div>
      <li>
        <div className="defaultContent">{blog.title} {blog.author}</div>
        <button className="btn" onClick={() => setVisible(!visible)}>
          {!visible ? "View" : "Hide"}
        </button>
        <br />
        <div style={style} className="blogDetail">
          <b>Link</b> <a href={blog.url}>{blog.url}</a>
          <br />
          <b>Likes</b> {blog.likes}{" "}
          <button className="btn-small" onClick={() => updateLikes(blog.id)}>
            Like
          </button>
          <br />
          <button
            className="btn-warning"
            onClick={() => deletePostHandler(blog.id)}
          >
            Delete Post
          </button>
        </div>
      </li>
    </div>
  );
};

export default Blog;
