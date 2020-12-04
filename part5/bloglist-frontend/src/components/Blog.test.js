import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Blog from "./Blog";

test("Initially only blog author and title are show", () => {
  const testBlog = {
    author: "Test",
    title: "test title",
    likes: 2,
    url: "http://test.com",
    id: "test",
  };
  const dummyHandler = jest.fn();
  const component = render(
    <Blog
      blog={testBlog}
      deletePostHandler={dummyHandler}
      updateLikes={dummyHandler}
    />
  );
  const div = component.container.querySelector(".defaultContent");
  expect(div).not.toHaveStyle("display:none");
});
