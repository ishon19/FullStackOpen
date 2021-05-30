/* eslint-disable linebreak-style */
import React, { useState } from "react";
import { Button, Grid, Typography } from "@material-ui/core";

const Blog = ({ blog, updateLikes, deletePostHandler }) => {
  const [visible, setVisible] = useState(false);
  const style = { display: visible ? "" : "none" };

  return (
    <Grid style={{ padding: "12px" }}>
      <Grid item container direction="row" justify="space-between">
        <Grid item>
          <Typography variant="h6">
            {blog.title} ~ {blog.author}
          </Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => setVisible(!visible)}>
            {!visible ? "View" : "Hide"}
          </Button>
        </Grid>
        <Grid style={style}>
          <b>Link</b> <a href={blog.url}>{blog.url}</a>
          <br />
          <b>Likes</b> {blog.likes}{" "}
          <button
            id="like-btn"
            className="btn-small"
            onClick={() => updateLikes(blog.id)}
          >
            Like
          </button>
          <br />
          <button
            className="btn-warning"
            onClick={() => deletePostHandler(blog.id)}
          >
            Delete Post
          </button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Blog;
