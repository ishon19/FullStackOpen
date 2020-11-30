import React from "react";

const Login = ({
  username,
  password,
  loginHandler,
  usernameChangeHandler,
  passwordChangeHandler,
}) => (
  <form onSubmit={loginHandler}>
    <div className="loginform">
      <label>Username</label>
      <input
        type="text"
        name="Username"
        onChange={usernameChangeHandler}
      />
      <br />
      <label>Password</label>
      <input
        type="password"
        name="Password"
        onChange={passwordChangeHandler}
      />
      <br />
      <button className="btn">Login</button>
    </div>
  </form>
);

export default Login;