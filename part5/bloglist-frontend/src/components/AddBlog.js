import React from "react";

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
          placeholder="Title"
          value={title}
          onChange={titleChangerHandler}
        />
        <br />
        <label>Author</label>
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={authorChangeHandler}
        />
        <br />
        <label>URL</label>
        <input
          type="text"
          placeholder="URL"
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

export default AddBlog;
