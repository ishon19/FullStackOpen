import React from "react";
import PropTypes from "prop-types";

const AddBlog = ({
  title,
  author,
  url,
  titleChangerHandler,
  authorChangeHandler,
  urlChangeHandler,
  addBlogHandler,
}) => (
  <>
    <h2>Add New Blog</h2>
    <div className="card">
      <form>
        <label>Title</label>
        <input
          type="text"
          id="title"
          placeholder="Title"
          value={title}
          onChange={titleChangerHandler}
        />
        <br />
        <label>Author</label>
        <input
          type="text"
          id="author"
          placeholder="Author"
          value={author}
          onChange={authorChangeHandler}
        />
        <br />
        <label>URL</label>
        <input
          type="text"
          placeholder="URL"
          id="url"
          value={url}
          onChange={urlChangeHandler}
        />
        <br />
        <button className="btn" type="submit" onClick={addBlogHandler}>
          Add Blog
        </button>
      </form>
    </div>
  </>
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
