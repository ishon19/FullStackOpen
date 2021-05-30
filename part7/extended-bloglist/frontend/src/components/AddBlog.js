import React from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";

const AddBlog = ({
  title,
  author,
  url,
  titleChangerHandler,
  authorChangeHandler,
  urlChangeHandler,
  addBlogHandler,
}) => (
  <Grid container>
    <Grid item>
      <Typography variant="h5">Add New Blog</Typography>
    </Grid>
    <Grid item container direction="column">
      <label>Title</label>
      <input
        type="text"
        id="title"
        placeholder="Title"
        value={title}
        onChange={titleChangerHandler}
      />
      <label>Author</label>
      <input
        type="text"
        id="author"
        placeholder="Author"
        value={author}
        onChange={authorChangeHandler}
      />
      <label>URL</label>
      <input
        type="text"
        placeholder="URL"
        id="url"
        value={url}
        onChange={urlChangeHandler}
      />
      <button className="btn" type="submit" onClick={addBlogHandler}>
        Add Blog
      </button>
    </Grid>
  </Grid>
);

AddBlog.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  titleChangerHandler: PropTypes.func.isRequired,
  authorChangeHandler: PropTypes.func.isRequired,
  urlChangeHandler: PropTypes.func.isRequired,
  addBlogHandler: PropTypes.func.isRequired,
};

export default AddBlog;
