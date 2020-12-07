describe("Blog App", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const testUser = {
      name: "Shreyans Pathak",
      username: "shreyans",
      password: "mypass",
    };
    cy.request("POST", "http://localhost:3001/api/users", testUser);
    cy.visit("http://localhost:3000");
  });

  it("login form is shown", function () {
    cy.get(".loginform").contains("Login");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("shreyans");
      cy.get("#password").type("mypass");
      cy.get("#login-btn").click();
      cy.contains("Welcome, Shreyans Pathak!");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("shreyans");
      cy.get("#password").type("wrongpassword");
      cy.get("#login-btn").click();
      cy.get(".error").contains("Login Failed");
    });
  });

  describe.only("When logged in", function () {
    beforeEach(function () {
      console.log("LOG IN");
      cy.login({ username: "shreyans", password: "mypass" });
    });

    it("A blog can be created", function () {
      cy.createBlog({
        title: "Blog Created by Cypress",
        author: "Cypress",
        url: "http://localhost.com",
      });
      cy.get("#username").type("shreyans");
      cy.get("#password").type("mypass");
      cy.get("#login-btn").click();
    });

    it("and the user can like the post", function () {
      cy.createBlog({
        title: "Like Me!",
        author: "Cypress",
        url: "http://localhost.com",
      });
      cy.get("#username").type("shreyans");
      cy.get("#password").type("mypass");
      cy.get("#login-btn").click();
      cy.contains("View").click();
      cy.get("#like-btn").click();
      cy.contains("1");
    });

    it("the user who created the blog can delete it", function () {
      cy.createBlog({
        title: "Delete Me!",
        author: "Cypress",
        url: "http://localhost.com",
      });
      cy.get("#username").type("shreyans");
      cy.get("#password").type("mypass");
      cy.get("#login-btn").click();
      cy.contains("View").click();
      cy.contains("Delete Post").click();
      expect(
        JSON.parse(localStorage.getItem("loggedInUser")).username
      ).to.contain("shreyans");
    });

    it("blogs are posted in order of likes", function () {
      cy.createBlog({
        title: "Delete Me!",
        author: "Cypress",
        likes: 3,
        url: "http://localhost.com",
      });
      cy.createBlog({
        title: "Delete Me!",
        author: "Cypress",
        likes: 2,
        url: "http://localhost.com",
      });
      cy.get("#username").type("shreyans");
      cy.get("#password").type("mypass");
      cy.get("#login-btn").click();
      cy.get(":nth-child(1) > li > .btn").click();
      cy.get("li:first> .blogDetail > #like-btn").click();
      cy.get("li:first> .blogDetail > #like-btn").click();
      cy.get(":nth-child(2) > li > .btn").click();
      cy.get("li:last> .blogDetail > #like-btn")
        .click()
        .then(function () {
          cy.request("GET", "http://localhost:3001/api/blogs").then(
            ({ body }) => {
              const blogs = body;
              expect(blogs[1].likes).to.be.greaterThan(blogs[0].likes);
            }
          );
        });
    });
  });
});
