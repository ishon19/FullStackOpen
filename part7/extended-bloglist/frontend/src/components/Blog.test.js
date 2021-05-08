import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render } from "@testing-library/react";
import Blog from "./Blog";
import AddBlog from "./AddBlog";

describe("BlogTest", () => {
  let component;
  let likeEventTriggerCount = 0;
  const testBlog = {
    author: "Test",
    title: "test title",
    likes: 2,
    url: "http://test.com",
    id: "test",
  };

  beforeEach(() => {
    const dummyDeleteHandler = jest.fn();
    const dummyLikeHandler = () => {
      likeEventTriggerCount++;
    };
    component = render(
      <Blog
        blog={testBlog}
        deletePostHandler={dummyDeleteHandler}
        updateLikes={dummyLikeHandler}
      />
    );
  });

  test("Initially only blog author and title are show", () => {
    const div = component.container.querySelector(".defaultContent");
    expect(div).not.toHaveStyle("display:none");
  });

  test("likes and url is shown on button click", () => {
    const button = component.getByText("View");
    fireEvent.click(button);
    const div = component.container.querySelector(".blogDetail");
    expect(div).not.toHaveStyle("display:none");
  });

  test("prop handler called twice on like button click", () => {
    const likeButton = component.getByText("Like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(likeEventTriggerCount).toBe(2);
  });

  test("details are received correctly when AddBlog handler is called", () => {
    const dummyFunction = jest.fn();
    let AddBlogComponent = render(
      <AddBlog
        title="Test"
        url="http://testUrl.com"
        author="Test User"
        addBlogHandler={dummyFunction}
        authorChangeHandler={dummyFunction}
        titleChangerHandler={dummyFunction}
        urlChangeHandler={dummyFunction}
      />
    );

    //Check if the values are present in the fields
    const url = AddBlogComponent.container.querySelector("#url").value;
    expect(url).toBe("http://testUrl.com");

    const author = AddBlogComponent.container.querySelector("#author").value;
    expect(author).toBe("Test User");

    const title = AddBlogComponent.container.querySelector("#title").value;
    expect(title).toBe("Test");
  });
});
