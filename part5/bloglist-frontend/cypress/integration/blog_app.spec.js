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
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("shreyans");
      cy.get("#password").type("wrongpassword");
      cy.get("#login-btn").click();
      cy.get(".error").contains("Login Failed");
    });
  });
});
